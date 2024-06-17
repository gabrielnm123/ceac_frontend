import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Anchor, message } from 'antd';
import './css/Login.css'
import axios from "axios";
import { url } from "../../env";

const { Link } = Anchor;

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Autenticação';
  })

  const onFinish = async (values: object) => {
    try {
      const response = await axios.post(`${url}token/`, values)
      const refresh = response.data.refresh
      const access = response.data.access
      localStorage.setItem('refresh', refresh);
      localStorage.setItem('access', access);
      try {
        const response = await axios.get(url + 'current_user/', {
          headers: {
            'Authorization': `Bearer ${access}`
          }
        })
        const userId = response.data.id;
        localStorage.setItem('userId', userId);
      } catch {
        message.error('Um erro ocorreu, tente novamente!')
      }
      navigate('/perfis');
    } catch {
      message.error('Usuário ou senha inválida(s)!')
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);  
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
      >
        <Input placeholder="Nome de usuário" />
      </Form.Item>
      <Form.Item
        className="password-login"
        name="password"
        rules={[{ required: true, message: 'Insira sua senha!' }]}
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

const breadcrumbItemLogin = [<Link href="/" title='Site' />, 'Autenticação']

export { Login, breadcrumbItemLogin }
