import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import AdCategory from '../../models/AdCategory';
import AdCategorySeed from '../seeds/category.seed';

export default class SeedCategory1614712910224 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {
    await getRepository(AdCategory).save(AdCategorySeed);
  }

  public async down(_: QueryRunner): Promise<void> {
    // do nothing
  }
}
