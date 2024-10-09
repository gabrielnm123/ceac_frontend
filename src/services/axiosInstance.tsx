import axios from "axios";
import Cookies from "js-cookie";

// Definir a URL base da API
const url = process.env.REACT_APP_URL || 'http://localhost:8002/api/';

// Criar uma instância do Axios
const axiosInstance = axios.create({
  baseURL: url,
});

// Interceptores de requisição para incluir os cookies
axiosInstance.interceptors.request.use(config => {
  const accessToken = Cookies.get('access_token');  // Recupera o cookie de acesso
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;  // Adiciona o token ao cabeçalho
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Interceptores de resposta para tratar erros globais
axiosInstance.interceptors.response.use(response => {
  return response;
}, async error => {
  const originalRequest = error.config;
  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const refreshToken = Cookies.get('refresh_token');
      if (refreshToken) {
        const response = await axios.post(`${url}token/refresh/`, { refresh: refreshToken });
        Cookies.set('access_token', response.data.access);
        Cookies.set('refresh_token', response.data.refresh);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return axiosInstance(originalRequest); // Reexecuta a requisição original
      }
    } catch (refreshError) {
      console.error("Erro ao renovar o token.", refreshError);
      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(error);
});

export default axiosInstance;
