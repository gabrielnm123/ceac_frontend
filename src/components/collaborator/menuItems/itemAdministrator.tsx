import React from "react";
import {
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  UsergroupDeleteOutlined,
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
  const searchPerfil = () => {
    setBaseContent(<SearchPerfil />)
    setBaseTitle('Buscar Perfil de Operadores')
  };

  const items: menuItemType[] = [];

  if (permissions.includes('SUPER USUÁRIO')) {
    items.push(
      getMenuItem('Buscar Perfil', 'searchPerfil', <TeamOutlined />, undefined, searchPerfil)
    );
  } else {
    if (permissions.includes('searchPerfil')) {
      items.push(
        getMenuItem('Buscar Perfil', 'searchPerfil', <TeamOutlined />, undefined, searchPerfil)
      );
    }
  };

  return [
    getMenuItem('Administrador', 'administrator', <SettingOutlined />, items)
  ]
}

export default itemAdministrator;
