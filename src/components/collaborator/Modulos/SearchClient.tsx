import React from "react";
import {
  Button,
  DatePicker,
  Form,
  Mentions,
  Select,
  Input,
  Table,
  message
} from 'antd';
import MaskedInput from 'antd-mask-input';
import '../css/SearchClient.css'
import axiosInstance from "../../../services/axiosInstance";

const { Option } = Select

const SearchClient: React.FC = () => {
  const onFinish = async (values: object) => {
    try {
      const response = await axiosInstance.get('capacita/clientes/', {
        params: values,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
    }
  }

      return (
    <Form
      className="form-search-client"
      onFinish={onFinish}
    >
      <div className="form-search-client-minus-button">
        <Form.Item label="Nome" name="nome" className="form-search-client-nome">
          <Mentions />
        </Form.Item>
        <Form.Item label="CPF" name="cpf" className="form-search-client-cpf">
          <MaskedInput mask="000.000.000-00" className="form-search-client-masked-input-cpf"/>
        </Form.Item>
        <Form.Item label="Data de Nascimento" name="data-nascimento" className="form-search-client-nascimento">
          <DatePicker format="DD/MM/YYYY"/>
        </Form.Item>
        <Form.Item label="Gênero" name="genero" className="form-search-client-genero">
          <Select showSearch className="form-search-client-select-genero">
            <Option value="M">Masculino</Option>
            <Option value="F">Feminino</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Escolaridade" name="escolaridade" className="form-search-client-escolaridade">
          <Select showSearch className="form-search-client-select-escolaridade">
            <Option value="fundamental">Ensino Fundamental</Option>
            <Option value="medio">Ensino Médio</Option>
            <Option value="graduacao">Graduação</Option>
            <Option value="pos_graduacao">Pós-Graduação</Option>
          </Select>
        </Form.Item>
        <Form.Item label="UF" name="uf" className="form-search-client-uf">
          <Select showSearch className="form-search-client-select-uf">
              <Option value="AC">Acre</Option>
              <Option value="AL">Alagoas</Option>
              <Option value="AP">Amapá</Option>
              <Option value="AM">Amazonas</Option>
              <Option value="BA">Bahia</Option>
              <Option value="CE">Ceará</Option>
              <Option value="DF">Distrito Federal</Option>
              <Option value="ES">Espírito Santo</Option>
              <Option value="GO">Goiás</Option>
              <Option value="MA">Maranhão</Option>
              <Option value="MT">Mato Grosso</Option>
              <Option value="MS">Mato Grosso do Sul</Option>
              <Option value="MG">Minas Gerais</Option>
              <Option value="PA">Pará</Option>
              <Option value="PB">Paraíba</Option>
              <Option value="PR">Paraná</Option>
              <Option value="PE">Pernambuco</Option>
              <Option value="PI">Piauí</Option>
              <Option value="RJ">Rio de Janeiro</Option>
              <Option value="RN">Rio Grande do Norte</Option>
              <Option value="RS">Rio Grande do Sul</Option>
              <Option value="RO">Rondônia</Option>
              <Option value="RR">Roraima</Option>
              <Option value="SC">Santa Catarina</Option>
              <Option value="SP">São Paulo</Option>
              <Option value="SE">Sergipe</Option>
              <Option value="TO">Tocantins</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Atividade" name="atividade" className="form-search-client-atividade">
          <Select showSearch className="form-search-client-select">
            <Option value="atividade1">Atividade 1</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Contato" name="contato" className="form-search-client-contato">
          <MaskedInput mask="(00) 0.0000-0000" className="form-search-client-masked-input-contato"/>
        </Form.Item>
        <Form.Item label="Email" name="email" className="form-search-client-email">
          <Input className="form-search-client-masked-input-email"/>
        </Form.Item>
      </div>
      <Form.Item className="form-search-client-button">
        <Button type="primary" htmlType="submit">
          Buscar
        </Button>
      </Form.Item>
    </Form>
    )
}

export default SearchClient;
