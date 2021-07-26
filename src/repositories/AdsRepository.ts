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

  public async findCountByYear(): Promise<number[]> {
    const ads = await this.find();

    const countAdsByMonth: number[] = [];

    let month = 0;

    while (month < 12) {
      // eslint-disable-next-line no-loop-func
      const filteredAds = ads.filter(ad => ad.created_at.getMonth() === month);
      countAdsByMonth.push(filteredAds.length);

      month += 1;
    }

    return countAdsByMonth;
  }
}

export default AdsRepository;
