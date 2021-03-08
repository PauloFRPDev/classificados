import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import AdsRepository from '../repositories/AdsRepository';

interface RequestData {
  id: string;
}

export default class DeleteAdService {
  public async execute({ id }: RequestData): Promise<void> {
    const adsRepository = getCustomRepository(AdsRepository);

    const findAd = await adsRepository.findById(id);

    if (!findAd) {
      throw new AppError('Ad not found.');
    }

    if (findAd.deleted_at !== null) {
      throw new AppError('Ad already deleted.');
    }

    findAd.deleted_at = new Date(Date.now());

    await adsRepository.save(findAd);
  }
}
