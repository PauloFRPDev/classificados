"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const AdCategory_1 = __importDefault(require("../../models/AdCategory"));
const category_seed_1 = __importDefault(require("../seeds/category.seed"));
class SeedCategory1614712910224 {
    async up(_) {
        await typeorm_1.getRepository(AdCategory_1.default).save(category_seed_1.default);
    }
    async down(_) {
    }
}
exports.default = SeedCategory1614712910224;
