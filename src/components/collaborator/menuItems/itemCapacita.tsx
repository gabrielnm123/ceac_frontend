import React from 'react';
import {
  ReadOutlined,
  SearchOutlined,
  FormOutlined
} from '@ant-design/icons';
import getMenuItem from './getMenuItem';
import SearchClient from '../Modulos/SearchClient';
import CreateClient from '../Modulos/CreateClient';
import type MenuItem from '../types/MenuItem';

const itemCapacita = (
  setBaseContent: React.Dispatch<React.SetStateAction<React.ReactNode>>,
  setBaseTitle: React.Dispatch<React.SetStateAction<string>>,
  permissions: string[]
): MenuItem[] => {
  const buscarCliente = () => {
    setBaseContent(<SearchClient />);
    setBaseTitle('Buscar Ficha do Cliente');
  };
  
  const criarCliente = () => {
    setBaseContent(<CreateClient />);
    setBaseTitle('Criar Ficha do Cliente');
  };
  
  const permissionArray: MenuItem[] = [];
  
  if (permissions.includes('SUPER USUÁRIO')) {
    permissionArray.push(
      getMenuItem('Buscar Cliente', 'capacita_buscarCliente', <SearchOutlined />, undefined, buscarCliente)
    );
    permissionArray.push(
      getMenuItem('Criar Cliente', 'capacita_criarCliente', <FormOutlined />, undefined, criarCliente)
    );
  } else {
    if (permissions.includes('capacita_buscarCliente')) {
      permissionArray.push(
        getMenuItem('Buscar Cliente', 'capacita_buscarCliente', <SearchOutlined />, undefined, buscarCliente)
      );
      setBaseContent(<SearchClient />);
      setBaseTitle('Buscar Ficha do Cliente');
    }
    if (permissions.includes('capacita_criarCliente')) {
      permissionArray.push(
        getMenuItem('Criar Cliente', 'capacita_criarCliente', <FormOutlined />, undefined, criarCliente)
      );
    }
  }

  return [
    getMenuItem('Capacita', 'capacita', <ReadOutlined />, permissionArray)
  ];
};

export default itemCapacita;
