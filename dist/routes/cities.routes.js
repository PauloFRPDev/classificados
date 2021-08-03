"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const City_1 = __importDefault(require("../models/City"));
const citiesRoutes = express_1.Router();
citiesRoutes.get('/', async (request, response) => {
    const { title } = request.query;
    const citiesRepository = typeorm_1.getRepository(City_1.default);
    const cities = await citiesRepository.find({
        where: {
            title: typeorm_1.ILike(`%${title}%`),
        },
    });
    const citiesFormatted = cities.map(city => (Object.assign(Object.assign({}, city), { value: city.id, label: city.title })));
    response.json(citiesFormatted);
});
exports.default = citiesRoutes;
