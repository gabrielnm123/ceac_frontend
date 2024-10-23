import axios from "axios";
import Cookies from "js-cookie";

const url = process.env.REACT_APP_URL || 'http://localhost:8002/api/';

const axiosInstance = axios.create({
  baseURL: url,
});

axiosInstance.interceptors.request.use(config => {
  const accessToken = Cookies.get('access_token');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

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
          Cookies.set('access_token', response.data.access);
          Cookies.set('refresh_token', response.data.refresh);

          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;

          return axiosInstance(originalRequest);
        })
        .catch((refreshError) => {
          return Promise.reject(refreshError);
        });
    }
  }
  return Promise.reject(error);
});

export default axiosInstance;
