import React from 'react';
import {
  ReadOutlined,
  UnorderedListOutlined,
  FormOutlined
} from '@ant-design/icons';
import SearchFicha from '../Modulos/Capacita/SearchFicha';
import CreateFicha from '../Modulos/Capacita/CreateFicha';
import type { menuItemType } from '../types';

const itemCapacita = (
  setBaseContent: React.Dispatch<React.SetStateAction<React.ReactNode>>,
  setBaseTitle: React.Dispatch<React.SetStateAction<string>>,
  permissions: string[]
): menuItemType | null => {
  const menuItem = {
    searchFicha: {
      label: 'Gerenciar Fichas',
      key: 'searchFicha',
      icon: <UnorderedListOutlined />,
      onClick: () => {
        setBaseContent(<SearchFicha />);
        setBaseTitle('Gerenciar Fichas de Inscrição de Capacitação');
      }
    },
    createFicha: {
      label: 'Criar Ficha',
      key: 'createFicha',
      icon: <FormOutlined />,
      onClick: () => {
        setBaseContent(<CreateFicha />);
        setBaseTitle('Criar Ficha de Inscrição de Capacitação');
      }
    }
  };

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

  return items.length ? { label: 'Capacita', key: 'capacita', icon: <ReadOutlined />, children: items } : null;
};

export default itemCapacita;
