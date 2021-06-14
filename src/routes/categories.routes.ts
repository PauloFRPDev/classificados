import { Router } from 'express';
import { getRepository } from 'typeorm';

import AdCategory from '../models/AdCategory';

const categoriesRoutes = Router();

categoriesRoutes.get('/', async (request, response) => {
  const categoriesRepository = getRepository(AdCategory);

  const categories = await categoriesRepository.find();

  const categoriesFormatted = categories.map(category => ({
    ...category,
    value: category.id,
    label: category.title,
  }));

  return response.json(categoriesFormatted);
});

export default categoriesRoutes;
