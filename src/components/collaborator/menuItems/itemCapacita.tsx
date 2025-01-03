import React from 'react';
import {
  ReadOutlined,
  UnorderedListOutlined,
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
): menuItemType | null => {
  const searchFicha = () => {
    setBaseContent(<SearchFicha />);
    setBaseTitle('Gerenciar Fichas de Inscrição de Capacitação');
  };

  const createFicha = () => {
    setBaseContent(<CreateFicha />);
    setBaseTitle('Criar Ficha de Inscrição de Capacitação');
  };

  const items: menuItemType[] = [];

  if (permissions.includes('SUPER USUÁRIO')) {
    items.push(
      getMenuItem('Gerenciar Fichas', 'searchFicha', <UnorderedListOutlined />, undefined, searchFicha)
    );
    items.push(
      getMenuItem('Criar Ficha', 'createFicha', <FormOutlined />, undefined, createFicha)
    );
  } else {
    if (permissions.includes('searchFicha')) {
      items.push(
        getMenuItem('Gerenciar Fichas', 'searchFicha', <UnorderedListOutlined />, undefined, searchFicha)
      );
    }
    if (permissions.includes('createFicha')) {
      items.push(
        getMenuItem('Criar Ficha', 'createFicha', <FormOutlined />, undefined, createFicha)
      );
    }
  }

  return items.length ? getMenuItem('Capacita', 'capacita', <ReadOutlined />, items) : null;
};

export default itemCapacita;
