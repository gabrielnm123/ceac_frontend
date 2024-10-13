import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import './css/Login.css'
import axiosInstance from "../../services/axiosInstance";
import Cookies from "js-cookie";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const refreshToken = Cookies.get('refresh_token')

  useEffect(() => {
    if (refreshToken) {
      axiosInstance.post('token/verify/', {token: refreshToken})
        .then(() => {
          navigate('/colaborador/perfil');
        })
    }
    document.title = 'Autenticação';
  }, []);

  const onFinish = async (values: object) => {
    try {
      const response = await axiosInstance.post(`token/`, values)
      
      Cookies.set('access_token', response.data.access);
      Cookies.set('refresh_token', response.data.refresh);

      try {
        const userResponse = await axiosInstance.get('current_user/');
        const userId = userResponse.data.id;
        localStorage.setItem('userId', userId);
      } catch {
        message.error('Um erro ocorreu ao obter as informações do usuário.');
      }

      navigate('/colaborador/perfil');
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
