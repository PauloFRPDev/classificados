import { getCustomRepository } from 'typeorm';
import { addMonths } from 'date-fns';

import AppError from '../errors/AppError';

import Ad from '../models/Ad';
import AdsRepository from '../repositories/AdsRepository';

interface RequestData {
  id: string;
}

export default class AcceptAdService {
  public async execute({ id }: RequestData): Promise<Ad> {
    const adsRepository = getCustomRepository(AdsRepository);

    const findAd = await adsRepository.findById(id);

    if (!findAd) {
      throw new AppError('Ad not found.');
    }

    if (findAd.deleted_at !== null) {
      throw new AppError('Ad is deleted.');
    }

    if (findAd.is_published === true) {
      throw new AppError('Ad already accepted.');
    }

    findAd.is_published = true;
    findAd.publication_date = new Date(Date.now());
    findAd.expiration_date = addMonths(findAd.publication_date, 3);

    await adsRepository.save(findAd);

    return findAd;
  }
}
