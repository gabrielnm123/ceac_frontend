import React from "react";
import authenticationVerify from "../../../services/authenticationVerify";
import SearchFicha from "./SearchFicha";
import perfisArrays from "../../../services/perfisArrays";
import { useNavigate } from "react-router-dom";

const Modulos: React.FC = () => {
  const accessStatus = authenticationVerify('/login');
  const perfisNames = perfisArrays();
  const perfilName = localStorage.getItem('perfilName')
  const navigate = useNavigate();

  if (accessStatus === 200 && perfisNames.includes(perfilName)) {
    return (
      <SearchFicha />
    )
  } else {navigate('/perfil')}
}

export default Modulos;
