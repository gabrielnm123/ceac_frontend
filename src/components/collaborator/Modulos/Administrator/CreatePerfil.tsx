import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, message, Spin, Typography } from "antd";
import axiosInstance from "../../services/axiosInstance";
import "./css/CreatePerfil.css";

const { Option } = Select;
const { Title } = Typography;

const CreatePerfil: React.FC = () => {
  const [loading, setLoading] = useState(false);
  interface Permission {
    id: number;
    name: string;
  }

  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [form] = Form.useForm();

  // Fetch permissions from API
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axiosInstance.get("permissions/");
        setPermissions(response.data);
      } catch (error) {
        message.error("Erro ao carregar permissões.");
      }
    };

    fetchPermissions();
  }, []);

  // Handle form submission
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await axiosInstance.post("profiles/", values);
      message.success("Perfil criado com sucesso!");
      form.resetFields();
    } catch (error) {
      message.error("Erro ao criar perfil. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-perfil-container">
      <Title level={2} className="create-perfil-title">
        Criar Novo Perfil
      </Title>
      <Spin spinning={loading} tip="Carregando...">
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="create-perfil-form"
        >
          <Form.Item
            label="Nome do Perfil"
            name="name"
            rules={[{ required: true, message: "Insira o nome do perfil." }]}
          >
            <Input placeholder="Nome do perfil" maxLength={50} />
          </Form.Item>

          <Form.Item
            label="Permissões"
            name="permissions"
            rules={[{ required: true, message: "Selecione pelo menos uma permissão." }]}
          >
            <Select
              mode="multiple"
              placeholder="Selecione permissões"
              allowClear
              className="create-perfil-select"
            >
              {permissions.map((permission) => (
                <Option key={permission.id} value={permission.id}>
                  {permission.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Criar Perfil
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default CreatePerfil;
