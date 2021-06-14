import { Router } from 'express';

import usersRoutes from './users.routes';
import sessionsRoutes from './sessions.routes';

import adsRoutes from './ads.routes';
import jurisdictedRoutes from './jurisdicted.routes';
import categoriesRoutes from './categories.routes';
import citiesRoutes from './cities.routes';
import districtsRoutes from './districts.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

routes.use('/categories', categoriesRoutes);
routes.use('/ads', adsRoutes);
routes.use('/jurisdicted', jurisdictedRoutes);
routes.use('/cities', citiesRoutes);
routes.use('/districts', districtsRoutes);

export default routes;
