declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    usersFiltered: {
      jurisdictedId?: string;
      Nome: string;
      NumeroRegistro: string;
      NomeRazaoSocial: string;
      CPFCNPJ: string;
      Telefone: string;
      Celular: string;
      Endereco: string;
      categoryId: number;
      situacaoFinanceira: string;
    }[];
  }
}
