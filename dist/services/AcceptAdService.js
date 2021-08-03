"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const date_fns_1 = require("date-fns");
const AppError_1 = __importDefault(require("../errors/AppError"));
const AdsRepository_1 = __importDefault(require("../repositories/AdsRepository"));
class AcceptAdService {
    async execute({ id }) {
        const adsRepository = typeorm_1.getCustomRepository(AdsRepository_1.default);
        const findAd = await adsRepository.findById(id);
        if (!findAd) {
            throw new AppError_1.default('Ad not found.');
        }
        if (findAd.deleted_at !== null) {
            throw new AppError_1.default('Ad is deleted.');
        }
        if (findAd.is_published === true) {
            throw new AppError_1.default('Ad already accepted.');
        }
        findAd.is_published = true;
        findAd.publication_date = new Date(Date.now());
        findAd.expiration_date = date_fns_1.addMonths(findAd.publication_date, 2);
        await adsRepository.save(findAd);
        return findAd;
    }
}
exports.default = AcceptAdService;
