"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const upload_1 = __importDefault(require("../config/upload"));
const Ad_1 = __importDefault(require("./Ad"));
let File = class File extends typeorm_1.BaseEntity {
    getFileUrl() {
        if (!this.filename) {
            return null;
        }
        switch (upload_1.default.driver) {
            case 'disk':
                return `${process.env.API_URL}/files/${this.filename}`;
            default:
                return null;
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], File.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], File.prototype, "ad_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Ad_1.default, ad => ad.files),
    typeorm_1.JoinColumn({ name: 'ad_id' }),
    __metadata("design:type", Ad_1.default)
], File.prototype, "ad", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], File.prototype, "filename", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], File.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], File.prototype, "updated_at", void 0);
__decorate([
    class_transformer_1.Expose({ name: 'file_url' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], File.prototype, "getFileUrl", null);
File = __decorate([
    typeorm_1.Entity('ad_files')
], File);
exports.default = File;
