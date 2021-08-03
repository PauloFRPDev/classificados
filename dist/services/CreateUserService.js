"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const AppError_1 = __importDefault(require("../errors/AppError"));
const UsersRepository_1 = __importDefault(require("../repositories/UsersRepository"));
class CreateUserService {
    async execute({ name, email, password }) {
        const usersRepository = typeorm_1.getCustomRepository(UsersRepository_1.default);
        const userExists = await usersRepository.findByEmail(email);
        if (userExists) {
            throw new AppError_1.default('User already exists');
        }
        const user = usersRepository.create({
            name,
            email,
            password,
        });
        user.password = await bcryptjs_1.hash(password, 8);
        await usersRepository.save(user);
        return user;
    }
}
exports.default = CreateUserService;
