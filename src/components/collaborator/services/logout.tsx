import axiosInstance from "./axiosInstance";

const logout = async () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('perfilName');
  if (window.location.pathname !== '/colaborador/login') {
    await axiosInstance.post('token/logout/');
    window.location.href = '/colaborador/login';
  }
};

export default logout;
