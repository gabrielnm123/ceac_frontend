import React from 'react';
import {
  ReadOutlined,
  SearchOutlined,
  FormOutlined
} from '@ant-design/icons';
import getMenuItem from './getMenuItem';
import SearchClient from '../Modulos/SearchClient';
import CreateClient from '../Modulos/CreateClient';

const itemCapacita = (BaseContent: React.Dispatch<React.SetStateAction<React.ReactNode>>, BaseTitle: React.Dispatch<React.SetStateAction<string>>, permissions: string[]) => {
  const buscarCliente = () => {
    BaseContent(<SearchClient />);
    BaseTitle('Buscar Ficha do Cliente');
  }
  
  const criarCliente = () => {
    BaseContent(<CreateClient />);
    BaseTitle('Criar Ficha do Cliente');
  }

  BaseContent(<SearchClient />);
  BaseTitle('Buscar Ficha do Cliente');

  const permissionArray = [];
  if (permissions.includes('SUPER USUÁRIO')) {
    permissionArray.push(getMenuItem('Buscar Cliente', 'capacita_buscarCliente', <SearchOutlined />, undefined, buscarCliente))
    permissionArray.push(getMenuItem('Criar Cliente', 'capacita_criarCliente', <FormOutlined />, undefined, criarCliente))
  }
  else {
    if (permissions.includes('capacita_buscarCliente')) {
      permissionArray.push(getMenuItem('Buscar Cliente', 'capacita_buscarCliente', <SearchOutlined />, undefined, buscarCliente))
    }
    if (permissions.includes('capacita_criarCliente')) {
      permissionArray.push(getMenuItem('Criar Cliente', 'capacita_criarCliente', <FormOutlined />, undefined, criarCliente))
    }
  }

  return [
    getMenuItem('Capacita', 'capacita', <ReadOutlined />, permissionArray)
  ]
}

export default itemCapacita;
