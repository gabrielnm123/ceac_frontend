import React from "react";
import Base from "../Base";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
} from 'antd';
import { itemUser } from "../MenuItems";
import MaskedInput from 'antd-mask-input';
import '../css/SearchFicha.css' 

const { RangePicker } = DatePicker;
const { Option } = Select

const SearchFicha: React.FC = () => {
  return (
    <Base content={
      <Form className="form-search-ficha">
        <div className="form-search-ficha-minus-button">
          <Form.Item label="Nome" name="nome" className="form-search-ficha-nome">
            <Mentions />
          </Form.Item>
          <Form.Item label="CPF" name="cpf" className="form-search-ficha-cpf">
            <MaskedInput mask="000.000.000-00" className="form-search-ficha-masked-input-cpf"/>
          </Form.Item>
          <Form.Item label="Gênero" name="genero" className="form-search-ficha-genero">
            <Select showSearch className="form-search-ficha-select-genero">
              <Option value="M">Masculino</Option>
              <Option value="F">Feminino</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Data de Nascimento" name="data-nascimento" className="form-search-ficha-nascimento">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Escolaridade" name="escolaridade" className="form-search-ficha-escolaridade">
            <Select showSearch className="form-search-ficha-select-escolaridade">
              <Option value="fundamental">Ensino Fundamental</Option>
              <Option value="medio">Ensino Médio</Option>
              <Option value="graduacao">Graduação</Option>
              <Option value="pos_graduacao">Pós-Graduação</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Atividade" name="atividade" className="form-search-ficha-atividade">
            <Select showSearch className="form-search-ficha-select">
              <Option value="atividade1">Atividade 1</Option>
            </Select>
          </Form.Item>
          <Form.Item label="UF" name="uf" className="form-search-ficha-uf">
            <Select showSearch className="form-search-ficha-select-uf">
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
        </div>

        {/* <Form.Item
          label="InputNumber"
          name="InputNumber"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="TextArea"
          name="TextArea"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Mentions"
          name="Mentions"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Mentions />
        </Form.Item>

        <Form.Item label="Select" name="Select" rules={[{ required: true, message: 'Please input!' }]}>
          <Select showSearch />
        </Form.Item>

        <Form.Item
          label="Cascader"
          name="Cascader"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Cascader />
        </Form.Item>

        <Form.Item
          label="TreeSelect"
          name="TreeSelect"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <TreeSelect />
        </Form.Item>

        <Form.Item
          label="DatePicker"
          name="DatePicker"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="RangePicker"
          name="RangePicker"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <RangePicker />
        </Form.Item> */}

        <Form.Item className="form-search-ficha-button">
          <Button type="primary" htmlType="submit">
            Buscar
          </Button>
        </Form.Item>
      </Form>
    } title="Buscar Ficha do Cliente"
      menuItem={itemUser()} />
    )
}

export default SearchFicha;
