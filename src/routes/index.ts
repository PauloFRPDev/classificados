import { Router } from 'express';

import adsRouter from './ads.routes';

const routes = Router();

routes.use('/ads', adsRouter);

export default routes;
