import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import './css/Login.css'
import axiosInstance from "../../services/axiosInstance";
import Cookies from "js-cookie";
import { logout } from "./menuItems/itemUser";

const Login: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const refreshToken = Cookies.get('refresh_token')
    if (refreshToken) {
      axiosInstance.post('token/verify/', {token: refreshToken})
        .then(() => {
          navigate('/colaborador/perfil');
        })
        .catch(() => {})
    } else {
      logout();
      navigate('/colaborador/login');
    }
    document.title = 'Autenticação';
  }, []);

  const onFinish = (values: object) => {
    axiosInstance.post(`token/`, values)
      .then((response) => {
        Cookies.set('access_token', response.data.access);
        Cookies.set('refresh_token', response.data.refresh);
        axiosInstance.get('current_user/')
          .then((userResponse) => {
            const userId = userResponse.data.id;
            Cookies.set('userId', userId);
            navigate('/colaborador/perfil');
          })
          .catch(() => {
            message.error('Um erro ocorreu ao obter as informações do usuário.');
          })
      })
      .catch (() => {
      message.error('Usuário ou senha inválida(s)!');
    })
  };

  const onFinishFailed = () => {
    message.error('Um erro ocorreu, tente novamente!');
  };
  
  return (
    <Form
      className="form-login"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed} 
    >
      <Form.Item
        className="username-login"
        name="username"
        rules={[{ required: true, message: 'Insira seu nome de usuário!' }]}
        label="Usuário"
      >
        <Input placeholder="Nome de usuário" />
      </Form.Item>
      <Form.Item
        className="password-login"
        name="password"
        rules={[{ required: true, message: 'Insira sua senha!' }]}
        label="Senha"
      >
        <Input.Password placeholder="Senha" />
      </Form.Item>
      <Form.Item className="button-login">
        <Button type="primary" htmlType="submit">
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
