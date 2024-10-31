import axios from "axios";

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

// Interceptor de resposta para lidar com erros 401 e tentar renovar o token
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axiosInstance.post('token/refresh/');
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Redirecionar para a página de login ou lidar com o erro de outra forma
        window.location.href = '/colaborador/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;