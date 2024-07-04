import React from "react";
import authenticationVerify from "../../services/authenticationVerify";
import { Form, Anchor} from 'antd';
import perfisArrays from "../../services/perfisArrays";
import './css/Perfil.css'

const Perfis: React.FC = () => {
  const accessStatus = authenticationVerify('/login');
  const perfisNames = perfisArrays();
  const selectPerfil = (perfilName: string) => {
    localStorage.setItem('perfilName', perfilName)
  }

  if (accessStatus === 200) {
    return (
      <Form
        className="form-perfil"
        >
          <Anchor className="anchor-link" items={
            perfisNames ? perfisNames.map((perfilName: string, index: number) => ({
              key: index,
              href: `/colaborador/${perfilName.toLowerCase()}`,
              title: <span onClick={() => selectPerfil(perfilName)}>{perfilName}</span>,
              onClick: () => selectPerfil(perfilName)
            })) : []
          } />
        </Form>
    )
  }
  }

export default Perfis;
