import React from 'react';
import {
  ReadOutlined,
  SearchOutlined,
  FormOutlined
} from '@ant-design/icons';
import getMenuItem from './getMenuItem';
import SearchClient from '../Modulos/SearchClient';
import CreateClient from '../Modulos/CreateClient';

const itemCapacita = (BaseContent: React.Dispatch<React.SetStateAction<React.ReactNode>>, BaseTitle: React.Dispatch<React.SetStateAction<string>>) => {
  const buscarCliente = () => {
    BaseContent(<SearchClient />);
    BaseTitle('Buscar Ficha do Cliente');
  }
  
  const criarCliente = () => {
    BaseContent(<CreateClient />);
    BaseTitle('Criar Ficha do Cliente');
  }

  return [
    getMenuItem('Capacita', 'capacita', <ReadOutlined />, [
      getMenuItem('Buscar Cliente', 'capacita_buscarCliente', <SearchOutlined />, undefined, buscarCliente),
      getMenuItem('Criar Cliente', 'capacita_criarCliente', <FormOutlined />, undefined, criarCliente)
    ])
  ]
}

export default itemCapacita;
