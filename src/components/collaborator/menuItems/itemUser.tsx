import React from 'react';
import {
  UserOutlined,
  LogoutOutlined,
  IdcardOutlined,
  EditOutlined,
  LockOutlined
} from '@ant-design/icons';
import getMenuItem from './getMenuItem';
import ChangePassword from '../Modulos/User/ChangePassword';
import ChangeRegistration from '../Modulos/User/ChangeRegistration';

const itemUser = (
  setBaseContent: React.Dispatch<React.SetStateAction<React.ReactNode>>,
  setBaseTitle: React.Dispatch<React.SetStateAction<string>>,
) => {
  const logout = () => {
    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
    localStorage.removeItem('headers');
    localStorage.removeItem('userId');
    localStorage.removeItem('perfilName');
  };

  const changeRegistration = () => {
    setBaseContent(<ChangeRegistration />);
    setBaseTitle('Alterar Cadastro');
  }
  
  const changePassword = () => {
    setBaseContent(<ChangePassword />);
    setBaseTitle('Alterar Senha');
  }

  return [
    getMenuItem('Operador', 'operador', <UserOutlined />, [
      getMenuItem('Alterar Cadastro', 'changeRegistration', <EditOutlined />, undefined, changeRegistration),
      getMenuItem('Alterar Senha', 'changePassword', <LockOutlined />, undefined, changePassword),
      getMenuItem(<a href='/colaborador/perfil'>Alterar Perfil</a>, 'perfil', <IdcardOutlined />, undefined),
      getMenuItem(<a href='/colaborador/login'>Sair</a>, 'sair', <LogoutOutlined />, undefined, logout),
    ])
  ]
}

export default itemUser;
