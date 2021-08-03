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
const Ad_1 = __importDefault(require("./Ad"));
let Jurisdicted = class Jurisdicted extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Jurisdicted.prototype, "id", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Jurisdicted.prototype, "cpf", void 0);
__decorate([
    typeorm_1.OneToMany(() => Ad_1.default, ad => ad.jurisdicted),
    typeorm_1.JoinColumn({ name: 'cpf', referencedColumnName: 'cpf' }),
    __metadata("design:type", Array)
], Jurisdicted.prototype, "ads", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Jurisdicted.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Jurisdicted.prototype, "category_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Jurisdicted.prototype, "registration_number", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Jurisdicted.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Jurisdicted.prototype, "updated_at", void 0);
Jurisdicted = __decorate([
    typeorm_1.Entity('jurisdicted')
], Jurisdicted);
exports.default = Jurisdicted;
