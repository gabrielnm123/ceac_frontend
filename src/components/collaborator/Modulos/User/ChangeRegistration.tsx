import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import axiosInstance from '../../../../services/axiosInstance';

const ChangeRegistration: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axiosInstance.get(`/users/${userId}/`);
        form.setFieldsValue({
          username: response.data.username,
          email: response.data.email,
        });
      } catch (error) {
        message.error('Erro ao carregar dados do usuário.');
      }
    };

    fetchUserData();
  }, [form]);

  const onFinish = async (values: { username: string; email: string }) => {
    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      await axiosInstance.put(`/users/${userId}/`, {
        username: values.username,
        email: values.email,
      });
      message.success('Cadastro alterado com sucesso!');
    } catch (error) {
      message.error('Erro ao alterar cadastro, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Por favor, insira seu nome de usuário!' }]}
      >
        <Input placeholder="Nome de Usuário" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Por favor, insira seu e-mail!' }, { type: 'email', message: 'Por favor, insira um e-mail válido!' }]}
      >
        <Input placeholder="E-mail" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Alterar Cadastro
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangeRegistration;
