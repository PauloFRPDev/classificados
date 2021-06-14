import { Router } from 'express';
import { getRepository } from 'typeorm';

import District from '../models/District';

const districtsRoutes = Router();

districtsRoutes.get('/', async (request, response) => {
  const districtsRepository = getRepository(District);

  const districts = await districtsRepository.find();

  const districtsFormatted = districts.map(district => ({
    ...district,
    value: district.id,
    label: district.title,
  }));

  return response.json(districtsFormatted);
});

export default districtsRoutes;
