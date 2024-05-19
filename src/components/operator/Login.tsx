import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Anchor } from 'antd';
import './css/Login.css'
import Api from "../../services/api";
// import { Link as RouterLink } from 'react-router-dom';

const { Link } = Anchor;

const Login: React.FC = () => {
  const api = new Api;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Autenticação';
  })

  const onFinish = (values: object) => {
    api.post('/api/token/', values)
      .then(result => {
        localStorage.setItem('refresh', result.data.refresh);
        localStorage.setItem('access', result.data.access);
        navigate('/operador/test');
      })
      .catch(error => console.error(error));  
  };

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

const breadcrumbItemLogin = [<Link href="/login" title='Autenticação' />]

export { Login, breadcrumbItemLogin }
