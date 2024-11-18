import React, { useEffect, useState } from "react";
import { Form, Anchor, Spin } from 'antd';
import perfisObject from "./services/perfisObject";
import './css/Perfil.css';

const Perfil: React.FC = () => {
  const perfisNamePermissions = perfisObject();
  const perfisNames = Object.keys(perfisNamePermissions);
  const [getLoading, setLoading] = useState(false)

  useEffect(() => {
    document.title = 'Perfil';
  }, [])

  const selectPerfil = (event: React.MouseEvent<HTMLElement>, link: { title: React.ReactNode }) => {
    setLoading(true)
    localStorage.setItem('perfilName', link.title as string);
  };

  if (perfisNames[0] !== 'null') {
    return (
      <Spin spinning={getLoading} tip='Carregando...'>
        <Form className="form-perfil">
          <Anchor onClick={selectPerfil} items={
            perfisNames ? perfisNames.map((perfilName: string, index: number) => ({
              key: index.toString(),
              href: `/colaborador/${perfilName.toLowerCase()}`,
              title: perfilName,
            })) : []
          } />
        </Form>
      </Spin>
    );
  }
};

export default Perfil;
