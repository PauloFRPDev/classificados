import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import EnsureAuthenticated from '../middlewares/EnsureAuthenticated';

import AdsRepository from '../repositories/AdsRepository';

const statisticsRoutes = Router();

// Get number of ads on the current year
statisticsRoutes.get(
  '/announcements/total',
  EnsureAuthenticated,
  async (request, response) => {
    const adsRepository = getCustomRepository(AdsRepository);

    const countAdsByYear = await adsRepository.findCountByYear();

    return response.json(countAdsByYear);
  },
);

statisticsRoutes.get(
  '/announcements/total_category',
  EnsureAuthenticated,
  async (request, response) => {
    const adsRepository = getCustomRepository(AdsRepository);

    const countTotalAdsPerCategory = await adsRepository.findCountAdsPerCategory();

    return response.json(countTotalAdsPerCategory);
  },
);

export default statisticsRoutes;
