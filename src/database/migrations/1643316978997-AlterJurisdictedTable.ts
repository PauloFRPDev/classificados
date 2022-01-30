import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterJurisdictedTable1643316978997
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('ads', 'AdJurisdicted');

    await queryRunner.changeColumn(
      'jurisdicted',
      'cpf',
      new TableColumn({
        name: 'cpf',
        type: 'varchar',
        isUnique: false,
      }),
    );

    await queryRunner.addColumn(
      'ads',
      new TableColumn({
        name: 'jurisdicted_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'ads',
      new TableForeignKey({
        name: 'AdJurisdicted',
        columnNames: ['jurisdicted_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'jurisdicted',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
