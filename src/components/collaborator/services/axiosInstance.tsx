import axios from "axios";
import logout from "./logout";

const url = process.env.REACT_APP_URL || 'http://localhost:8002/api/';

const axiosInstance = axios.create({
  baseURL: url,
  withCredentials: true, // Envia os cookies em todas as requisições
});

// Função para obter o token CSRF do cookie
function getCSRFToken() {
  const csrfCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='));
  return csrfCookie ? csrfCookie.split('=')[1] : '';
}

// Interceptor para adicionar o token CSRF nas requisições
axiosInstance.interceptors.request.use(config => {
  const csrfToken = getCSRFToken();
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    
    if (error.response && error.response.status === 401 && !originalRequest.url.includes('token/refresh/')) {
      axiosInstance.post('token/refresh/')
        .then(() => {
          return axiosInstance(originalRequest);
        })
        .catch(() => {
          console.log('entrou no ultimo catch')
          logout();
        })
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
