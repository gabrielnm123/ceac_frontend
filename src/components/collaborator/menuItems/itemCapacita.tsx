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
  const items: { [key: string]: { label: string; key: string; icon: JSX.Element; onClick: () => void } } = {
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

  const menuItem: menuItemType[] = [];

  if (permissions.includes('SUPER USUÁRIO')) {
    for (const key in items) {
      menuItem.push(items[key]);
    }
  } else {
    for (const item of Object.values(items)) {
      if (permissions.includes(item.key)) {
        menuItem.push(item);
      }
    }
  }

  return menuItem.length ? { label: 'Capacita', key: 'capacita', icon: <ReadOutlined />, children: menuItem } : null;
};

export default itemCapacita;
