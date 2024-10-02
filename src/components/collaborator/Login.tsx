import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import './css/Login.css'
import axiosInstance from "../../services/axiosInstance";
import useAuthenticationVerify from "../../services/useAuthenticationVerify";
import { setCookie } from "../../services/cookie";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [getIsAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Verifica se o usuário está autenticado
  useAuthenticationVerify('/login', undefined, setIsAuthenticated);

  useEffect(() => {
    if (getIsAuthenticated) {
      navigate('/perfil');
    }
    document.title = 'Autenticação';
  }, [getIsAuthenticated]);

  const onFinish = async (values: object) => {
    try {
      const response = await axiosInstance.post(`token/`, values)
      
      // Armazena os tokens como cookies, com SameSite=Lax e Secure
      setCookie('access_token', response.data.access);

      try {
        const userResponse = await axiosInstance.get('current_user/');
        const userId = userResponse.data.id;
        localStorage.setItem('userId', userId);  // Somente armazena o ID do usuário no localStorage
      } catch {
        message.error('Um erro ocorreu ao obter as informações do usuário.');
      }

      navigate('/perfil');
    } catch {
      message.error('Usuário ou senha inválida(s)!');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
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
