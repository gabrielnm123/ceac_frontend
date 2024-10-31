import React from 'react';
import {
  UserOutlined,
  LogoutOutlined,
  IdcardOutlined,
  EditOutlined,
} from '@ant-design/icons';
import getMenuItem from './getMenuItem';
import ChangeRegistration from '../Modulos/User/ChangeRegistration';
import axiosInstance from '../services/axiosInstance';
import Cookies from 'js-cookie';

const logout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('perfilName');
  axiosInstance.post('logout/')
  .then(() => {
    // Redireciona o usuário para a página de login ou inicial
    window.location.href = '/colaborador/login';
  })
};

const itemUser = (
  setBaseContent: React.Dispatch<React.SetStateAction<React.ReactNode>>,
  setBaseTitle: React.Dispatch<React.SetStateAction<string>>,
) => {

  const changeRegistration = () => {
    setBaseContent(<ChangeRegistration />);
    setBaseTitle('Altere seu Cadastro');
  }

  return [
    getMenuItem('Operador', 'operador', <UserOutlined />, [
      getMenuItem('Alterar Cadastro', 'changeRegistration', <EditOutlined />, undefined, changeRegistration),
      getMenuItem(<a href='/colaborador/perfil'>Alterar Perfil</a>, 'perfil', <IdcardOutlined />, undefined),
      getMenuItem(<a href='/colaborador/login'>Sair</a>, 'sair', <LogoutOutlined />, undefined, logout),
    ])
  ]
}

export { itemUser, logout };
