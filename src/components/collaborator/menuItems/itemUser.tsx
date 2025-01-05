import React from 'react';
import {
  UserOutlined,
  LogoutOutlined,
  IdcardOutlined,
  EditOutlined,
} from '@ant-design/icons';
import ChangeRegistration from '../Modulos/User/ChangeRegistration';
import logout from '../services/logout';
import type { menuItemType } from '../types';

const itemUser = (
  setBaseContent: React.Dispatch<React.SetStateAction<React.ReactNode>>,
  setBaseTitle: React.Dispatch<React.SetStateAction<string>>,
): menuItemType => {

  return {
    label: 'Operador',
    key: 'operator',
    icon: <UserOutlined />,
    children: [
      {
        label: 'Alterar Cadastro',
        key: 'changeRegistration',
        icon: <EditOutlined />,
        onClick: () => {
          setBaseContent(<ChangeRegistration />);
          setBaseTitle('Altere seu Cadastro');
        },
      },
      {
        label: <a href='/colaborador/perfil'>Alterar Perfil</a>,
        key: 'perfil',
        icon: <IdcardOutlined />,
      },
      {
        label: <a href='/colaborador/login'>Sair</a>,
        key: 'sair',
        icon: <LogoutOutlined />,
        onClick: logout,
      },
    ],
  };
};

export default itemUser;
