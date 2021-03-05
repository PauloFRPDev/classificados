import { getCustomRepository } from 'typeorm';

import Ad from '../models/Ad';
import AdsRepository from '../repositories/AdsRepository';

interface RequestData {
  cpf: string;
  phone_number: string;
  email: string;
  category_id: number;
  city_id: number;
  district_id: number;
  description: string;
}

export default class CreateAdService {
  public async execute({
    cpf,
    phone_number,
    email,
    category_id,
    city_id,
    district_id,
    description,
  }: RequestData): Promise<Ad> {
    const adsRepository = getCustomRepository(AdsRepository);

    const ad = adsRepository.create({
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
