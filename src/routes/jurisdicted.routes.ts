import { Router } from 'express';

import CreateJurisdictedService from '../services/CreateJurisdictedService';

import EnsureIsRegistered from '../middlewares/EnsureIsRegistered';

const jurisdictedRoutes = Router();

jurisdictedRoutes.post('/', EnsureIsRegistered, async (request, response) => {
  const { cpf } = request.headers;

  const userSelected = request.userFiltered;

  const createJurisdictedService = new CreateJurisdictedService();

  const jurisdicted = await createJurisdictedService.execute({
    cpf: String(cpf),
    name: userSelected.nomeRazaoSocial,
    category_id: userSelected.categoryId,
    registration_number: Number(userSelected.numeroRegistro),
  });

  return response.send(jurisdicted);
});

export default jurisdictedRoutes;
