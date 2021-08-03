"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateJurisdictedService_1 = __importDefault(require("../services/CreateJurisdictedService"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const api_1 = __importDefault(require("../utils/api"));
async function ensureIsRegistered(request, _, next) {
    const { cpf } = request.headers;
    const response = await api_1.default.get('/siscaf/servico/api/RelatoriosPersonalizados?sistema=SISCAF&modulo=ADMINISTRATIVO&nomeRelatorio=RELA%C3%87%C3%83O%20DE%20PROFISSIONAIS%2FEMPRESAS&%40TIPO=8');
    const usersRegistered = response.data;
    const userFiltered = await usersRegistered.find((user) => user.cpfcnpj === String(cpf));
    if (!userFiltered) {
        throw new AppError_1.default('Jurisdicted not found');
    }
    let jurisdictedCategoryId = 0;
    let jurisdictedCategory = '';
    switch (userFiltered.nome) {
        case 'AUXILIAR DE PRÓTESE DENTÁRIA':
            jurisdictedCategoryId = 7;
            jurisdictedCategory = 'APD';
            break;
        case 'AUXILIAR EM SAÚDE BUCAL':
            jurisdictedCategoryId = 6;
            jurisdictedCategory = 'ASB';
            break;
        case 'CIRURGIÃO DENTISTA':
            jurisdictedCategoryId = 1;
            jurisdictedCategory = 'CD';
            break;
        case 'TÉCNICO EM PRÓTESE DENTÁRIA':
            jurisdictedCategoryId = 3;
            jurisdictedCategory = 'TPD';
            break;
        case 'TÉCNICO EM SAÚDE BUCAL':
            jurisdictedCategoryId = 5;
            jurisdictedCategory = 'TSB';
            break;
        default:
            throw new Error('Wrong category');
    }
    const userUpdated = Object.assign(Object.assign({}, userFiltered), { categoryId: jurisdictedCategoryId, category: jurisdictedCategory, situacaoFinanceira: userFiltered['situação financeira'] === ''
            ? (userFiltered['situação financeira'] = 'Adimplente')
            : userFiltered['situação financeira'] });
    request.userFiltered = userUpdated;
    const createJurisdictedService = new CreateJurisdictedService_1.default();
    await createJurisdictedService.execute({
        cpf: String(cpf),
        name: userUpdated.nomeRazaoSocial,
        category_id: userUpdated.categoryId,
        registration_number: Number(userUpdated.numeroRegistro),
    });
    if (userUpdated.situacaoFinanceira === 'Inadimplente') {
        throw new AppError_1.default('Jurisdicted is in debt');
    }
    return next();
}
exports.default = ensureIsRegistered;
