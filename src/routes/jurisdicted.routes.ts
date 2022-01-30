import { Router } from 'express';

import EnsureIsRegistered from '../middlewares/EnsureIsRegistered';

const jurisdictedRoutes = Router();

jurisdictedRoutes.get('/', EnsureIsRegistered, async (request, response) => {
  const usersSelected = request.usersFiltered;

  return response.send(usersSelected);
});

export default jurisdictedRoutes;
