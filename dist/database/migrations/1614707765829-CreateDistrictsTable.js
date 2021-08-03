"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateDistrictsTable1614707765829 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'districts',
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
            name: 'AdDistrict',
            columnNames: ['district_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'districts',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('ads', 'AdDistrict');
        await queryRunner.dropTable('districts');
    }
}
exports.default = CreateDistrictsTable1614707765829;
