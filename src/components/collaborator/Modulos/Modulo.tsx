import React, { useEffect, useState } from "react";
import perfisObject from "../../../services/perfisObject";
import { useNavigate } from "react-router-dom";
import Base from "../Base";
import { itemUser, logout } from "../menuItems/itemUser";
import itemCapacita from "../menuItems/itemCapacita";
import type menuItem from "../types/menuItem";
import Cookies from "js-cookie";
import axiosInstance from "../../../services/axiosInstance";

const Modulo: React.FC = () => {
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
    const refreshToken = Cookies.get('refresh_token');
    document.title = getBaseTitle;
    if (refreshToken) {
      axiosInstance.post('token/verify/', { token: refreshToken })
        .catch(() => {
          logout();
          navigate('/colaborador/login');
        })
    } else {
      logout();
      navigate('/colaborador/login')
    }
  }, [getBaseContent, getBaseTitle, getItems])

  useEffect(() => {
    if (!perfisNames.includes(perfilName) && perfisNames[0] !== 'null') {
      navigate('/colaborador/perfil');
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

export default Modulo;
