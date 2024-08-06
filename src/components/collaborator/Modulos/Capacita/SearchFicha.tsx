import React, { useState } from "react";
import { Form, Input, Button, Select, DatePicker, Table, message } from 'antd';
import MaskedInput from 'antd-mask-input';
import axiosInstance from "../../../../services/axiosInstance";
import authenticationVerify from "../../../../services/authenticationVerify";
import '../../css/SearchFicha.css';

const { Option } = Select;

const SearchFicha: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);
  
  authenticationVerify('/login');
  
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('capacita/fichas/', { params: values });
      setData(response.data);
      message.success('Busca realizada com sucesso!');
    } catch (error) {
      message.error('Erro ao buscar ficha, tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  const columns = [
    { title: 'Nome', dataIndex: 'nome_completo', key: 'nome_completo' },
    { title: 'CPF', dataIndex: 'cpf', key: 'cpf' },
    { title: 'Data de Nascimento', dataIndex: 'data_nascimento', key: 'data_nascimento' },
    { title: 'Gênero', dataIndex: 'genero', key: 'genero' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Contato', dataIndex: 'contato', key: 'contato' },
  ];

  return (
    <div className="search-ficha">
      <Form className="form-search-ficha" onFinish={onFinish}>
        <div className="form-search-ficha-minus-button">
          <Form.Item label="Nome" name="nome_completo" className="form-search-ficha-nome">
            <Input />
          </Form.Item>
          <Form.Item label="CPF" name="cpf" className="form-search-ficha-cpf">
            <MaskedInput mask="000.000.000-00" />
          </Form.Item>
          <Form.Item label="Data de Nascimento" name="data_nascimento" className="form-search-ficha-nascimento">
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item label="Gênero" name="genero" className="form-search-ficha-genero">
            <Select showSearch className="form-search-ficha-select-genero">
              <Option value="M">Masculino</Option>
              <Option value="F">Feminino</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Email" name="email" className="form-search-ficha-email">
            <Input />
          </Form.Item>
          <Form.Item label="Contato" name="contato" className="form-search-ficha-contato">
            <MaskedInput mask="(00) 0.0000-0000" />
          </Form.Item>
        </div>
        <Form.Item className="form-search-ficha-button">
          <Button type="primary" htmlType="submit" loading={loading}>
            Buscar
          </Button>
        </Form.Item>
      </Form>
      <div className="table-search-ficha">
        <Table columns={columns} dataSource={data} rowKey="id" />
      </div>
    </div>
  );
}

export default SearchFicha;
