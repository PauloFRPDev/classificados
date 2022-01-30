import { NextFunction, Request, Response } from 'express';

import Jurisdicted from 'src/models/Jurisdicted';
import CreateJurisdictedService from '../services/CreateJurisdictedService';

import AppError from '../errors/AppError';
import api from '../utils/api';

interface requestData {
  jurisdictedId?: string;
  nome: string;
  numeroRegistro: string;
  nomeRazaoSocial: string;
  cpfcnpj: string;
  telefone: string;
  celular: string;
  endereco: string;
  categoryId: number;
  situacaoFinanceira: string;
}

export default async function ensureIsRegistered(
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  const { cpf } = request.headers;

  const response = await api.get(
    '/siscaf/servico/api/RelatoriosPersonalizados?sistema=SISCAF&modulo=ADMINISTRATIVO&nomeRelatorio=RELA%C3%87%C3%83O%20DE%20PROFISSIONAIS%2FEMPRESAS',
  );

  const usersRegistered = response.data;

  const usersFiltered = await usersRegistered.filter(
    (user: requestData) => user.cpfcnpj === String(cpf),
  );

  if (usersFiltered.length === 0) {
    throw new AppError('Jurisdicted not found');
  }

  const newList = [] as requestData[];
  let count = 0;

  usersFiltered.forEach(async (userFiltered: requestData) => {
    let jurisdictedCategoryId = 0;
    let jurisdictedCategory = '';

    switch (userFiltered.nome) {
      case 'AUXILIAR DE PRÓTESE DENTÁRIA':
        jurisdictedCategoryId = 7;
        jurisdictedCategory = 'APD';
        break;
      case 'AUXILIAR EM SAÚDE BUCAL':
        jurisdictedCategoryId = 6;
        jurisdictedCategory = 'ASB';
        break;
      case 'CIRURGIÃO DENTISTA':
        jurisdictedCategoryId = 1;
        jurisdictedCategory = 'CD';
        break;
      case 'TÉCNICO EM PRÓTESE DENTÁRIA':
        jurisdictedCategoryId = 3;
        jurisdictedCategory = 'TPD';
        break;
      case 'TÉCNICO EM SAÚDE BUCAL':
        jurisdictedCategoryId = 5;
        jurisdictedCategory = 'TSB';
        break;
      default:
        throw new Error('Wrong category');
    }

    const userUpdated = {
      ...userFiltered,
      categoryId: jurisdictedCategoryId,
      category: jurisdictedCategory,
      situacaoFinanceira:
        userFiltered['situação financeira'] === ''
          ? (userFiltered['situação financeira'] = 'Adimplente')
          : userFiltered['situação financeira'],
    };

    const createJurisdictedService = new CreateJurisdictedService();

    const createdJurisdicted: Jurisdicted = await createJurisdictedService.execute(
      {
        cpf: String(cpf),
        name: userUpdated.nomeRazaoSocial,
        category_id: userUpdated.categoryId,
        registration_number: Number(userUpdated.numeroRegistro),
      },
    );

    if (userUpdated.situacaoFinanceira !== 'Inadimplente') {
      newList.push({ ...userUpdated, jurisdictedId: createdJurisdicted.id });
    }

    request.usersFiltered = newList;

    count += 1;

    if (
      usersFiltered.length === count &&
      !request.usersFiltered?.filter(
        user => user.situacaoFinanceira !== 'Inadimplente',
      )
    ) {
      throw new AppError('Jurisdicted is in debt');
    } else if (usersFiltered.length === count) {
      return next();
    }
  });

  // setTimeout(() => {
  // if (
  //   !request.usersFiltered?.filter(
  //     user => user.situacaoFinanceira !== 'Inadimplente',
  //   )
  // ) {
  //   throw new AppError('Jurisdicted is in debt');
  // }

  // }, 2000);
}
