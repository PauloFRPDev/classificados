import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddDeletedAtToAd1615218285118
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'ads',
      new TableColumn({
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('ads', 'deleted_at');
  }
}
