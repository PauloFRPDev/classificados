"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateCitiesTable1614707694295 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'cities',
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
            name: 'AdCity',
            columnNames: ['city_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cities',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('ads', 'AdCity');
        await queryRunner.dropTable('cities');
    }
}
exports.default = CreateCitiesTable1614707694295;
