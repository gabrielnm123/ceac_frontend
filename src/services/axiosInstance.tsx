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
}, error => {
  const originalRequest = error.config;
  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = Cookies.get('refresh_token');
    if (refreshToken) {
      return axios.post(`${url}token/refresh/`, { refresh: refreshToken })
        .then((response) => {
          // Atualiza os tokens nos cookies
          Cookies.set('access_token', response.data.access);
          Cookies.set('refresh_token', response.data.refresh);

          // Atualiza o cabeçalho de autorização da requisição original
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;

          // Reexecuta a requisição original com o novo token e retorna a promessa
          return axiosInstance(originalRequest);
        })
        .catch((refreshError) => {
          // Rejeita o erro para que seja tratado no catch da requisição original
          return Promise.reject(refreshError);
        });
    }
  }
  // Caso não seja possível renovar o token ou outra condição ocorra, rejeita o erro normalmente
  return Promise.reject(error);
});

export default axiosInstance;
