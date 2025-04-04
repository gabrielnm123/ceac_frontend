import axiosInstance from "./axiosInstance";

const logout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('perfilName');
  if (window.location.pathname !== '/colaborador/login') {
    axiosInstance.post('token/logout/');
    window.location.href = '/colaborador/login';
  }
};

export default logout;
