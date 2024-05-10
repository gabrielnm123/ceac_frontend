import axios from 'axios';

class Api {
  url = process.env.REACT_APP_URL || 'http://localhost:8002'

  async get(path: string, parameters: object) {
    try {
      const result = await axios.get(this.url+path, { params: parameters });
      return result.data;
    } catch (error) {
      console.error(error);
    }
  }

  async post(path: string, data: object) {
    try {
      const result = await axios.post(this.url+path, data);
      return result.data;
    } catch (error) {
      console.error(error);
    }
  }

  async put(path: string, data: object) {
    try {
      const result = await axios.put(this.url+path, data);
      return result.data;
    } catch (error) {
      console.error(error);
    }
  }

  async patch(path: string, data: object) {
    try {
      const result = await axios.patch(this.url+path, data);
      return result.data;
    } catch (error) {
      console.error(error);
    }
  }

  async delete(path: string, parameters: object) {
    try {
      const result = await axios.delete(this.url+path, { params: parameters });
      return result.data;
    } catch (error) {
      console.error(error);
    }
  }

  async head(path: string, parameters: object) {
    try {
      const result = await axios.head(this.url+path, { params: parameters });
      return result.headers;
    } catch (error) {
      console.error(error);
    }
  }

  async options(path: string, parameters: object) {
    try {
      const result = await axios.options(this.url+path, { params: parameters });
      return result.headers['allow'];
    } catch (error) {
      console.error(error);
    }
  }
};

export default Api;
