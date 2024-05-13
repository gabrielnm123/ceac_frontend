import axios from 'axios';

class Api {
  url = process.env.REACT_APP_URL || 'http://localhost:8002'

  async get(path: string, parameters: object) {
    const result = await axios.get(this.url+path, { params: parameters });
    return result;
  }

  async post(path: string, data: object) {
    const result = await axios.post(this.url+path, data);
    return result;
  }

  async put(path: string, data: object) {
    const result = await axios.put(this.url+path, data);
    return result;
  }

  async patch(path: string, data: object) {
    const result = await axios.patch(this.url+path, data);
    return result;
  }

  async delete(path: string, parameters: object) {
    const result = await axios.delete(this.url+path, { params: parameters });
    return result;
  }

  async head(path: string, parameters: object) {
    const result = await axios.head(this.url+path, { params: parameters });
    return result;
  }

  async options(path: string, parameters: object) {
    const result = await axios.options(this.url+path, { params: parameters });
    return result;
  }
};

export default Api;
