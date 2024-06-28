import React from "react";
import authenticationVerify from "../../services/authenticationVerify";
import { Form, Anchor} from 'antd';
import perfisArrays from "../../services/perfisArrays";
import './css/Perfil.css'

const { Link } = Anchor;

const Perfis: React.FC = () => {
  const accessStatus = authenticationVerify('/login');
  const perfisNames = perfisArrays();
  
  const selectPerfil = (perfilName: string) => {
    localStorage.setItem('perfilName', perfilName)
    return `/${perfilName.toLowerCase()}`
  }

  if (accessStatus === 200) {
    return (
      <Form
        className="form-perfil"
        >
          <Anchor className="anchor-link">
          {perfisNames ? (perfisNames.map((perfilName, index) => (
            <Form.Item
              className="item-perfil"
              key={index}>
                <Link className="link-perfil" href={selectPerfil(perfilName)} title={perfilName} />
            </Form.Item>
          ))) : [] }
          </Anchor>
        </Form>
    )
  }
  }

export default Perfis;
