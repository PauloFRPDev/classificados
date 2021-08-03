"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const AppError_1 = __importDefault(require("../errors/AppError"));
const AdsRepository_1 = __importDefault(require("../repositories/AdsRepository"));
class DeleteAdService {
    async execute({ id }) {
        const adsRepository = typeorm_1.getCustomRepository(AdsRepository_1.default);
        const findAd = await adsRepository.findById(id);
        if (!findAd) {
            throw new AppError_1.default('Ad not found.');
        }
        if (findAd.deleted_at !== null) {
            throw new AppError_1.default('Ad already deleted.');
        }
        findAd.deleted_at = new Date(Date.now());
        await adsRepository.save(findAd);
    }
}
exports.default = DeleteAdService;
