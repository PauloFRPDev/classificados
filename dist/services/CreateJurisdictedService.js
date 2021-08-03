"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const JurisdictedRepository_1 = __importDefault(require("../repositories/JurisdictedRepository"));
class CreateJurisdictedService {
    async execute({ cpf, name, category_id, registration_number, }) {
        const jurisdictedRepository = typeorm_1.getCustomRepository(JurisdictedRepository_1.default);
        const searchJurisdicted = await jurisdictedRepository.findByCpf(cpf);
        if (!searchJurisdicted) {
            const jurisdicted = jurisdictedRepository.create({
                cpf,
                name,
                category_id,
                registration_number,
            });
            await jurisdictedRepository.save(jurisdicted);
        }
    }
}
exports.default = CreateJurisdictedService;
