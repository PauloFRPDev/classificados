"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateAdFilesTable1625683054770 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'ad_files',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'ad_id',
                    type: 'uuid',
                },
                {
                    name: 'filename',
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
        await queryRunner.createForeignKey('ad_files', new typeorm_1.TableForeignKey({
            name: 'FileAd',
            columnNames: ['ad_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ads',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('ad_files');
    }
}
exports.default = CreateAdFilesTable1625683054770;
