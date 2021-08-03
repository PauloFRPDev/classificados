"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const District_1 = __importDefault(require("../models/District"));
const districtsRoutes = express_1.Router();
districtsRoutes.get('/', async (request, response) => {
    const { title } = request.query;
    const districtsRepository = typeorm_1.getRepository(District_1.default);
    const districts = await districtsRepository.find({
        where: {
            title: typeorm_1.ILike(`%${title}%`),
        },
        take: 10,
    });
    const districtsFormatted = districts.map(district => (Object.assign(Object.assign({}, district), { value: district.id, label: district.title })));
    return response.json(districtsFormatted);
});
exports.default = districtsRoutes;
