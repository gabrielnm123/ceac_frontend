import React, { useEffect } from "react";
import { Form, Anchor } from 'antd';
import perfisObject from "../../services/perfisObject";
import './css/Perfil.css';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

const Perfil: React.FC = () => {
  const perfisNamePermissions = perfisObject();
  const perfisNames = Object.keys(perfisNamePermissions);
  const navigate = useNavigate();
  const accessToken = Cookies.get('access_token');

  useEffect(() => {
    if (accessToken) {
      axiosInstance.post('token/verify/', { token: accessToken })
        .catch(() => {
          navigate('/login');
        })
    }
    document.title = 'Perfil';
  }, [])

  const selectPerfil = (event: React.MouseEvent<HTMLElement>, link: { title: React.ReactNode }) => {
    localStorage.setItem('perfilName', link.title as string);
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
