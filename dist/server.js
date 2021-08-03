"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const AppError_1 = __importDefault(require("./errors/AppError"));
const upload_1 = __importDefault(require("./config/upload"));
require("./database");
const app = express_1.default();
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(express_1.default.json());
app.use('/files', express_1.default.static(upload_1.default.uploadsFolder));
app.use(routes_1.default);
app.use((err, request, response, _) => {
    if (err instanceof AppError_1.default) {
        return response
            .status(err.statusCode)
            .json({ status: 'error', message: err.message });
    }
    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
app.listen(3333, () => {
    console.log('🚀 Server started on port 3333!');
});
