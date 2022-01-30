import { getCustomRepository, MoreThanOrEqual } from 'typeorm';

import AppError from '../errors/AppError';

import Jurisdicted from '../models/Jurisdicted';
import Ad from '../models/Ad';
import AdsRepository from '../repositories/AdsRepository';

interface RequestData {
  cpf: string;
  searchJurisdicted: Jurisdicted;
  phone_number: string;
  email: string;
  category_id: number;
  city_id: number;
  district_id: number;
  description: string;
  jurisdictedIsInDebt: boolean;
}

export default class CreateAdService {
  public async execute({
    cpf,
    searchJurisdicted,
    phone_number,
    email,
    category_id,
    city_id,
    district_id,
    description,
    jurisdictedIsInDebt = true,
  }: RequestData): Promise<Ad> {
    if (jurisdictedIsInDebt) {
      throw new AppError('Jurisdicted in in debt.');
    }

    const adsRepository = getCustomRepository(AdsRepository);

    const activeAds = await adsRepository.find({
      where: [
        {
          cpf,
          expiration_date: null,
          deleted_at: null,
        },
        {
          cpf,
          expiration_date: MoreThanOrEqual(new Date(Date.now())),
          deleted_at: null,
        },
      ],
    });

    if (activeAds) {
      const userAlreadyHasAnActiveOrToBeActivatedAdOnSameCategory = activeAds.find(
        activeAd => activeAd.category_id === category_id,
      );

      if (userAlreadyHasAnActiveOrToBeActivatedAdOnSameCategory) {
        throw new AppError(
          'You can not have more than one active or to be activated ad on the same category.',
        );
      }

      const userHasMoreThanThreeActiveAds = activeAds.length >= 3;

      if (userHasMoreThanThreeActiveAds) {
        throw new AppError('You can not have more than three active ads.');
      }
    }

    const ad = adsRepository.create({
      jurisdicted_id: searchJurisdicted.id,
      cpf,
      phone_number,
      email,
      category_id,
      city_id,
      district_id,
      description,
      is_published: false,
    });

    await adsRepository.save(ad);

    return ad;
  }
}
