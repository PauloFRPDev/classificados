import { EntityRepository, Repository } from 'typeorm';

import Ad from '../models/Ad';

@EntityRepository(Ad)
class AdsRepository extends Repository<Ad> {
  public async findByCpf(cpf: string): Promise<Ad | null> {
    const findAd = await this.findOne({
      where: {
        cpf,
      },
    });

    return findAd || null;
  }

  public async findById(id: string): Promise<Ad | null> {
    const findAd = await this.findOne({
      where: {
        id,
      },
    });

    return findAd || null;
  }
}

export default AdsRepository;
