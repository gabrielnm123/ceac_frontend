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

const { RangePicker } = DatePicker;
const { Option } = Select

const SearchFicha: React.FC = () => {
  return (
    <Base content={
      <Form className="form-searcheFicha">
        <Form.Item label="Nome" name="nome" className="searcheFicha-nome">
          <Input />
        </Form.Item>
        <Form.Item label="CPF" name="cpf" className="searcheFicha-cpf">
          <MaskedInput mask="000.000.000-00" />
        </Form.Item>
        <Form.Item label="Gênero" name="genero" className="searcheFicha-genero">
          <Select>
            <Option value="M">Masculino</Option>
            <Option value="F">Feminino</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Data de Nascimento" name="data-nascimento" className="searcheFicha-nascimento">
          <DatePicker />
        </Form.Item>

        <Form.Item
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
          <Select />
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
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
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
