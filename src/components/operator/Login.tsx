import React, { useEffect } from "react";
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './css/Login.css'
import Api from "../../services/api";

var refresh;
var access;
var invalidLogin;

const Login: React.FC = () => {
  const api = new Api();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Autenticação';
  })

  const onFinish = (values: any) => {
    api.post('/api/token/', values)
      .then(result => {
        if (result.refresh && result.access) {
          refresh = result.refresh;
          access = result.access;
        } else if (result.detail === 'Usuário e/ou senha incorreto(s)') {
          invalidLogin = 'Usuário e/ou senha incorreto(s)'
        }
        navigate('/test');
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

const breadcrumbItemLogin = ['Autenticação']

export { Login, breadcrumbItemLogin, refresh, access }
