import { Router } from 'express';
import { getRepository, ILike } from 'typeorm';

import City from '../models/City';

const citiesRoutes = Router();

citiesRoutes.get('/', async (request, response) => {
  const { title } = request.query;

  const citiesRepository = getRepository(City);

  const cities = await citiesRepository.find({
    where: {
      title: ILike(`%${title}%`),
    },
  });

  const citiesFormatted = cities.map(city => ({
    ...city,
    value: city.id,
    label: city.title,
  }));

  response.json(citiesFormatted);
});

export default citiesRoutes;
