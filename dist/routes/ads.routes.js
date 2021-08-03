"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const multer_1 = __importDefault(require("multer"));
const class_transformer_1 = require("class-transformer");
const AppError_1 = __importDefault(require("../errors/AppError"));
const EnsureAuthenticated_1 = __importDefault(require("../middlewares/EnsureAuthenticated"));
const upload_1 = __importDefault(require("../config/upload"));
const JurisdictedRepository_1 = __importDefault(require("../repositories/JurisdictedRepository"));
const AdsRepository_1 = __importDefault(require("../repositories/AdsRepository"));
const CreateAdService_1 = __importDefault(require("../services/CreateAdService"));
const UpdateAdService_1 = __importDefault(require("../services/UpdateAdService"));
const DeleteAdService_1 = __importDefault(require("../services/DeleteAdService"));
const AcceptAdService_1 = __importDefault(require("../services/AcceptAdService"));
const InsertFileService_1 = __importDefault(require("../services/InsertFileService"));
const adsRoutes = express_1.Router();
const upload = multer_1.default(upload_1.default.multer);
adsRoutes.get('/', async (request, response) => {
    var _a;
    const { category, city, district, description } = request.query;
    const adsRepository = typeorm_1.getCustomRepository(AdsRepository_1.default);
    const ads = category
        ? await adsRepository.find({
            where: {
                category_id: category,
                is_published: true,
                expiration_date: typeorm_1.MoreThanOrEqual(new Date(Date.now())),
            },
            relations: ['city', 'district', 'category', 'jurisdicted', 'files'],
            take: 100,
            order: {
                created_at: 'ASC',
            },
        })
        : await adsRepository.find({
            where: {
                is_published: true,
                expiration_date: typeorm_1.MoreThanOrEqual(new Date(Date.now())),
            },
            relations: ['city', 'district', 'category', 'jurisdicted', 'files'],
            take: 100,
            order: {
                created_at: 'ASC',
            },
        });
    const adsFiltered = (city || district || description) &&
        ads.filter(ad => {
            if ((city && ad.city.title.toLowerCase().includes(city)) ||
                (district &&
                    ad.district.title.toLowerCase().includes(district)) ||
                (description &&
                    ad.description.toLowerCase().includes(description))) {
                return ad;
            }
            return null;
        });
    return response.json((_a = class_transformer_1.classToClass(adsFiltered)) !== null && _a !== void 0 ? _a : class_transformer_1.classToClass(ads));
});
adsRoutes.get('/to_accept', EnsureAuthenticated_1.default, async (request, response) => {
    const adsRepository = typeorm_1.getCustomRepository(AdsRepository_1.default);
    const ads = await adsRepository.findAdsToBeActivated();
    return response.json(class_transformer_1.classToClass(ads));
});
adsRoutes.get('/:id', async (request, response) => {
    const { id } = request.params;
    const adsRepository = typeorm_1.getCustomRepository(AdsRepository_1.default);
    const ad = await adsRepository.findById(id);
    if (!ad) {
        throw new AppError_1.default('Ad not found.');
    }
    return response.json(ad);
});
adsRoutes.post('/', async (request, response) => {
    const { cpf, phone_number, email, category_id, city_id, district_id, description, jurisdictedIsInDebt, } = request.body;
    const jurisdictedRepository = typeorm_1.getCustomRepository(JurisdictedRepository_1.default);
    const searchJurisdicted = await jurisdictedRepository.findByCpf(cpf);
    if (!searchJurisdicted) {
        throw new AppError_1.default('Jurisdicted not found!');
    }
    const createAd = new CreateAdService_1.default();
    const ad = await createAd.execute({
        cpf,
        phone_number,
        email,
        category_id,
        city_id,
        district_id,
        description,
        jurisdictedIsInDebt,
    });
    return response.json(ad);
});
adsRoutes.put('/:id', EnsureAuthenticated_1.default, async (request, response) => {
    const { id } = request.params;
    const { phone_number, email, category_id, city_id, district_id, description, } = request.body;
    const updateAd = new UpdateAdService_1.default();
    const ad = await updateAd.execute({
        id,
        phone_number,
        email,
        category_id,
        city_id,
        district_id,
        description,
    });
    return response.json(ad);
});
adsRoutes.delete('/:id', EnsureAuthenticated_1.default, async (request, response) => {
    const { id } = request.params;
    const deleteAd = new DeleteAdService_1.default();
    await deleteAd.execute({ id });
    return response.status(200).json();
});
adsRoutes.patch('/accept/:id', EnsureAuthenticated_1.default, async (request, response) => {
    const { id } = request.params;
    const acceptAd = new AcceptAdService_1.default();
    const ad = await acceptAd.execute({ id });
    return response.json(class_transformer_1.classToClass(ad));
});
adsRoutes.post('/:id/files/add', upload.array('files', 2), async (request, response) => {
    const { id } = request.params;
    const { files } = request;
    const insertFileService = new InsertFileService_1.default();
    if (files) {
        await insertFileService.execute({
            ad_id: id,
            adFilenames: files.length === 1
                ? [files[0].filename]
                : [files[0].filename, files[1].filename],
        });
    }
    return response.json();
});
exports.default = adsRoutes;
