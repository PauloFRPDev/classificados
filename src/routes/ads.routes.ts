import { Router } from 'express';

const adsRouter = Router();

// index
adsRouter.get('/', (request, response) => {
  return response.json({ msg: 'You are into adsRouter' });
});

// show
adsRouter.get('/', (request, response) => {
  return response.json({ msg: 'You are into adsRouter' });
});

export default adsRouter;
