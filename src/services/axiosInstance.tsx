import axios from 'axios';

const getAccess = () => localStorage.getItem('access');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8002/api',
  headers: {
    'Authorization': `Bearer ${getAccess()}`
  }
});

export default axiosInstance;
