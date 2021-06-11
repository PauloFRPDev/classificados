import { NextFunction, Request, Response } from 'express';
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

  const userFiltered = usersRegistered.find(
    (user: requestData) => user.cpfcnpj === cpf,
  );

  let jurisdictedCategoryId = 0;

  switch (userFiltered.nome) {
    case 'AUXILIAR DE PRÓTESE DENTÁRIA':
      jurisdictedCategoryId = 7;
      break;
    case 'AUXILIAR EM SAÚDE BUCAL':
      jurisdictedCategoryId = 6;
      break;
    case 'CIRURGIÃO DENTISTA':
      jurisdictedCategoryId = 1;
      break;
    case 'TÉCNICO EM PRÓTESE DENTÁRIA':
      jurisdictedCategoryId = 3;
      break;
    case 'TÉCNICO EM SAÚDE BUCAL':
      jurisdictedCategoryId = 5;
      break;
    default:
      throw new Error('Wrong category');
  }

  const userUpdated = {
    ...userFiltered,
    categoryId: jurisdictedCategoryId,
    situacaoFinanceira:
      userFiltered['situação financeira'] === ''
        ? (userFiltered['situação financeira'] = 'Adimplente')
        : userFiltered['situação financeira'],
  };

  request.userFiltered = userUpdated;

  return next();
}
