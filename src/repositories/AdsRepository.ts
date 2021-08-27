import { EntityRepository, getRepository, Repository } from 'typeorm';

import Ad from '../models/Ad';
import AdCategory from '../models/AdCategory';

interface AdsPerCategoryProps {
  category: string;
  count: number;
}

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

  public async findAllByRegistrationNumber(
    registrationNumber?: number,
  ): Promise<Ad[] | null> {
    const findAds = await this.find({
      relations: [
        'city',
        'district',
        'category',
        'jurisdicted',
        'files',
        'jurisdicted.category',
      ],
    });

    if (registrationNumber) {
      const filteredAds = findAds.filter(ad =>
        String(ad.jurisdicted.registration_number).includes(
          String(registrationNumber),
        ),
      );

      return filteredAds;
    }

    return findAds;
  }

  public async findById(id: string): Promise<Ad | null> {
    const findAd = await this.findOne({
      where: {
        id,
      },
    });

    return findAd || null;
  }

  public async findAdsToBeActivated(
    registrationNumber?: number,
  ): Promise<Ad[] | []> {
    const ads = await this.find({
      where: {
        is_published: false,
        deleted_at: null,
      },
      relations: [
        'city',
        'district',
        'category',
        'jurisdicted',
        'jurisdicted.category',
        'files',
      ],
      order: {
        created_at: 'ASC',
      },
      take: 100,
    });

    if (registrationNumber) {
      const filteredAds = ads.filter(ad =>
        String(ad.jurisdicted.registration_number).includes(
          String(registrationNumber),
        ),
      );

      return filteredAds;
    }

    return ads;
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

  public async findCountAdsPerCategory(): Promise<AdsPerCategoryProps[]> {
    const ads = await this.find({
      relations: ['category'],
    });

    const adCategoriesRepository = getRepository(AdCategory);

    const adCategories = await adCategoriesRepository.find();

    const adsPerCategory = adCategories.map(adCategory => {
      const sumOfAdOnEachCategory = ads.filter(
        ad => ad.category_id === adCategory.id,
      ).length;

      return {
        category: adCategory.title,
        count: sumOfAdOnEachCategory,
      };
    });

    return adsPerCategory;
  }
}

export default AdsRepository;
