"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const AppError_1 = __importDefault(require("../errors/AppError"));
const auth_1 = __importDefault(require("../config/auth"));
const UsersRepository_1 = __importDefault(require("../repositories/UsersRepository"));
class AuthenticateUserService {
    async execute({ email, password, }) {
        const usersRepository = typeorm_1.getCustomRepository(UsersRepository_1.default);
        const user = await usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError_1.default('Incorrect email/password combination', 401);
        }
        const passwordMatched = await bcryptjs_1.compare(password, user.password);
        if (!passwordMatched) {
            throw new AppError_1.default('Incorrect email/password combination', 401);
        }
        const { secret, expiresIn } = auth_1.default.jwt;
        const token = jsonwebtoken_1.sign({}, secret, {
            subject: user.id,
            expiresIn,
        });
        return {
            user,
            token,
        };
    }
}
exports.default = AuthenticateUserService;
