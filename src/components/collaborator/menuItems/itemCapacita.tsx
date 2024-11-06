import React from 'react';
import {
  ReadOutlined,
  SearchOutlined,
  FormOutlined
} from '@ant-design/icons';
import getMenuItem from './getMenuItem';
import SearchFicha from '../Modulos/Capacita/SearchFicha';
import CreateFicha from '../Modulos/Capacita/CreateFicha';
import type menuItem from '../types/menuItem';

const itemCapacita = (
  setBaseContent: React.Dispatch<React.SetStateAction<React.ReactNode>>,
  setBaseTitle: React.Dispatch<React.SetStateAction<string>>,
  permissions: string[]
): menuItem[] => {
  const buscarFicha = () => {
    setBaseContent(<SearchFicha />);
    setBaseTitle('Buscar Ficha de Inscrição de Capacitação');
  };
  
  const criarFicha = () => {
    setBaseContent(<CreateFicha />);
    setBaseTitle('Criar Ficha de Inscrição de Capacitação');
  };
  
  const permissionArray: menuItem[] = [];
  
  if (permissions.includes('SUPER USUÁRIO')) {
    permissionArray.push(
      getMenuItem('Buscar Ficha', 'buscarFicha', <SearchOutlined />, undefined, buscarFicha)
    );
    permissionArray.push(
      getMenuItem('Criar Ficha', 'criarFicha', <FormOutlined />, undefined, criarFicha)
    );
    setBaseContent(<SearchFicha />);
    setBaseTitle('Buscar Ficha de Inscrição de Capacitação');
  } else {
    if (permissions.includes('buscarFicha')) {
      permissionArray.push(
        getMenuItem('Buscar Ficha', 'buscarFicha', <SearchOutlined />, undefined, buscarFicha)
      );
      setBaseContent(<SearchFicha />);
      setBaseTitle('Buscar Ficha de Inscrição de Capacitação');
    }
    if (permissions.includes('criarFicha')) {
      permissionArray.push(
        getMenuItem('Criar Ficha', 'criarFicha', <FormOutlined />, undefined, criarFicha)
      );
    }
  }

  return [
    getMenuItem('Capacita', 'capacita', <ReadOutlined />, permissionArray)
  ];
};

export default itemCapacita;
