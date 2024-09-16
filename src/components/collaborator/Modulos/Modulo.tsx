import React, { useEffect, useState } from "react";
import perfisObject from "../../../services/perfisObject";
import { useNavigate } from "react-router-dom";
import Base from "../Base";
import itemUser from "../menuItems/itemUser";
import itemCapacita from "../menuItems/itemCapacita";
import itemTest from "../menuItems/itemTest";
import type menuItem from "../types/menuItem";
import useAuthenticationVerify from "../../../services/useAuthenticationVerify";

const Modulos: React.FC = () => {
  const [getItems, setItems] = useState<null | Array<menuItem>>(null);
  const [getBaseContent, setBaseContent] = useState<null | React.ReactNode>(null);
  const [getBaseTitle, setBaseTitle] = useState<null | string>(null);
  const navigate = useNavigate();
  const perfisNamePermissions: { [key: string]: string[] } = perfisObject();
  const perfisNames = Object.keys(perfisNamePermissions);
  const perfilName = localStorage.getItem('perfilName');
  const permissions = perfisNamePermissions[perfilName];
  const user = itemUser(setBaseContent, setBaseTitle);
  const teste = itemTest(setBaseContent, setBaseTitle)
  
  useAuthenticationVerify('/login');

  useEffect(() => {
    if (!perfisNames.includes(perfilName) && perfisNames[0] !== 'null') {
      navigate('/perfil');
    }
  }, [perfisNamePermissions]);
  
  useEffect(() => {
    if (permissions) {
      const capacita = itemCapacita(setBaseContent, setBaseTitle, permissions);
      const items = user.concat(capacita).concat(teste); // quando entrar em produção devo retirar esse componente de teste
      setItems(items);
    }
  }, [permissions]);
  
  if (perfisNames.includes(perfilName)) {
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

export default Modulos;
