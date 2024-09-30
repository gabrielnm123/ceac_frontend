import axios from "axios";
import { getCookie } from "./cookie";

// Definir a URL base da API
const url = process.env.REACT_APP_URL || 'http://localhost:8002/api/';

// Criar uma instância do Axios
const axiosInstance = axios.create({
  baseURL: url,
});

// Interceptores de requisição para incluir os cookies
axiosInstance.interceptors.request.use(config => {
  const accessToken = getCookie('access_token');  // Recupera o cookie de acesso
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
  if (error.response && error.response.status === 401) {
    // Tratamento para redirecionar ou renovar o token, dependendo do status de erro
    console.error("Não autorizado, redirecionando para o login...");
  }
  return Promise.reject(error);
});

export default axiosInstance;
