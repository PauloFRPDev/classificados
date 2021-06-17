import { Router } from 'express';
import { getRepository, ILike } from 'typeorm';

import District from '../models/District';

const districtsRoutes = Router();

districtsRoutes.get('/', async (request, response) => {
  const { title } = request.query;

  const districtsRepository = getRepository(District);

  const districts = await districtsRepository.find({
    where: {
      title: ILike(`%${title}%`),
    },
    take: 10,
  });

  const districtsFormatted = districts.map(district => ({
    ...district,
    value: district.id,
    label: district.title,
  }));

  return response.json(districtsFormatted);
});

export default districtsRoutes;
