"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const AppError_1 = __importDefault(require("../errors/AppError"));
const AdsRepository_1 = __importDefault(require("../repositories/AdsRepository"));
class UpdateAdService {
    async execute({ id, phone_number, email, category_id, city_id, district_id, description, }) {
        const adsRepository = typeorm_1.getCustomRepository(AdsRepository_1.default);
        const findAd = await adsRepository.findById(id);
        if (!findAd) {
            throw new AppError_1.default('Ad not found.');
        }
        if (findAd.deleted_at !== null) {
            throw new AppError_1.default('You can not update a deleted Ad.');
        }
        findAd.phone_number = phone_number;
        findAd.email = email;
        findAd.category_id = category_id;
        findAd.city_id = city_id;
        findAd.district_id = district_id;
        findAd.description = description;
        await adsRepository.save(findAd);
        return findAd;
    }
}
exports.default = UpdateAdService;
