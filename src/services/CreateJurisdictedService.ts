import Jurisdicted from 'src/models/Jurisdicted';
import { getCustomRepository } from 'typeorm';

import JurisdictedRepository from '../repositories/JurisdictedRepository';

interface RequestData {
  cpf: string;
  name: string;
  category_id: number;
  registration_number: number;
}

export default class CreateJurisdictedService {
  public async execute({
    cpf,
    name,
    category_id,
    registration_number,
  }: RequestData): Promise<Jurisdicted> {
    const jurisdictedRepository = getCustomRepository(JurisdictedRepository);

    const searchJurisdicted = await jurisdictedRepository.findByCpfAndRegistrationNumber(
      cpf,
      registration_number,
    );

    if (!searchJurisdicted) {
      const jurisdicted = jurisdictedRepository.create({
        cpf,
        name,
        category_id,
        registration_number,
      });

      await jurisdictedRepository.save(jurisdicted);

      return jurisdicted;
    }

    return searchJurisdicted;
  }
}
