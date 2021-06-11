import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

import adsRouter from './ads.routes';
import jurisdictedRoutes from './jurisdicted.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.use('/ads', adsRouter);
routes.use('/jurisdicted', jurisdictedRoutes);

export default routes;
