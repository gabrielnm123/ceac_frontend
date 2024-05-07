import axios from 'axios';

const api = {
  get: async function(url: string, parameters: object) {
    try {
      const resposta = await axios.get(url, { params: parameters });
      return resposta.data;
    } catch (erro) {
      console.error(erro);
    }
  },

  post: async function(url: string, data: object) {
    try {
      const resposta = await axios.post(url, data);
      return resposta.data;
    } catch (erro) {
      console.error(erro);
    }
  },

  put: async function(url: string, data: object) {
    try {
      const resposta = await axios.put(url, data);
      return resposta.data;
    } catch (erro) {
      console.error(erro);
    }
  },

  patch: async function(url: string, data: object) {
    try {
      const resposta = await axios.patch(url, data);
      return resposta.data;
    } catch (erro) {
      console.error(erro);
    }
  },

  delete: async function(url: string) {
    try {
      const resposta = await axios.delete(url);
      return resposta.data;
    } catch (erro) {
      console.error(erro);
    }
  },

  head: async function(url: string) {
    try {
      const resposta = await axios.head(url);
      return resposta.headers;
    } catch (erro) {
      console.error(erro);
    }
  },

  options: async function(url: string) {
    try {
      const resposta = await axios.options(url);
      return resposta.headers['allow'];
    } catch (erro) {
      console.error(erro);
    }
  }
};

export default api;
