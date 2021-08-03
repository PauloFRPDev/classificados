"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateAdsTable1614706844949 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'ads',
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
                },
                {
                    name: 'phone_number',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'category_id',
                    type: 'integer',
                },
                {
                    name: 'city_id',
                    type: 'integer',
                },
                {
                    name: 'district_id',
                    type: 'integer',
                },
                {
                    name: 'description',
                    type: 'varchar',
                    length: '300',
                },
                {
                    name: 'is_published',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'publication_date',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'expiration_date',
                    type: 'timestamp',
                    isNullable: true,
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
        await queryRunner.dropTable('ads');
    }
}
exports.default = CreateAdsTable1614706844949;
