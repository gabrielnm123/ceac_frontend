import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import './css/Login.css'
import axiosInstance from "../../services/axiosInstance";
import useAuthenticationVerify from "../../services/useAuthenticationVerify";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [getIsAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useAuthenticationVerify('/login', 0, setIsAuthenticated);

  useEffect(() => {
    if (getIsAuthenticated) {
      navigate('/perfil');
    }
    document.title = 'Autenticação';
  }, [getIsAuthenticated])

  const onFinish = async (values: object) => {
    try {
      const response = await axiosInstance.post(`token/`, values)
      const refresh = response.data.refresh
      const access = response.data.access
      const headers = {
        'Authorization': `Bearer ${access}`,
        'Content-Type': 'application/json'
      }
      localStorage.setItem('refresh', refresh);
      localStorage.setItem('access', access);
      localStorage.setItem('headers', JSON.stringify(headers));
      try {
        const response = await axiosInstance.get('current_user/')
        const userId = response.data.id;
        localStorage.setItem('userId', userId);
      } catch {
        message.error('Um erro ocorreu, tente novamente!')
      }
      navigate('/perfil');
    } catch {
      message.error('Usuário ou senha inválida(s)!')
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    message.error('Um erro ocorreu, tente novamente!')
    console.log(errorInfo) 
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
  )
}

export default Login;
