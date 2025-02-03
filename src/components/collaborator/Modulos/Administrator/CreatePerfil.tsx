import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, message, Spin, Typography, Breadcrumb } from "antd";
import {
  UserAddOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  FormOutlined,
  ReadOutlined,
  UnorderedListOutlined,
  TeamOutlined
} from '@ant-design/icons'
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

  const [form] = Form.useForm();

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
              <Option value='manageUser'><Breadcrumb items={[{title: <><SettingOutlined /><span>Administrador</span></>}, {title: <><UserOutlined /><span>Gerenciar Operadores</span></>}]}></Breadcrumb> </Option>
              <Option value='createUser'><Breadcrumb items={[{title: <><SettingOutlined /><span>Administrador</span></>}, {title: <><UserAddOutlined /><span>Criar Operador</span></>}]}></Breadcrumb> </Option>
              <Option value='managePerfil'><Breadcrumb items={[{title: <><SettingOutlined /><span>Administrador</span></>}, {title: <><TeamOutlined /><span>Gerenciar Perfis</span></>}]}></Breadcrumb> </Option>
              <Option value='createPerfil'><Breadcrumb items={[{title: <><SettingOutlined /><span>Administrador</span></>}, {title: <><UsergroupAddOutlined /><span>Criar Perfil</span></>}]}></Breadcrumb> </Option>
              <Option value='mangeFicha'><Breadcrumb items={[{title: <><ReadOutlined /><span>Capacita</span></>}, {title: <><UnorderedListOutlined /><span>Gerenciar Fichas</span></>}]}></Breadcrumb> </Option>
              <Option value='createFicha'><Breadcrumb items={[{title: <><ReadOutlined /><span>Capacita</span></>}, {title: <><FormOutlined /><span>Criar Ficha</span></>}]}></Breadcrumb> </Option>
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
