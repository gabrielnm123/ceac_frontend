import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axiosInstance from '../../../../services/axiosInstance';

const ChangePassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { oldPassword: string; newPassword: string; confirmPassword: string }) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error('As novas senhas não coincidem!');
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post('/change-password/', {
        old_password: values.oldPassword,
        new_password: values.newPassword,
      });
      message.success('Senha alterada com sucesso!');
    } catch (error) {
      message.error('Erro ao alterar a senha, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="oldPassword"
        rules={[{ required: true, message: 'Por favor, insira sua senha atual!' }]}
      >
        <Input.Password placeholder="Senha Atual" />
      </Form.Item>
      <Form.Item
        name="newPassword"
        rules={[{ required: true, message: 'Por favor, insira a nova senha!' }]}
      >
        <Input.Password placeholder="Nova Senha" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        rules={[{ required: true, message: 'Por favor, confirme a nova senha!' }]}
      >
        <Input.Password placeholder="Confirme a Nova Senha" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Alterar Senha
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePassword;
