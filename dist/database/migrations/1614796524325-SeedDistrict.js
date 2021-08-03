"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const District_1 = __importDefault(require("../../models/District"));
const district_seed_1 = __importDefault(require("../seeds/district.seed"));
class SeedDistrict1614796524325 {
    async up(_) {
        await typeorm_1.getRepository(District_1.default).save(district_seed_1.default);
    }
    async down(_) {
    }
}
exports.default = SeedDistrict1614796524325;
