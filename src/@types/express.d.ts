declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    usersFiltered: {
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
    }[];
  }
}
