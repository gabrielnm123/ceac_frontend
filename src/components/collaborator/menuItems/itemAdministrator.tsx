import React from "react";
import {
  UserAddOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  TeamOutlined
} from '@ant-design/icons'
import getMenuItem from "./getMenuItem";
import SearchUser from "../Modulos/Administrator/SearchUser";
import CreateUser from "../Modulos/Administrator/CreateUser";
import SearchPerfil from "../Modulos/Administrator/SearchPerfil";
import CreatePerfil from "../Modulos/Administrator/CreatePerfil";
import menuItemType from "../types/menuItem";

const itemAdministrator = (
  setBaseContent: React.Dispatch<React.SetStateAction<React.ReactNode>>,
  setBaseTitle: React.Dispatch<React.SetStateAction<string>>,
  permissions: string[]
): menuItemType | null => {
  const searchUser = () => {
    setBaseContent(<SearchUser />)
    setBaseTitle('Gerenciar Operadores')
  };

  const createUser = () => {
    setBaseContent(<CreateUser />)
    setBaseTitle('Criar Operador')
  };

  const searchPerfil = () => {
    setBaseContent(<SearchPerfil />)
    setBaseTitle('Gerenciar Perfis de Operadores')
  };

  const createPerfil = () => {
    setBaseContent(<CreatePerfil />)
    setBaseTitle('Criar Perfil de Operadores')
  };

  const items: menuItemType[] = [];

  if (permissions.includes('SUPER USUÁRIO')) {
    items.push(
      getMenuItem('Gerenciar Operadores', 'searchUser', <UserOutlined />, undefined, searchUser)
    );
    items.push(
      getMenuItem('Criar Operador', 'createUser', <UserAddOutlined />, undefined, createUser)
    );
    items.push(
      getMenuItem('Gerenciar Perfis', 'searchPerfil', <TeamOutlined />, undefined, searchPerfil)
    );
    items.push(
      getMenuItem('Criar Perfil', 'createPerfil', <UsergroupAddOutlined />, undefined, createPerfil)
    );
  } else {
    if (permissions.includes('searchUser')) {
      items.push(
        getMenuItem('Gerenciar Operadores', 'searchUser', <UserOutlined />, undefined, searchUser)
      );
    }
    if (permissions.includes('createUser')) {
      items.push(
        getMenuItem('Criar Operador', 'createUser', <UserAddOutlined />, undefined, createUser)
      );
    }
    if (permissions.includes('searchPerfil')) {
      items.push(
        getMenuItem('Gerenciar Perfis', 'searchPerfil', <TeamOutlined />, undefined, searchPerfil)
      );
    }
    if (permissions.includes('createPerfil')) {
      items.push(
        getMenuItem('Criar Perfil', 'createPerfil', <UsergroupAddOutlined />, undefined, createPerfil)
      );
    }
  }

  return items.length ? getMenuItem('Administrador', 'administrator', <SettingOutlined />, items) : null
}

export default itemAdministrator;
