import { Router } from 'express';
import { getCustomRepository, MoreThanOrEqual } from 'typeorm';
import multer from 'multer';
import { classToClass } from 'class-transformer';

import AppError from '../errors/AppError';
import EnsureAuthenticated from '../middlewares/EnsureAuthenticated';
import uploadConfig from '../config/upload';

import AdsRepository from '../repositories/AdsRepository';
import CreateAdService from '../services/CreateAdService';
import UpdateAdService from '../services/UpdateAdService';
import DeleteAdService from '../services/DeleteAdService';
import AcceptAdService from '../services/AcceptAdService';
import InsertFileService from '../services/InsertFileService';

import JurisdictedRepository from '../repositories/JurisdictedRepository';

const adsRoutes = Router();

const upload = multer(uploadConfig.multer);

// index
adsRoutes.get('/', async (request, response) => {
  const { city, district, description } = request.query;

  const adsRepository = getCustomRepository(AdsRepository);

  const ads = await adsRepository.find({
    where: {
      is_published: true,
      expiration_date: MoreThanOrEqual(new Date(Date.now())),
    },
    relations: ['city', 'district', 'category', 'jurisdicted', 'files'],
    take: 100,
    order: {
      created_at: 'ASC',
    },
  });

  const adsFiltered =
    (city || district || description) &&
    ads.filter(ad => {
      if (
        (city && ad.city.title.toLowerCase().includes(city as string)) ||
        (district &&
          ad.district.title.toLowerCase().includes(district as string)) ||
        (description &&
          ad.description.toLowerCase().includes(description as string))
      ) {
        return ad;
      }
      return null;
    });

  return response.json(classToClass(adsFiltered) ?? classToClass(ads));
});

// show
adsRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const adsRepository = getCustomRepository(AdsRepository);

  const ad = await adsRepository.findById(id);

  if (!ad) {
    throw new AppError('Ad not found.');
  }

  return response.json(ad);
});

// create
adsRoutes.post('/', async (request, response) => {
  const {
    cpf,
    phone_number,
    email,
    category_id,
    city_id,
    district_id,
    description,
  } = request.body;

  const jurisdictedRepository = getCustomRepository(JurisdictedRepository);

  const searchJurisdicted = await jurisdictedRepository.findByCpf(cpf);

  if (!searchJurisdicted) {
    throw new AppError('Jurisdicted not found!');
  }

  const createAd = new CreateAdService();

  const ad = await createAd.execute({
    cpf,
    phone_number,
    email,
    category_id,
    city_id,
    district_id,
    description,
  });

  return response.json(ad);
});

// update
adsRoutes.put('/:id', EnsureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const {
    phone_number,
    email,
    category_id,
    city_id,
    district_id,
    description,
  } = request.body;

  const updateAd = new UpdateAdService();

  const ad = await updateAd.execute({
    id,
    phone_number,
    email,
    category_id,
    city_id,
    district_id,
    description,
  });

  return response.json(ad);
});

// delete
adsRoutes.delete('/:id', EnsureAuthenticated, async (request, response) => {
  const { id } = request.params;

  const deleteAd = new DeleteAdService();

  await deleteAd.execute({ id });

  return response.status(200).json();
});

// accept ad
adsRoutes.patch(
  '/accept/:id',
  EnsureAuthenticated,
  async (request, response) => {
    const { id } = request.params;

    const acceptAd = new AcceptAdService();

    const ad = await acceptAd.execute({ id });

    return response.json(ad);
  },
);

adsRoutes.post(
  '/:id/files/add',
  upload.array('files', 2),
  async (request, response) => {
    const { id } = request.params;
    const { files } = request;

    const insertFileService = new InsertFileService();

    if (files) {
      await insertFileService.execute({
        ad_id: id,
        adFilenames:
          files.length === 1
            ? [files[0].filename]
            : [files[0].filename, files[1].filename],
      });
    }

    return response.json();
  },
);

export default adsRoutes;
