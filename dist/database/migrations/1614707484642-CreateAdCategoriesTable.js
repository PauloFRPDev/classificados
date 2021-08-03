"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateAdCategoriesTable1614707484642 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'ad_categories',
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
        await queryRunner.createForeignKey('ads', new typeorm_1.TableForeignKey({
            name: 'AdCategory',
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ad_categories',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('ads', 'AdCategory');
        await queryRunner.dropTable('ad_categories');
    }
}
exports.default = CreateAdCategoriesTable1614707484642;
