import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, Table, message } from 'antd';
import MaskedInput from 'antd-mask-input';
import axiosInstance from "../../../../services/axiosInstance";
import authenticationVerify from "../../../../services/authenticationVerify";
import '../../css/SearchFicha.css';
import moment from 'moment';

const { Option } = Select;

// interface Atividade {
//   id: number;
//   atividade: string;
// }

const escolaridadeMap: { [key: string]: string } = {
  'FUNDAMENTAL': 'ENSINO FUNDAMENTAL',
  'MEDIO': 'ENSINO MÉDIO',
  'GRADUACAO': 'GRADUAÇÃO',
  'POS_GRADUACAO': 'PÓS-GRADUAÇÃO'
};

const generoMap: { [key: string]: string } = {
  'M': 'MASCULINO',
  'F': 'FEMININO'
};

const atividadeMap: { [key: string]: string } = {
  'ARTESANATO': 'ARTESANATO',
  'AGRICULTURA_URBANA': 'AGRICULTURA URBANA',
  'COMERCIO': 'COMÉRCIO',
  'ESTETICA_E_BELEZA': 'ESTÉTICA E BELEZA',
  'GASTRONOMIA': 'GASTRONOMIA',
  'INDUSTRIA': 'INDÚSTRIA',
  'SERVICO': 'SERVIÇO'
}

