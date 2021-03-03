import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

import City from '../../models/City';
import CitySeed from '../seeds/city.seed';

export default class SeedCity1614778255691 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {
    await getRepository(City).save(CitySeed);
  }

  public async down(_: QueryRunner): Promise<void> {
    // do nothing
  }
}
