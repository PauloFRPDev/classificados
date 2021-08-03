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
const AdCategory_1 = __importDefault(require("./AdCategory"));
const City_1 = __importDefault(require("./City"));
const District_1 = __importDefault(require("./District"));
const File_1 = __importDefault(require("./File"));
const Jurisdicted_1 = __importDefault(require("./Jurisdicted"));
let Ad = class Ad extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Ad.prototype, "id", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Ad.prototype, "cpf", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Jurisdicted_1.default, jurisdicted => jurisdicted.ads),
    typeorm_1.JoinColumn({ name: 'cpf', referencedColumnName: 'cpf' }),
    __metadata("design:type", Jurisdicted_1.default)
], Ad.prototype, "jurisdicted", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Ad.prototype, "phone_number", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Ad.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Ad.prototype, "category_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => AdCategory_1.default),
    typeorm_1.JoinColumn({ name: 'category_id' }),
    __metadata("design:type", AdCategory_1.default)
], Ad.prototype, "category", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Ad.prototype, "city_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => City_1.default),
    typeorm_1.JoinColumn({ name: 'city_id' }),
    __metadata("design:type", City_1.default)
], Ad.prototype, "city", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Ad.prototype, "district_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => District_1.default),
    typeorm_1.JoinColumn({ name: 'district_id' }),
    __metadata("design:type", District_1.default)
], Ad.prototype, "district", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Ad.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Boolean)
], Ad.prototype, "is_published", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Ad.prototype, "publication_date", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Ad.prototype, "expiration_date", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Ad.prototype, "deleted_at", void 0);
__decorate([
    typeorm_1.OneToMany(() => File_1.default, file => file.ad),
    __metadata("design:type", Array)
], Ad.prototype, "files", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Ad.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Ad.prototype, "updated_at", void 0);
Ad = __decorate([
    typeorm_1.Entity('ads')
], Ad);
exports.default = Ad;
