"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Ad_1 = __importDefault(require("../models/Ad"));
const AdCategory_1 = __importDefault(require("../models/AdCategory"));
let AdsRepository = class AdsRepository extends typeorm_1.Repository {
    async findByCpf(cpf) {
        const findAd = await this.findOne({
            where: {
                cpf,
            },
        });
        return findAd || null;
    }
    async findById(id) {
        const findAd = await this.findOne({
            where: {
                id,
            },
        });
        return findAd || null;
    }
    async findAdsToBeActivated() {
        const ads = await this.find({
            where: {
                is_published: false,
                deleted_at: null,
            },
            relations: ['city', 'district', 'category', 'jurisdicted', 'files'],
            order: {
                created_at: 'ASC',
            },
            take: 100,
        });
        return ads;
    }
    async findCountByYear() {
        const ads = await this.find();
        const countAdsByMonth = [];
        let month = 0;
        while (month < 12) {
            const filteredAds = ads.filter(ad => ad.created_at.getMonth() === month);
            countAdsByMonth.push(filteredAds.length);
            month += 1;
        }
        return countAdsByMonth;
    }
    async findCountAdsPerCategory() {
        const ads = await this.find({
            relations: ['category'],
        });
        const adCategoriesRepository = typeorm_1.getRepository(AdCategory_1.default);
        const adCategories = await adCategoriesRepository.find();
        const adsPerCategory = adCategories.map(adCategory => {
            const sumOfAdOnEachCategory = ads.filter(ad => ad.category_id === adCategory.id).length;
            return {
                category: adCategory.title,
                count: sumOfAdOnEachCategory,
            };
        });
        return adsPerCategory;
    }
};
AdsRepository = __decorate([
    typeorm_1.EntityRepository(Ad_1.default)
], AdsRepository);
exports.default = AdsRepository;
