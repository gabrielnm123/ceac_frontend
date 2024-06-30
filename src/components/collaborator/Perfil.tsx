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
  }

  if (accessStatus === 200) {
    return (
      <Form
        className="form-perfil"
        >
          <Anchor className="anchor-link">
          {perfisNames ? (perfisNames.map((perfilName: string, index: number) => (
            <Form.Item
              className="item-perfil"
              key={index}>
                <div onClick={() => selectPerfil(perfilName)}>
                  <Link className="link-perfil"
                  href={`/colaborador/${perfilName.toLowerCase()}`}
                  title={perfilName} />
                </div>
            </Form.Item>
          ))) : [] }
          </Anchor>
        </Form>
    )
  }
  }

export default Perfis;
