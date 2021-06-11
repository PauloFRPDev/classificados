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
      categoryId: number;
      situacaoFinanceira: string;
    };
  }
}
