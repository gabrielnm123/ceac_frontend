import React, { useState } from "react";
import { Form, Anchor } from 'antd';
import useAuthenticationVerify from "../../services/useAuthenticationVerify";
import perfisObject from "../../services/perfisObject";
import './css/Perfil.css';

const Perfil: React.FC = () => {
  const perfisNamePermissions: {[key: string]: Array<string>} = perfisObject();
  const perfisNames = Object.keys(perfisNamePermissions);
  const [getIsAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useAuthenticationVerify('/login', 0, setIsAuthenticated);
  
  const selectPerfil = (event: React.MouseEvent<HTMLElement>, link: { title: React.ReactNode }) => {
    localStorage.setItem('perfilName', link.title as string);
  };

  if (perfisNames[0] !== 'null' && getIsAuthenticated) {
    return (
      <Form className="form-perfil">
        <Anchor onClick={selectPerfil} items={
          perfisNames ? perfisNames.map((perfilName: string, index: number) => ({
            key: index.toString(),
            href: `/colaborador/${perfilName.toLowerCase()}`,
            title: perfilName,
          })) : []
        } />
      </Form>
    );
  }
};

export default Perfil;
