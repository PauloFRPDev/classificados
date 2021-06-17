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
  }: RequestData): Promise<void> {
    const jurisdictedRepository = getCustomRepository(JurisdictedRepository);

    const searchJurisdicted = await jurisdictedRepository.findByCpf(cpf);

    if (!searchJurisdicted) {
      const jurisdicted = jurisdictedRepository.create({
        cpf,
        name,
        category_id,
        registration_number,
      });

      await jurisdictedRepository.save(jurisdicted);
    }
  }
}
