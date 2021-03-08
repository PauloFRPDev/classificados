import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Ad from '../models/Ad';
import AdsRepository from '../repositories/AdsRepository';

interface RequestData {
  id: string;
  phone_number: string;
  email: string;
  category_id: number;
  city_id: number;
  district_id: number;
  description: string;
}

export default class UpdateAdService {
  public async execute({
    id,
    phone_number,
    email,
    category_id,
    city_id,
    district_id,
    description,
  }: RequestData): Promise<Ad> {
    const adsRepository = getCustomRepository(AdsRepository);

    const findAd = await adsRepository.findById(id);

    if (!findAd) {
      throw new AppError('Ad not found.');
    }

    if (!findAd.deleted_at !== null) {
      throw new AppError('You can not update a deleted Ad.');
    }

    findAd.phone_number = phone_number;
    findAd.email = email;
    findAd.category_id = category_id;
    findAd.city_id = city_id;
    findAd.district_id = district_id;
    findAd.description = description;

    await adsRepository.save(findAd);

    return findAd;
  }
}
