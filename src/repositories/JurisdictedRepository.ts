import { EntityRepository, Repository } from 'typeorm';
import Jurisdicted from '../models/Jurisdicted';

@EntityRepository(Jurisdicted)
class JurisdictedRepository extends Repository<Jurisdicted> {
  public async findByCpf(cpf: string): Promise<Jurisdicted | null> {
    const findJurisdicted = await this.findOne({
      where: {
        cpf,
      },
    });

    return findJurisdicted || null;
  }

  public async findByCpfAndRegistrationNumber(
    cpf: string,
    registrationNumber: number,
  ): Promise<Jurisdicted | null> {
    const findJurisdicted = await this.findOne({
      where: {
        cpf,
        registration_number: registrationNumber,
      },
    });

    return findJurisdicted || null;
  }
}

export default JurisdictedRepository;
