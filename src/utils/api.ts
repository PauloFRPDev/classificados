import axios from 'axios';

const api = axios.create({
  headers: {
    get: {
      CHAVE: '1352b216-61cf-4a8a-8123-8fcd1e2fe5f0',
      SENHA: '9e0bccf0-775e-40db-9f6e-f60c7efaf3c1',
    },
  },
  baseURL: 'https://cro-rj.implanta.net.br/',
});

export default api;
