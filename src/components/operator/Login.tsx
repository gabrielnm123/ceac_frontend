import React, { useEffect } from "react";
import { Form, Input, Button } from 'antd';
import './css/Login.css'

const Login: React.FC = () => {
  useEffect(() => {
    document.title = 'Autenticação';
  })

  return (
    <Form className="form-login">
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

export { Login, breadcrumbItemLogin }
