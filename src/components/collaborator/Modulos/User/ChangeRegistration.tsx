import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Typography } from 'antd';
import axiosInstance from '../../../../services/axiosInstance';
import useAuthenticationVerify from '../../../../services/useAuthenticationVerify';

interface FormValues {
  email: string;
  currentPassword: string;
  password?: string;
  confirmPassword?: string;
  first_name?: string;
  last_name?: string;
}

const { Text } = Typography;

const ChangeRegistration: React.FC = () => {
  const [getLoading, setLoading] = useState<boolean>(false);
  const [getPasswordMessage, setPasswordMessage] = useState<string>('');
  const [form] = Form.useForm();
  const [getTriggerAuth, setTriggerAuth] = useState<boolean>(true);

  useAuthenticationVerify('/login', getTriggerAuth);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axiosInstance.get(`/users/${userId}/`);
        form.setFieldsValue({
          email: response.data.email,
          first_name: response.data.first_name.toUpperCase(),
          last_name: response.data.last_name.toUpperCase(),
        });
      } catch (error) {
        message.error('Erro ao carregar dados do usuário.');
      }
    };

    fetchUserData();
  }, [form]);

  const validatePassword = (_: any, value: string) => {
    const errors = [];
    const remainingChars = 8 - value.length;
    if (remainingChars > 0) {
      errors.push(`Faltam ${remainingChars} ${remainingChars > 1 ? 'caracteres' : 'caractere'} para atingir o mínimo necessário`);
    }
    if (!/[A-Z]/.test(value)) {
      errors.push('uma letra maiúscula');
    }
    if (!/[a-z]/.test(value)) {
      errors.push('uma letra minúscula');
    }
    if (!/\d/.test(value)) {
      errors.push('um número');
    }
    if (!/[#@!$%^&*()\-_\+\=\{\}\[\]:;"'<>,.?\/\\|~`]/.test(value)) {
      errors.push('um caractere especial');
    }

    setPasswordMessage(errors.length > 0 ? errors.join(', ') + '.' : '');

    return errors.length === 0 ? Promise.resolve() : Promise.reject(new Error(''));
  };

  const onFinish = async (values: FormValues) => {
    setTriggerAuth((prevTriggerAuth) => !prevTriggerAuth);
    if (values.password && values.password !== values.confirmPassword) {
      message.error('As senhas não coincidem!');
      return;
    }

    if (!values.currentPassword) {
      message.error('Por favor, insira sua senha atual para confirmar as alterações.');
      return;
    }

    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      const updateData: { email: string; username: string; password?: string; first_name?: string; last_name?: string } = {
        email: values.email,
        username: values.email, // Atualiza o nome de usuário para ser o mesmo que o email
        first_name: values.first_name?.toUpperCase(), // Garante que seja salvo em maiúsculas
        last_name: values.last_name?.toUpperCase(), // Garante que seja salvo em maiúsculas
      };

      if (values.password) {
        updateData.password = values.password; // Atualiza a senha somente se ela foi preenchida
      }

      await axiosInstance.put(`/users/${userId}/`, updateData);
      
      message.success('Cadastro alterado com sucesso!');
    } catch (error) {
      message.error('Erro ao alterar cadastro, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        label="E-mail"
        name="email"
        rules={[{ required: true, message: 'Por favor, insira seu e-mail!' }, { type: 'email', message: 'Por favor, insira um e-mail válido!' }]}
      >
        <Input placeholder="E-mail" />
      </Form.Item>
      <Form.Item
        label="Primeiro Nome"
        name="first_name"
        rules={[{ required: true, message: 'Por favor, insira seu primeiro nome!' }]}
      >
        <Input placeholder="Primeiro Nome" onChange={(e) => form.setFieldsValue({ first_name: e.target.value.toUpperCase() })} />
      </Form.Item>
      <Form.Item
        label="Sobrenome"
        name="last_name"
        rules={[{ required: true, message: 'Por favor, insira seu sobrenome!' }]}
      >
        <Input placeholder="Sobrenome" onChange={(e) => form.setFieldsValue({ last_name: e.target.value.toUpperCase() })} />
      </Form.Item>
      <Form.Item
        label="Senha Atual"
        name="currentPassword"
        rules={[{ required: true, message: 'Por favor, insira sua senha atual!' }]}
      >
        <Input.Password placeholder="Senha Atual" />
      </Form.Item>
      <Text strong style={{ marginBottom: '8px', display: 'block' }}>
        Regras para a nova senha (opcional):
      </Text>
      <Text style={{ marginBottom: '16px', display: 'block' }}>
        A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial. Caracteres especiais permitidos: #@!$%^&*()-_+={}[]:;"'&lt;&gt;,.?/\\|~`.
      </Text>
      <Form.Item
        label="Nova Senha"
        name="password"
        rules={[{ validator: validatePassword }]}
        hasFeedback
      >
        <Input.Password 
          placeholder="Nova senha (opcional)" 
          onChange={(e) => {
            form.setFieldsValue({ password: e.target.value });
            form.validateFields(['password']);
          }}
        />
      </Form.Item>
      {getPasswordMessage && <Text type="danger">{getPasswordMessage}</Text>} 
      <Form.Item
        label="Confirme a Nova Senha"
        name="confirmPassword"
        dependencies={['password']}
        hasFeedback
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('As senhas não coincidem!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirme a nova senha (se preenchida)" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={getLoading}>
          Alterar Cadastro
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangeRegistration;