const SearchFicha: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  // const [atividades, setAtividades] = useState<{ [key: number]: string }>({});
  const [form] = Form.useForm();

  authenticationVerify('/login');

  useEffect(() => {
    // const fetchAtividades = async () => {
    //   try {
    //     const response = await axiosInstance.get('capacita/atividades/');
    //     const atividadeMap = response.data.reduce((map: { [key: number]: string }, atividade: Atividade) => {
    //       map[atividade.id] = atividade.atividade.toUpperCase();
    //       return map;
    //     }, {});
    //     setAtividades(atividadeMap);
    //   } catch (error) {
    //     message.error('Erro ao carregar atividades, tente novamente.');
    //   }
    // };

    const fetchFichas = async () => {
      try {
        const response = await axiosInstance.get('capacita/fichas/');
        // const fichas = response.data.map((ficha: any) => ({
        //   ...ficha,
        //   atividade: atividades[parseInt(ficha.atividade)] || ficha.atividade,
        // }));
        setData(response.data);
      } catch {}
    }

    // fetchAtividades();
    fetchFichas();
  }, []);

  const onFinish = async (values: any) => {
    if (values.data_nascimento) {
      values.data_nascimento = values.data_nascimento.format('YYYY-MM-DD');
    }

    if (values.cpf) {
      values.cpf = values.cpf.replace(/\D/g, '');
    }

    if (values.celular) {
      values.celular = values.celular.replace(/\D/g, '');
    }

    if (values.fixo) {
      values.fixo = values.fixo.replace(/\D/g, '');
    }

    // if (values.atividade) {
    //   values.atividade = atividades[parseInt(values.atividade)];
    // }

    const cleanedValues = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => v != null && v !== "")
    );

    setLoading(true);
    try {
      const response = await axiosInstance.get('capacita/fichas/', { params: cleanedValues });
      // const fichas = response.data.map((ficha: any) => ({
      //   ...ficha,
      //   atividade: atividades[parseInt(ficha.atividade)] || ficha.atividade,
      // }));
      setData(response.data);
      if (response.data.length === 0) {
        message.info('Nenhuma ficha encontrada.');
      } else {
        message.success('Busca realizada com sucesso!');
      }
    } catch (error) {
      message.error('Erro ao buscar ficha, tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  const onReset = () => {
    form.resetFields();
  };

  const columns = [
    { title: 'Nome', dataIndex: 'nome_completo', key: 'nome_completo' },
    { title: 'CPF', dataIndex: 'cpf', key: 'cpf', render: (cpf: string) => cpf ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '' },
    { title: 'Data de Nascimento', dataIndex: 'data_nascimento', key: 'data_nascimento', render: (text: string) => text ? moment(text).format('DD/MM/YYYY') : '' },
    { title: 'Gênero', dataIndex: 'genero', key: 'genero', render: (genero: string) => generoMap[genero] || genero },
    { title: 'Escolaridade', dataIndex: 'escolaridade', key: 'escolaridade', render: (escolaridade: string) => escolaridadeMap[escolaridade] || escolaridade },
    { title: 'UF', dataIndex: 'uf', key: 'uf' },
    { title: 'Atividade', dataIndex: 'atividade', key: 'atividade', render: (atividade: string) => atividadeMap[atividade] || atividade },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Celular', dataIndex: 'celular', key: 'celular', render: (celular: string) => celular ? celular.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') : '' },
    { title: 'Fixo', dataIndex: 'fixo', key: 'fixo', render: (fixo: string) => fixo ? fixo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3') : '' },
  ];

  return (
    <div className="search-ficha">
      <Form form={form} className="form-search-ficha" onFinish={onFinish}>
        <div className="form-search-ficha-minus-button">
          <Form.Item label="Nome" name="nome" className="form-search-ficha-nome">
            <Input onChange={(e) => form.setFieldsValue({ nome: e.target.value.toUpperCase() })} />
          </Form.Item>
          <Form.Item label="CPF" name="cpf" className="form-search-ficha-cpf">
            <MaskedInput mask="000.000.000-00" />
          </Form.Item>
          <Form.Item label="Data de Nascimento" name="data_nascimento" className="form-search-ficha-nascimento">
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item label="Gênero" name="genero" className="form-search-ficha-genero">
            <Select allowClear showSearch className="form-search-ficha-select-genero">
              <Option value="M">MASCULINO</Option>
              <Option value="F">FEMININO</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Escolaridade" name="escolaridade" className="form-search-ficha-escolaridade">
            <Select allowClear showSearch className="form-search-ficha-select-escolaridade">
              <Option value="FUNDAMENTAL">ENSINO FUNDAMENTAL</Option>
              <Option value="MEDIO">ENSINO MÉDIO</Option>
              <Option value="GRADUACAO">GRADUAÇÃO</Option>
              <Option value="POS_GRADUACAO">PÓS-GRADUAÇÃO</Option>
            </Select>
          </Form.Item>
          <Form.Item label="UF" name="uf" className="form-search-ficha-uf">
            <Select allowClear showSearch className="form-search-ficha-select-uf">
              <Option value="AC">ACRE</Option>
              <Option value="AL">ALAGOAS</Option>
              <Option value="AP">AMAPÁ</Option>
              <Option value="AM">AMAZONAS</Option>
              <Option value="BA">BAHIA</Option>
              <Option value="CE">CEARÁ</Option>
              <Option value="DF">DISTRITO FEDERAL</Option>
              <Option value="ES">ESPÍRITO SANTO</Option>
              <Option value="GO">GOIÁS</Option>
              <Option value="MA">MARANHÃO</Option>
              <Option value="MT">MATO GROSSO</Option>
              <Option value="MS">MATO GROSSO DO SUL</Option>
              <Option value="MG">MINAS GERAIS</Option>
              <Option value="PA">PARÁ</Option>
              <Option value="PB">PARAÍBA</Option>
              <Option value="PR">PARANÁ</Option>
              <Option value="PE">PERNAMBUCO</Option>
              <Option value="PI">PIAUÍ</Option>
              <Option value="RJ">RIO DE JANEIRO</Option>
              <Option value="RN">RIO GRANDE DO NORTE</Option>
              <Option value="RS">RIO GRANDE DO SUL</Option>
              <Option value="RO">RONDÔNIA</Option>
              <Option value="RR">RORAIMA</Option>
              <Option value="SC">SANTA CATARINA</Option>
              <Option value="SP">SÃO PAULO</Option>
              <Option value="SE">SERGIPE</Option>
              <Option value="TO">TOCANTINS</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Atividade" name="atividade" className="form-search-ficha-atividade">
            <Select allowClear showSearch className="form-search-ficha-select-atividade">
              <Option value="ARTESANATO">ARTESANATO</Option>
              <Option value="AGRICULTURA_URBANA">AGRICULTURA URBANA</Option>
              <Option value="COMERCIO">COMÉRCIO</Option>
              <Option value="ESTETICA_E_BELEZA">ESTÉTICA E BELEZA</Option>
              <Option value="GASTRONOMIA">GASTRONOMIA</Option>
              <Option value="INDUSTRIA">INDÚSTRIA</Option>
              <Option value="SERVICO">SERVIÇO</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Email" name="email" className="form-search-ficha-email">
            <Input />
          </Form.Item>
          <Form.Item label="Celular" name="celular" className="form-search-ficha-celular">
            <MaskedInput mask="(00) 0.0000-0000" />
          </Form.Item>
          <Form.Item label="Fixo" name="fixo" className="form-search-ficha-fixo">
            <MaskedInput mask="(00) 0000-0000" />
          </Form.Item>
        </div>
        <Form.Item className="form-search-ficha-button">
          <Button type="primary" htmlType="submit" loading={loading}>
            Buscar
          </Button>
          <Button style={{ marginLeft: '10px' }} onClick={onReset}>
            Limpar
          </Button>
        </Form.Item>
      </Form>
      <div className="table-search-ficha">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 10 }} // Número de fichas por página
        />
      </div>
    </div>
  );
}

export default SearchFicha;
