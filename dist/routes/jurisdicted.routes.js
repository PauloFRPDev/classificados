"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EnsureIsRegistered_1 = __importDefault(require("../middlewares/EnsureIsRegistered"));
const jurisdictedRoutes = express_1.Router();
jurisdictedRoutes.get('/', EnsureIsRegistered_1.default, async (request, response) => {
    const userSelected = request.userFiltered;
    return response.send(userSelected);
});
exports.default = jurisdictedRoutes;
