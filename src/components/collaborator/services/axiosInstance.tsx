import axios from "axios";
import logout from "./logout";

const url = process.env.REACT_APP_URL || 'http://localhost:8002/api/';

const axiosInstance = axios.create({
  baseURL: url,
  withCredentials: true, // Envia os cookies em todas as requisições
});

// Função para obter o token CSRF do cookie
const getCSRFToken = () => {
  const csrfCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='));
  return csrfCookie ? csrfCookie.split('=')[1] : '';
}

// Função para obter o token de acesso do cookie
const getAccessTokenFromCookie = () => {
  const accessTokenCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('access_token='));
  return accessTokenCookie ? accessTokenCookie.split('=')[1] : '';
}

// Interceptor para adicionar o token CSRF nas requisições
axiosInstance.interceptors.request.use(config => {
  const csrfToken = getCSRFToken();
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  
  const accessToken = getAccessTokenFromCookie();
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest.url.includes('token/refresh/')) {
      return axiosInstance.post('token/refresh/')
        .then(() => {
          return axiosInstance(originalRequest);
        })
        .catch(() => {
          logout();
        });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
