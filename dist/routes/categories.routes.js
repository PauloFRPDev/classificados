"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const AdCategory_1 = __importDefault(require("../models/AdCategory"));
const categoriesRoutes = express_1.Router();
categoriesRoutes.get('/', async (request, response) => {
    const categoriesRepository = typeorm_1.getRepository(AdCategory_1.default);
    const categories = await categoriesRepository.find();
    const categoriesFormatted = categories.map(category => (Object.assign(Object.assign({}, category), { value: category.id, label: category.title })));
    return response.json(categoriesFormatted);
});
exports.default = categoriesRoutes;
