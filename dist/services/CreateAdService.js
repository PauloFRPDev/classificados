"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const AppError_1 = __importDefault(require("../errors/AppError"));
const AdsRepository_1 = __importDefault(require("../repositories/AdsRepository"));
class CreateAdService {
    async execute({ cpf, phone_number, email, category_id, city_id, district_id, description, jurisdictedIsInDebt = true, }) {
        if (jurisdictedIsInDebt) {
            throw new AppError_1.default('Jurisdicted in in debt.');
        }
        const adsRepository = typeorm_1.getCustomRepository(AdsRepository_1.default);
        const activeAds = await adsRepository.find({
            where: [
                {
                    cpf,
                    expiration_date: null,
                    deleted_at: null,
                },
                {
                    cpf,
                    expiration_date: typeorm_1.MoreThanOrEqual(new Date(Date.now())),
                    deleted_at: null,
                },
            ],
        });
        if (activeAds) {
            const userAlreadyHasAnActiveOrToBeActivatedAdOnSameCategory = activeAds.find(activeAd => activeAd.category_id === category_id);
            if (userAlreadyHasAnActiveOrToBeActivatedAdOnSameCategory) {
                throw new AppError_1.default('You can not have more than one active or to be activated ad on the same category.');
            }
            const userHasMoreThanThreeActiveAds = activeAds.length >= 3;
            if (userHasMoreThanThreeActiveAds) {
                throw new AppError_1.default('You can not have more than three active ads.');
            }
        }
        const ad = adsRepository.create({
            cpf,
            phone_number,
            email,
            category_id,
            city_id,
            district_id,
            description,
            is_published: false,
        });
        await adsRepository.save(ad);
        return ad;
    }
}
exports.default = CreateAdService;
