"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const EnsureAuthenticated_1 = __importDefault(require("../middlewares/EnsureAuthenticated"));
const AdsRepository_1 = __importDefault(require("../repositories/AdsRepository"));
const statisticsRoutes = express_1.Router();
statisticsRoutes.get('/ads/total', EnsureAuthenticated_1.default, async (request, response) => {
    const adsRepository = typeorm_1.getCustomRepository(AdsRepository_1.default);
    const countAdsByYear = await adsRepository.findCountByYear();
    return response.json(countAdsByYear);
});
statisticsRoutes.get('/ads/total_category', EnsureAuthenticated_1.default, async (request, response) => {
    const adsRepository = typeorm_1.getCustomRepository(AdsRepository_1.default);
    const countTotalAdsPerCategory = await adsRepository.findCountAdsPerCategory();
    return response.json(countTotalAdsPerCategory);
});
exports.default = statisticsRoutes;
