import React from 'react';
import {
  UserOutlined,
  LogoutOutlined,
  IdcardOutlined,
  EditOutlined,
} from '@ant-design/icons';
import getMenuItem from './getMenuItem';
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

export default itemUser;
