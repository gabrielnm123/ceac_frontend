
import React, { useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import axiosInstance from "../../services/axiosInstance";
import "./css/CreateUser.css";

const CreateUser: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      await axiosInstance.post("users/", values);
      message.success("Usuário criado com sucesso!");
      form.resetFields();
    } catch (error) {
      message.error("Erro ao criar usuário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-user-container">
      <Spin spinning={loading} tip="Carregando...">
        <Form form={form} onFinish={onFinish} layout="vertical" className="create-user-form">
          <Form.Item
            label="Nome do Usuário"
            name="username"
            rules={[{ required: true, message: "Insira o nome do usuário." }]}
          >
            <Input placeholder="Nome do usuário" />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: "Insira a senha." }]}
          >
            <Input.Password placeholder="Senha" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Criar Usuário
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default CreateUser;
