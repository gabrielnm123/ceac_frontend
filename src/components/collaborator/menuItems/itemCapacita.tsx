import React from 'react';
import {
  ReadOutlined,
  SearchOutlined
} from '@ant-design/icons';
import getMenuItem from './getMenuItem';
import SearchFicha from '../Modulos/SearchFicha';

const itemCapacita = (BaseContent: React.Dispatch<React.SetStateAction<React.ReactNode>>, BaseTitle: React.Dispatch<React.SetStateAction<string>>) => {
  const buscaCliente = () => {
    BaseContent(<SearchFicha />);
    BaseTitle('Buscar Ficha do Cliente');
  }

  return [
    getMenuItem('Capacita', 'capacita', <ReadOutlined />, [
      getMenuItem('Buscar Cliente', 'capacita_buscarCliente', <SearchOutlined />, undefined, buscaCliente)
    ])
  ]
}

export default itemCapacita;
