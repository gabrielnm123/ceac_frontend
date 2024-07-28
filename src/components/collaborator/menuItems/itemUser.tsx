import React from 'react';
import {
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import getMenuItem from './getMenuItem';

const itemUser = () => {
  const logout = () => {
    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
    localStorage.removeItem('headers');
    localStorage.removeItem('userId');
    localStorage.removeItem('perfilName');
  };

  return [
    getMenuItem('Operador', 'operador', <UserOutlined />, [
      getMenuItem(<a href='/colaborador/login'>Sair</a>, 'sair', <LogoutOutlined />, undefined, logout)
    ])
  ]
}

export default itemUser;
