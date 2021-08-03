"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class AddDeletedAtToAd1615218285118 {
    async up(queryRunner) {
        await queryRunner.addColumn('ads', new typeorm_1.TableColumn({
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('ads', 'deleted_at');
    }
}
exports.default = AddDeletedAtToAd1615218285118;
