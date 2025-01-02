import React from 'react';
import {
  ReadOutlined,
  SearchOutlined,
  FormOutlined
} from '@ant-design/icons';
import getMenuItem from './getMenuItem';
import SearchFicha from '../Modulos/Capacita/SearchFicha';
import CreateFicha from '../Modulos/Capacita/CreateFicha';
import type menuItemType from '../types/menuItem';

const itemCapacita = (
  setBaseContent: React.Dispatch<React.SetStateAction<React.ReactNode>>,
  setBaseTitle: React.Dispatch<React.SetStateAction<string>>,
  permissions: string[]
): menuItemType[] => {
  const searchFicha = () => {
    setBaseContent(<SearchFicha />);
    setBaseTitle('Buscar Ficha de Inscrição de Capacitação');
  };

  const createFicha = () => {
    setBaseContent(<CreateFicha />);
    setBaseTitle('Criar Ficha de Inscrição de Capacitação');
  };

  const items: menuItemType[] = [];

  if (permissions.includes('SUPER USUÁRIO')) {
    items.push(
      getMenuItem('Buscar Ficha', 'searchFicha', <SearchOutlined />, undefined, searchFicha)
    );
    items.push(
      getMenuItem('Criar Ficha', 'createFicha', <FormOutlined />, undefined, createFicha)
    );
    setBaseContent(<SearchFicha />);
    setBaseTitle('Buscar Ficha de Inscrição de Capacitação');
  } else {
    if (permissions.includes('searchFicha')) {
      items.push(
        getMenuItem('Buscar Ficha', 'searchFicha', <SearchOutlined />, undefined, searchFicha)
      );
      setBaseContent(<SearchFicha />);
      setBaseTitle('Buscar Ficha de Inscrição de Capacitação');
    }
    if (permissions.includes('createFicha')) {
      items.push(
        getMenuItem('Criar Ficha', 'createFicha', <FormOutlined />, undefined, createFicha)
      );
      if (!permissions.includes('searchFicha')) {
        setBaseContent(<CreateFicha />);
        setBaseTitle('Criar Ficha de Inscrição de Capacitação');
      };
    }
  }

  return [
    getMenuItem('Capacita', 'capacita', <ReadOutlined />, items)
  ];
};

export default itemCapacita;
