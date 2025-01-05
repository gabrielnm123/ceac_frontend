import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import './css/Login.css';
import axiosInstance from "./services/axiosInstance";
import { useSpinning } from "./Provider/Spinning";
import { LoginOutlined } from '@ant-design/icons';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [getLoadingButton, setLoadingButton] = useState(false);
  const { setSpinning } = useSpinning();

  useEffect(() => {
    const verifyToken = async () => {
      setSpinning(true);
      document.title = 'Autenticação';
      try {
        await axiosInstance.post('token/refresh/verify/');
        navigate('/colaborador/perfil');
      } catch (error) {
        if ((error as any).status && (error as any).status === 400) return;
      } finally {
        setSpinning(false);
      }
    };

    verifyToken();
  }, [navigate, setSpinning]);

  const onFinish = async (values: object) => {
    setLoadingButton(true);
    setSpinning(true);
    try {
      await axiosInstance.post('token/', values);
      try {
        const userResponse = await axiosInstance.get('current_user/');
        const userId = userResponse.data.id;
        localStorage.setItem('userId', userId);
        navigate('/colaborador/perfil');
      } catch {
        message.error('Um erro ocorreu ao obter id do usuário.');
      }
    } catch {
      message.error('Usuário ou senha inválida(s)!');
    } finally {
      setLoadingButton(false);
      setSpinning(false);
    }
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
        <Button type="primary" htmlType="submit" loading={getLoadingButton} icon={<LoginOutlined />}>
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
