import React, { useEffect, useState } from "react";
import perfisObject from "../services/perfisObject";
import { useNavigate } from "react-router-dom";
import Base from "../Base";
import itemUser from "../menuItems/itemUser";
import itemCapacita from "../menuItems/itemCapacita";
import itemAdministrator from "../menuItems/itemAdministrator";
import type { menuItemType } from "../types";
import SearchFicha from "./Capacita/SearchFicha";
import CreateFicha from "./Capacita/CreateFicha";
import SearchUser from "./Administrator/SearchUser";
import CreateUser from "./Administrator/CreateUser";
import SearchPerfil from "./Administrator/SearchPerfil";
import CreatePerfil from "./Administrator/CreatePerfil";

const Modulo: React.FC = () => {
  const [getItems, setItems] = useState<Array<menuItemType>>();
  const [getBaseContent, setBaseContent] = useState<null | React.ReactNode>(null);
  const [getBaseTitle, setBaseTitle] = useState<string>(String);
  const navigate = useNavigate();
  const perfisNamePermissions = perfisObject();
  const perfisNames = Object.keys(perfisNamePermissions);
  const perfilName = localStorage.getItem('perfilName')!;
  const permissions = perfisNamePermissions[perfilName];

  useEffect(() => {
    document.title = getBaseTitle;
  }, [getBaseContent, getBaseTitle, getItems])

  useEffect(() => {
    if (!perfisNames.includes(perfilName) && perfisNames[0] !== 'null') {
      navigate('/colaborador/perfil');
    }
  }, [perfisNamePermissions]);

  useEffect(() => {
    if (permissions) {
      const user = itemUser(setBaseContent, setBaseTitle);
      const capacita = itemCapacita(setBaseContent, setBaseTitle, permissions);
      const administrator = itemAdministrator(setBaseContent, setBaseTitle, permissions);
      const itemsList = [user, capacita, administrator];
      const items: menuItemType[] = [];
      for (const item of itemsList) {
        if (item) {
          items.push(item);
        }
      }
      setItems(items);

      switch (true) {
        case permissions.includes('SUPER USUÁRIO') || permissions.includes('searchFicha'):
          setBaseContent(<SearchFicha />);
          setBaseTitle('Gerenciar Fichas de Inscrição de Capacitação');
          break;
        case permissions.includes('createFicha'):
          setBaseContent(<CreateFicha />);
          setBaseTitle('Criar Ficha de Inscrição de Capacitação');
          break;
        case permissions.includes('searchUser'):
          setBaseContent(<SearchUser />);
          setBaseTitle('Gerenciar Operadores');
          break;
        case permissions.includes('createUser'):
          setBaseContent(<CreateUser />);
          setBaseTitle('Criar Operador');
          break;
        case permissions.includes('searchPerfil'):
          setBaseContent(<SearchPerfil />);
          setBaseTitle('Gerenciar Perfis de Operadores');
          break;
        case permissions.includes('createPerfil'):
          setBaseContent(<CreatePerfil />);
          setBaseTitle('Criar Perfil de Operadores');
          break;
      }
    }
  }, [permissions]);

  if (perfisNames.includes(perfilName!)) {
    return (
      <Base
        content={getBaseContent}
        title={getBaseTitle}
        menuItem={getItems}
      />
    );
  }

  return null;
};

export default Modulo;
