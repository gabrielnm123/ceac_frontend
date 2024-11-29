import React, { useEffect } from "react";
import { Form, Anchor } from 'antd';
import perfisObject from "./services/perfisObject";
import './css/Perfil.css';
import { useSpinning } from "./Provider/Spinning";

const Perfil: React.FC = () => {
  const perfisNamePermissions = perfisObject();
  const perfisNames = Object.keys(perfisNamePermissions);
  const { setSpinning } = useSpinning();

  useEffect(() => {
    document.title = 'Perfil';
  }, [])

  const selectPerfil = (event: React.MouseEvent<HTMLElement>, link: { title: React.ReactNode }) => {
    setSpinning(true);
    localStorage.setItem('perfilName', link.title as string);
    setSpinning(false);
  };

  if (perfisNames[0] !== 'null') {
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
