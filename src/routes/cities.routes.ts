import { Router } from 'express';
import { getRepository } from 'typeorm';

import City from '../models/City';

const citiesRoutes = Router();

citiesRoutes.get('/', async (request, response) => {
  const citiesRepository = getRepository(City);

  const cities = await citiesRepository.find();

  const citiesFormatted = cities.map(city => ({
    ...city,
    value: city.id,
    label: city.title,
  }));

  response.json(citiesFormatted);
});

export default citiesRoutes;
