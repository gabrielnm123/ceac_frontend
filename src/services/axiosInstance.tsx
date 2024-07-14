import axios from "axios";

const url = process.env.REACT_APP_URL || 'http://localhost:8002/api/';

const getHeaders = () => {
  const headers = localStorage.getItem('headers');
  return headers ? JSON.parse(headers) : {};
};

const axiosInstance = axios.create({
  baseURL: url
});

axiosInstance.interceptors.request.use(config => {
  config.headers = getHeaders();
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;
