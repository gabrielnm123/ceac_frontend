import React from "react";
import {
  UserAddOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  TeamOutlined
} from '@ant-design/icons'
import ManageUser from "../Modulos/Administrator/ManageUser";
import CreateUser from "../Modulos/Administrator/CreateUser";
import ManagePerfil from "../Modulos/Administrator/ManagePerfil";
import CreatePerfil from "../Modulos/Administrator/CreatePerfil";
import type { menuItemType } from '../types';

const itemAdministrator = (
  setBaseContent: React.Dispatch<React.SetStateAction<React.ReactNode>>,
  setBaseTitle: React.Dispatch<React.SetStateAction<string>>,
  permissions: string[]
): menuItemType | null => {
  const items = {
    manageUser: {
      label: 'Gerenciar Operadores',
      key: 'manageUser',
      icon: <UserOutlined />,
      onClick: () => {
        setBaseContent(<ManageUser />);
        setBaseTitle('Gerenciar Operadores');
      }
    },
    createUser: {
      label: 'Criar Operador',
      key: 'createUser',
      icon: <UserAddOutlined />,
      onClick: () => {
        setBaseContent(<CreateUser />);
        setBaseTitle('Criar Operador');
      }
    },
    managePerfil: {
      label: 'Gerenciar Perfis',
      key: 'managePerfil',
      icon: <TeamOutlined />,
      onClick: () => {
        setBaseContent(<ManagePerfil />);
        setBaseTitle('Gerenciar Perfis de Operadores');
      }
    },
    createPerfil: {
      label: 'Criar Perfil',
      key: 'createPerfil',
      icon: <UsergroupAddOutlined />,
      onClick: () => {
        setBaseContent(<CreatePerfil />);
        setBaseTitle('Criar Perfil de Operadores');
      }
    }
  }

  const menuItem: menuItemType[] = [];

  if (permissions.includes('SUPER USUÁRIO')) {
    for (const item of Object.values(items)) {
      if (item) {
        menuItem.push(item);
      }
    }
  } else {
    for (const item of Object.values(items)) {
      if (permissions.includes(item.key)) {
        menuItem.push(item);
      }
    }
  }

  return menuItem.length ? {label: 'Administrador', key: 'administrator', icon: <SettingOutlined />, children: menuItem} : null
}

export default itemAdministrator;
