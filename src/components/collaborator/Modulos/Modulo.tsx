import React, { useEffect, useState } from "react";
import authenticationVerify from "../../../services/authenticationVerify";
import perfisObject from "../../../services/perfisObject";
import { useNavigate } from "react-router-dom";
import Base from "../Base";
import itemUser from "../menuItems/itemUser";
import itemCapacita from "../menuItems/itemCapacita";
import type MenuItem from "../types/MenuItem";

const Modulos: React.FC = () => {
  const [getItems, setItems] = useState<null | Array<MenuItem>>(null);
  const [getBaseContent, setBaseContent] = useState<null | React.ReactNode>(null);
  const [getBaseTitle, setBaseTitle] = useState<null | string>(null);
  const navigate = useNavigate();
  const accessStatus = authenticationVerify('/login');
  const perfisNamePermissions: { [key: string]: string[] } = perfisObject();
  const perfisNames = Object.keys(perfisNamePermissions);
  const perfilName = localStorage.getItem('perfilName');
  const permissions = perfisNamePermissions[perfilName];
  const user = itemUser();

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
  
  if (accessStatus === 200 && perfisNames.includes(perfilName) && getItems) {
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
