import React, { useEffect } from "react";
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './css/Login.css'
import Api from "../../services/api"; // Certifique-se de importar a classe Api
// import Test from "./Test";

const Login: React.FC = () => {
  const api = new Api(); // Crie uma nova instância da classe Api
  const navigate = useNavigate(); // Crie uma instância do useHistory

  useEffect(() => {
    document.title = 'Autenticação';
  })

  const onFinish = (values: any) => {
    api.post('/api/token/', values)
      .then(result => {
        // console.log('Access:', result.access);
        // console.log('Refresh:', result.refresh);
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

export { Login, breadcrumbItemLogin }
