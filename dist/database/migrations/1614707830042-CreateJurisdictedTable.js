"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateJurisdictedTable1614707830042 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'jurisdicted',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'cpf',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'category_id',
                    type: 'integer',
                },
                {
                    name: 'registration_number',
                    type: 'integer',
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
            name: 'AdJurisdicted',
            columnNames: ['cpf'],
            referencedColumnNames: ['cpf'],
            referencedTableName: 'jurisdicted',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('ads', 'AdJurisdicted');
        await queryRunner.dropTable('jurisdicted');
    }
}
exports.default = CreateJurisdictedTable1614707830042;
