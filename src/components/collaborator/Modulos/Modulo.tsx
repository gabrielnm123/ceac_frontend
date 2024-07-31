import React, { useEffect, useState } from "react";
import authenticationVerify from "../../../services/authenticationVerify";
import perfisObject from "../../../services/perfisObject";
import { useNavigate } from "react-router-dom";
import Base from "../Base";
import itemUser from "../menuItems/itemUser";
import itemCapacita from "../menuItems/itemCapacita";
import type MenuItem from "../types/MenuItem";
import SearchClient from "./SearchClient";

const Modulos: React.FC = () => {
  const accessStatus = authenticationVerify('/login');
  const perfisNamePermissions = perfisObject();
  const perfisNames = Object.keys(perfisNamePermissions);
  const perfilName = localStorage.getItem('perfilName');
  const [getItems, setItems] = useState<null | Array<MenuItem>>(null);
  const [getBaseContent, setBaseContent] = useState<null |React.ReactNode>(null);
  const [getBaseTitle, setBaseTitle] = useState<null | string>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!perfisNames.includes(perfilName) && perfisNames[0] !== null) {
      navigate('/perfil')
    } else if (perfilName === 'SUPER USUÁRIO') {
      const user = itemUser();
      const capacita = itemCapacita(setBaseContent, setBaseTitle);
      const items = user.concat(capacita);
      setItems(items)
    } else {
      // CRIAR LÓGICA PRA CRIAÇÃO DOS ITENS DO MENU
    }
  }, [perfilName, perfisNames])

  if (accessStatus === 200 && perfisNames.includes(perfilName)) {
    if (perfilName === 'SUPER USUÁRIO') {
      return (
        <Base
        content={getBaseContent || <SearchClient />}
        title={getBaseTitle || 'Buscar Ficha do Cliente'}
        menuItem={getItems}
        />
      )
    } else if (accessStatus === 200) {
      // CRIAR LÓGICA PRA APRESENTAÇÃO DA PÁGINA
    }
  }
}

export default Modulos;
