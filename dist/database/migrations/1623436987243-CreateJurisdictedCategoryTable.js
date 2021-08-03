"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateJurisdictedCategoryTable1623436987243 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'jurisdicted_categories',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('jurisdicted_categories');
    }
}
exports.default = CreateJurisdictedCategoryTable1623436987243;
