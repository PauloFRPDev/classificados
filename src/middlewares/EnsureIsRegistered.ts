import { NextFunction, Request, Response } from 'express';

import CreateJurisdictedService from '../services/CreateJurisdictedService';

import AppError from '../errors/AppError';
import api from '../utils/api';

interface requestData {
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
    '/siscaf/servico/api/RelatoriosPersonalizados?sistema=SISCAF&modulo=ADMINISTRATIVO&nomeRelatorio=RELA%C3%87%C3%83O%20DE%20PROFISSIONAIS%2FEMPRESAS&%40TIPO=8',
  );

  const usersRegistered = response.data;

  const userFiltered = await usersRegistered.find(
    (user: requestData) => user.cpfcnpj === String(cpf),
  );

  if (!userFiltered) {
    throw new AppError('Jurisdicted not found');
  }

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

  request.userFiltered = userUpdated;

  const createJurisdictedService = new CreateJurisdictedService();

  await createJurisdictedService.execute({
    cpf: String(cpf),
    name: userUpdated.nomeRazaoSocial,
    category_id: userUpdated.categoryId,
    registration_number: Number(userUpdated.numeroRegistro),
  });

  if (userUpdated.situacaoFinanceira === 'Inadimplente') {
    throw new AppError('Jurisdicted is in debt');
  }

  return next();
}
