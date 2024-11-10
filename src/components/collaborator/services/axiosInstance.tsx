import axios from "axios";
import logout from "./logout";

const url = process.env.REACT_APP_URL || 'http://localhost:8002/api/';

const axiosInstance = axios.create({
  baseURL: url,
  withCredentials: true,
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
