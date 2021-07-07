import axios from 'axios';

const api = axios.create({
  headers: {
    get: {
      CHAVE: process.env.IMPLANTA_CHAVE,
      SENHA: process.env.IMPLANTA_SENHA,
    },
  },
  baseURL: process.env.API_IMPLANTA_BASE_URL,
});

export default api;
