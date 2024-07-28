import React from "react";
import { Form, Anchor } from 'antd';
import authenticationVerify from "../../services/authenticationVerify";
import perfisArrays from "../../services/perfisArrays";
import './css/Perfil.css';

const Perfis: React.FC = () => {
  const accessStatus = authenticationVerify('/login');
  const perfisNames = perfisArrays();

  const selectPerfil = (event: React.MouseEvent<HTMLElement>, link: { title: React.ReactNode }) => {
    localStorage.setItem('perfilName', link.title as string);;
  };

  if (accessStatus === 200 && perfisNames[0] !== null) {
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

export default Perfis;
