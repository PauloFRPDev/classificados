"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateUserService_1 = __importDefault(require("../services/CreateUserService"));
const usersRoutes = express_1.Router();
usersRoutes.post('/', async (request, response) => {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService_1.default();
    const user = await createUser.execute({
        name,
        email,
        password,
    });
    return response.json(user);
});
exports.default = usersRoutes;
