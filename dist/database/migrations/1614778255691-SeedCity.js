"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const City_1 = __importDefault(require("../../models/City"));
const city_seed_1 = __importDefault(require("../seeds/city.seed"));
class SeedCity1614778255691 {
    async up(_) {
        await typeorm_1.getRepository(City_1.default).save(city_seed_1.default);
    }
    async down(_) {
    }
}
exports.default = SeedCity1614778255691;
