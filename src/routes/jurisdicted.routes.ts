import { Router } from 'express';

import EnsureIsRegistered from '../middlewares/EnsureIsRegistered';

const jurisdictedRoutes = Router();

jurisdictedRoutes.get('/', EnsureIsRegistered, async (request, response) => {
  const userSelected = request.userFiltered;

  return response.send(userSelected);
});

export default jurisdictedRoutes;
