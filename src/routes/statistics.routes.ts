import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import EnsureAuthenticated from '../middlewares/EnsureAuthenticated';

import AdsRepository from '../repositories/AdsRepository';

const statisticsRoutes = Router();

// Get number of ads on the current year
statisticsRoutes.get(
  '/ads/total',
  EnsureAuthenticated,
  async (request, response) => {
    const adsRepository = getCustomRepository(AdsRepository);

    const countAdsByYear = await adsRepository.findCountByYear();

    return response.json(countAdsByYear);
  },
);

export default statisticsRoutes;
