import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Spin } from 'antd';
import './css/Login.css';
import axiosInstance from "./services/axiosInstance";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [getLoadingButton, setLoadingButton] = useState(false);
  const [getLoadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    setLoadingPage(true);
    document.title = 'Autenticação';
    axiosInstance.post('token/refresh/verify/')
      .then(() => {
        navigate('/colaborador/perfil');
      })
      .catch((error) => {
        if (error.status && error.status === 400) return
      })
      .finally(() => setLoadingPage(false));
  }, []);

  const onFinish = (values: object) => {
    setLoadingButton(true)
    axiosInstance.post('token/', values)
      .then(() => {
        axiosInstance.get('current_user/')
          .then((userResponse) => {
            const userId = userResponse.data.id;
            localStorage.setItem('userId', userId);
            navigate('/colaborador/perfil');
          })
          .catch(() => {
            message.error('Um erro ocorreu ao obter id do usuário.');
          });
      })
      .catch(() => {
        message.error('Usuário ou senha inválida(s)!');
      })
      .finally(() => setLoadingButton(false))
  };

  const onFinishFailed = () => {
    message.error('Um erro ocorreu, tente novamente!');
  };

  return (
    <Spin spinning={getLoadingButton || getLoadingPage} tip='Carregando...' >
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
          <Button type="primary" htmlType="submit" loading={getLoadingButton} >
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default Login;
