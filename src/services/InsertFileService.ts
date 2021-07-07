import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import DiskStorageProvider from '../providers/DiskStorageProvider';

import File from '../models/File';
import AdsRepository from '../repositories/AdsRepository';

interface RequestData {
  ad_id: string;
  adFilenames: string[];
}

export default class InsertFileService {
  public async execute({ ad_id, adFilenames }: RequestData): Promise<void> {
    const adsRepository = getCustomRepository(AdsRepository);
    const filesRepository = getRepository(File);
    const storageProvider = new DiskStorageProvider();

    const ad = await adsRepository.findById(ad_id);

    if (!ad) {
      throw new AppError('Ad not found!');
    }

    if (ad.files) {
      // TODO: Delete files
    }

    adFilenames.map(async adFilename => {
      const file = filesRepository.create({
        ad_id,
        filename: adFilename,
      });

      await filesRepository.save(file);
      await storageProvider.saveFile(adFilename);
    });
  }
}
