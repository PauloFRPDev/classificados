declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    userFiltered: {
      nome: string;
      numeroRegistro: string;
      nomeRazaoSocial: string;
      cpfcnpj: string;
      telefone: string;
      celular: string;
      endereco: string;
      situacao_financeira: string;
    };
  }
}
