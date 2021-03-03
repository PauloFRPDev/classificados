import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

import District from '../../models/District';
import DistrictSeed from '../seeds/district.seed';

export default class SeedDistrict1614796524325 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {
    await getRepository(District).save(DistrictSeed);
  }

  public async down(_: QueryRunner): Promise<void> {
    // Do nothing
  }
}
