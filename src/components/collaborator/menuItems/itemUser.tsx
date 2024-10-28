import React from 'react';
import {
  UserOutlined,
  LogoutOutlined,
  IdcardOutlined,
  EditOutlined,
} from '@ant-design/icons';
import getMenuItem from './getMenuItem';
import ChangeRegistration from '../Modulos/User/ChangeRegistration';
import axiosInstance from '../../../services/axiosInstance';
import Cookies from 'js-cookie';

const logout = () => {
  const refreshToken = Cookies.get('refresh_token');
  Cookies.remove('refresh_token');
  Cookies.remove('access_token');
  localStorage.removeItem('userId');
  localStorage.removeItem('perfilName');
  axiosInstance.post('token/invalidate/', { refresh: refreshToken }).catch(() => {})
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
