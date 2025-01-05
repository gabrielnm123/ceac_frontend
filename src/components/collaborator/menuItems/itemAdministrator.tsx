import React from "react";
import {
  UserAddOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  TeamOutlined
} from '@ant-design/icons'
import SearchUser from "../Modulos/Administrator/SearchUser";
import CreateUser from "../Modulos/Administrator/CreateUser";
import SearchPerfil from "../Modulos/Administrator/SearchPerfil";
import CreatePerfil from "../Modulos/Administrator/CreatePerfil";
import type { menuItemType } from '../types';

const itemAdministrator = (
  setBaseContent: React.Dispatch<React.SetStateAction<React.ReactNode>>,
  setBaseTitle: React.Dispatch<React.SetStateAction<string>>,
  permissions: string[]
): menuItemType | null => {
  const menuItem = {
    searchUser: {
      label: 'Gerenciar Operadores',
      key: 'searchUser',
      icon: <UserOutlined />,
      onClick: () => {
        setBaseContent(<SearchUser />);
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
    searchPerfil: {
      label: 'Gerenciar Perfis',
      key: 'searchPerfil',
      icon: <TeamOutlined />,
      onClick: () => {
        setBaseContent(<SearchPerfil />);
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

  const items: menuItemType[] = [];

  if (permissions.includes('SUPER USUÁRIO')) {
    for (const item of Object.values(menuItem)) {
      if (item) {
        items.push(item);
      }
    }
  } else {
    for (const item of Object.values(menuItem)) {
      if (permissions.includes(item.key)) {
        items.push(item);
      }
    }
  }

  return items.length ? {label: 'Administrador', key: 'administrator', icon: <SettingOutlined />, children: items} : null
}

export default itemAdministrator;
