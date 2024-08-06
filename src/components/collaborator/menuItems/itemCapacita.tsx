import React from 'react';
import {
  ReadOutlined,
  SearchOutlined,
  FormOutlined
} from '@ant-design/icons';
import getMenuItem from './getMenuItem';
import SearchFicha from '../Modulos/Capacita/SearchFicha';
import CreateFicha from '../Modulos/Capacita/CreateFicha';
import type MenuItem from '../types/MenuItem';

const itemCapacita = (
  setBaseContent: React.Dispatch<React.SetStateAction<React.ReactNode>>,
  setBaseTitle: React.Dispatch<React.SetStateAction<string>>,
  permissions: string[]
): MenuItem[] => {
  const buscarFicha = () => {
    setBaseContent(<SearchFicha />);
    setBaseTitle('Buscar Ficha de Inscrição de Capacitação');
  };
  
  const criarFicha = () => {
    setBaseContent(<CreateFicha />);
    setBaseTitle('Criar Ficha de Inscrição de Capacitação');
  };
  
  const permissionArray: MenuItem[] = [];
  
  if (permissions.includes('SUPER USUÁRIO')) {
    permissionArray.push(
      getMenuItem('Buscar Ficha', 'capacita_buscarFicha', <SearchOutlined />, undefined, buscarFicha)
    );
    permissionArray.push(
      getMenuItem('Criar Ficha', 'capacita_criarFicha', <FormOutlined />, undefined, criarFicha)
    );
  } else {
    if (permissions.includes('capacita_buscarFicha')) {
      permissionArray.push(
        getMenuItem('Buscar Ficha', 'capacita_buscarFicha', <SearchOutlined />, undefined, buscarFicha)
      );
      setBaseContent(<SearchFicha />);
      setBaseTitle('Buscar Ficha de Inscrição de Capacitação');
    }
    if (permissions.includes('capacita_criarFicha')) {
      permissionArray.push(
        getMenuItem('Criar Ficha', 'capacita_criarFicha', <FormOutlined />, undefined, criarFicha)
      );
    }
  }

  return [
    getMenuItem('Capacita', 'capacita', <ReadOutlined />, permissionArray)
  ];
};

export default itemCapacita;
