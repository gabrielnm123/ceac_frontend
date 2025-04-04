import React, { useEffect, useState } from "react";
import perfisObject from "../services/perfisObject";
import { useNavigate } from "react-router-dom";
import Base from "../Base";
import { itemUser } from "../menuItems/itemUser";
import itemCapacita from "../menuItems/itemCapacita";
import itemAdministrator from "../menuItems/itemAdministrator";
import type menuItemType from "../types/menuItem";

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
      const administrator = itemAdministrator(setBaseContent, setBaseTitle, permissions)
      const items = user.concat(capacita).concat(administrator);
      setItems(items);
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
