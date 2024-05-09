import axios from 'axios';

class Api {
  url = process.env.REACT_APP_URL || 'http://localhost:8002'

  async get(path: string, parameters: object) {
    try {
      const resposta = await axios.get(this.url+path, { params: parameters });
      return resposta.data;
    } catch (erro) {
      console.error(erro);
    }
  }

  async post(path: string, data: object) {
    try {
      const resposta = await axios.post(this.url+path, data);
      return resposta.data;
    } catch (erro) {
      console.error(erro);
    }
  }

  async put(path: string, data: object) {
    try {
      const resposta = await axios.put(this.url+path, data);
      return resposta.data;
    } catch (erro) {
      console.error(erro);
    }
  }

  async patch(path: string, data: object) {
    try {
      const resposta = await axios.patch(this.url+path, data);
      return resposta.data;
    } catch (erro) {
      console.error(erro);
    }
  }

  async delete(path: string, parameters: object) {
    try {
      const resposta = await axios.delete(this.url+path, { params: parameters });
      return resposta.data;
    } catch (erro) {
      console.error(erro);
    }
  }

  async head(path: string, parameters: object) {
    try {
      const resposta = await axios.head(this.url+path, { params: parameters });
      return resposta.headers;
    } catch (erro) {
      console.error(erro);
    }
  }

  async options(path: string, parameters: object) {
    try {
      const resposta = await axios.options(this.url+path, { params: parameters });
      return resposta.headers['allow'];
    } catch (erro) {
      console.error(erro);
    }
  }
};

export default Api;
