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
): menuItemType[] => {
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

  switch (true) {
    case permissions.includes('SUPER USUÁRIO'):
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
      break;
    case permissions.includes('searchUser'):
      items.push(
        getMenuItem('Gerenciar Operadores', 'searchUser', <UserOutlined />, undefined, searchUser)
      );
    case permissions.includes('createUser'):
      items.push(
        getMenuItem('Criar Operador', 'createUser', <UserAddOutlined />, undefined, createUser)
      );
    case permissions.includes('searchPerfil'):
      items.push(
        getMenuItem('Gerenciar Perfis', 'searchPerfil', <TeamOutlined />, undefined, searchPerfil)
      );
    case permissions.includes('createPerfil'):
      items.push(
        getMenuItem('Criar Perfil', 'createPerfil', <UsergroupAddOutlined />, undefined, createPerfil)
      );
  }

  return [
    getMenuItem('Administrador', 'administrator', <SettingOutlined />, items)
  ]
}

export default itemAdministrator;
