"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthenticateUserService_1 = __importDefault(require("../services/AuthenticateUserService"));
const sessionsRoutes = express_1.Router();
sessionsRoutes.post('/', async (request, response) => {
    const { email, password } = request.body;
    const authenticateUserService = new AuthenticateUserService_1.default();
    const { user, token } = await authenticateUserService.execute({
        email,
        password,
    });
    delete user.password;
    return response.json({ user, token });
});
exports.default = sessionsRoutes;
