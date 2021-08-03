"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const AppError_1 = __importDefault(require("../errors/AppError"));
const DiskStorageProvider_1 = __importDefault(require("../providers/DiskStorageProvider"));
const File_1 = __importDefault(require("../models/File"));
const AdsRepository_1 = __importDefault(require("../repositories/AdsRepository"));
class InsertFileService {
    async execute({ ad_id, adFilenames }) {
        const adsRepository = typeorm_1.getCustomRepository(AdsRepository_1.default);
        const filesRepository = typeorm_1.getRepository(File_1.default);
        const storageProvider = new DiskStorageProvider_1.default();
        const ad = await adsRepository.findById(ad_id);
        if (!ad) {
            throw new AppError_1.default('Ad not found!');
        }
        if (ad.files) {
        }
        adFilenames.map(async (adFilename) => {
            const file = filesRepository.create({
                ad_id,
                filename: adFilename,
            });
            await filesRepository.save(file);
            await storageProvider.saveFile(adFilename);
        });
    }
}
exports.default = InsertFileService;
