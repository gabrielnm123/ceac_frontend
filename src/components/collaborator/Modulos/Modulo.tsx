import React, { useEffect, useState } from "react";
import perfisObject from "../../../services/perfisObject";
import { useNavigate } from "react-router-dom";
import Base from "../Base";
import itemUser from "../menuItems/itemUser";
import itemCapacita from "../menuItems/itemCapacita";
import type menuItem from "../types/menuItem";

const Modulos: React.FC = () => {
  const [getItems, setItems] = useState<Array<menuItem>>();
  const [getBaseContent, setBaseContent] = useState<null | React.ReactNode>(null);
  const [getBaseTitle, setBaseTitle] = useState<string>(String);
  const navigate = useNavigate();
  const perfisNamePermissions = perfisObject();
  const perfisNames = Object.keys(perfisNamePermissions);
  const perfilName = localStorage.getItem('perfilName')!;
  const permissions = perfisNamePermissions[perfilName];
  const user = itemUser(setBaseContent, setBaseTitle);

  useEffect(() => {
    if (!perfisNames.includes(perfilName) && perfisNames[0] !== 'null') {
      navigate('/perfil');
    }
  }, [perfisNamePermissions]);
  
  useEffect(() => {
    if (permissions) {
      const capacita = itemCapacita(setBaseContent, setBaseTitle, permissions);
      const items = user.concat(capacita);
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

export default Modulos;
