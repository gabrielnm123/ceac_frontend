import React, { useEffect } from "react";
import authenticationVerify from "../../../services/authenticationVerify";
import SearchFicha from "./SearchFicha";
import perfisArrays from "../../../services/perfisArrays";
import { useNavigate } from "react-router-dom";
import Base from "../Base";
import { itemUser } from "../MenuItems";
// import { Form, Input, Button, message } from 'antd';

const Modulos: React.FC = () => {
  const accessStatus = authenticationVerify('/login');
  const perfisNames: Array<string> = perfisArrays();
  const perfilName = localStorage.getItem('perfilName');
  const navigate = useNavigate();

  useEffect(() => {
    if (!perfisNames.includes(perfilName) && perfisNames[0] !== null) {
      navigate('/perfil')
    }
  }, [perfilName, perfisNames])

  if (accessStatus === 200 && perfisNames.includes(perfilName)) {
    if (perfilName === 'SUPER USUÁRIO') {
      return (
        <Base content={<SearchFicha />}
        title="Buscar Ficha do Cliente"
        menuItem={itemUser()} />
      )
    }
  }
}

export default Modulos;
