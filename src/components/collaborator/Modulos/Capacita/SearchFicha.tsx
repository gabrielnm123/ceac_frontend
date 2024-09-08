import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, Table, message, Modal } from 'antd';
import MaskedInput from 'antd-mask-input';
import axiosInstance from "../../../../services/axiosInstance";
import authenticationVerify from "../../../../services/authenticationVerify";
import '../../css/SearchFicha.css';
import moment from 'moment';
import modulosCapacitaType from "../../types/modulosCapacita";

const { Option } = Select;

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
};

const SearchFicha: React.FC = () => {
  const [getLoading, setLoading] = useState<boolean>(false);
  const [getData, setData] = useState<any[]>([]);
  const [getModulosCapacita, setModulosCapacita] = useState<modulosCapacitaType[]>([]);
  const [getColumns, setColumns] = useState<Array<null> | Array<Object>>([]);
  const [getForm] = Form.useForm();
  const [getCounter, setCounter] = useState<number>(0);
  const [getVisible, setVisible] = useState<boolean>(false);
  const [getSelectedFicha, setSelectedFicha] = useState<any>(null);

  authenticationVerify('/login', getCounter);

  useEffect(() => {
    const fetchModulosCapacita = async () => {
      try {
        const response = await axiosInstance.get('capacita/modulos_capacita/');
        setModulosCapacita(response.data);
        const columns = [
          {
            title: 'Nome', dataIndex: 'nome_completo', key: 'nome_completo', render: (text: string, record: any) => (
              <a onClick={() => handleOpenFicha(record.id)}>
                {text}
              </a>
            )
          },
          {
            title: 'Módulo de Aprendizagem', dataIndex: 'modulo_capacita', key: 'modulo_capacita', render: (id: number) => response.data.map(
              (modulo: modulosCapacitaType) => {
                if (modulo.id === id) {
                  return modulo.nome;
                }
                return null;
              }
            )
          },
          {
            title: 'CPF', dataIndex: 'cpf', key: 'cpf', render: (cpf: string) =>
              cpf ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : ''
          },
          {
            title: 'Data de Nascimento', dataIndex: 'data_nascimento', key: 'data_nascimento', render: (text: string) =>
              text ? moment(text).format('DD/MM/YYYY') : ''
          },
          {
            title: 'Gênero', dataIndex: 'genero', key: 'genero', render: (genero: string) => generoMap[genero] || genero
          },
          {
            title: 'Escolaridade', dataIndex: 'escolaridade', key: 'escolaridade', render: (escolaridade: string) => escolaridadeMap[escolaridade] || escolaridade
          },
          { title: 'UF', dataIndex: 'uf', key: 'uf' },
          {
            title: 'Atividade', dataIndex: 'atividade', key: 'atividade', render: (atividade: string) => atividadeMap[atividade] || atividade
          },
          { title: 'Email', dataIndex: 'email', key: 'email' },
          {
            title: 'Celular', dataIndex: 'celular', key: 'celular', render: (celular: string) =>
              celular ? celular.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') : ''
          },
          {
            title: 'Fixo', dataIndex: 'fixo', key: 'fixo', render: (fixo: string) =>
              fixo ? fixo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3') : ''
          },
        ];
        setColumns(columns);
      } catch (error) {
        message.error('Erro ao carregar os módulos de aprendizagem, tente novamente.');
      }
    };

    const fetchFichas = async () => {
      try {
        const response = await axiosInstance.get('capacita/fichas/');
        setData(response.data);
      } catch { }
    };

    fetchModulosCapacita();
    fetchFichas();
  }, []);

  const handleOpenFicha = async (id: number) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`capacita/fichas/${id}`);
      setSelectedFicha(response.data);
      setVisible(true);
    } catch (error) {
      message.error('Erro ao carregar a ficha, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    setCounter(getCounter + 1);
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

    const cleanedValues = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => v != null && v !== "")
    );

    setLoading(true);
    try {
      const response = await axiosInstance.get('capacita/fichas/', { params: cleanedValues });
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
  };

  const onReset = () => {
    getForm.resetFields();
  };

  return (
    <>
      <div className="search-ficha">
        <Form form={getForm} className="form-search-ficha" onFinish={onFinish}>
          <div className="form-search-ficha-minus-button">
            <Form.Item label="Nome" name="nome" className="form-search-ficha-nome form-search-ficha-form-item">
              <Input onChange={(e) => getForm.setFieldsValue({ nome: e.target.value.toUpperCase() })} allowClear />
            </Form.Item>
            <Form.Item label="Módulo de Capacitação" name='modulo_capacita' className="form-search-ficha-modulos-capacita form-search-ficha-form-item">
              <Select allowClear showSearch className="form-search-ficha-select-modulos-capacita" options={getModulosCapacita.map(
                (modulo: modulosCapacitaType) => {
                  return { value: modulo.id, label: modulo.nome };
                }
              )} />
            </Form.Item>
            <Form.Item label="CPF" name="cpf" className="form-search-ficha-cpf form-search-ficha-form-item">
              <MaskedInput mask="000.000.000-00" allowClear />
            </Form.Item>
            <Form.Item label="Data de Nascimento" name="data_nascimento" className="form-search-ficha-nascimento form-search-ficha-form-item">
              <DatePicker format="DD/MM/YYYY" allowClear />
            </Form.Item>
            <Form.Item label="Gênero" name="genero" className="form-search-ficha-genero form-search-ficha-form-item">
              <Select allowClear showSearch className="form-search-ficha-select-genero">
                <Option value="M">MASCULINO</Option>
                <Option value="F">FEMININO</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Escolaridade" name="escolaridade" className="form-search-ficha-escolaridade form-search-ficha-form-item">
              <Select allowClear showSearch className="form-search-ficha-select-escolaridade">
                <Option value="FUNDAMENTAL">ENSINO FUNDAMENTAL</Option>
                <Option value="MEDIO">ENSINO MÉDIO</Option>
                <Option value="GRADUACAO">GRADUAÇÃO</Option>
                <Option value="POS_GRADUACAO">PÓS-GRADUAÇÃO</Option>
              </Select>
            </Form.Item>
            <Form.Item label="UF" name="uf" className="form-search-ficha-uf form-search-ficha-form-item">
              <Select allowClear showSearch className="form-search-ficha-select-uf">
                {/* Opções de estados */}
              </Select>
            </Form.Item>
            <Form.Item label="Atividade" name="atividade" className="form-search-ficha-atividade form-search-ficha-form-item">
              <Select allowClear showSearch className="form-search-ficha-select-atividade">
                {/* Opções de atividades */}
              </Select>
            </Form.Item>
            <Form.Item label="Email" name="email" className="form-search-ficha-email form-search-ficha-form-item">
              <Input type="email" allowClear />
            </Form.Item>
            <Form.Item label="Celular" name="celular" className="form-search-ficha-celular form-search-ficha-form-item">
              <MaskedInput mask="(00) 0.0000-0000" allowClear />
            </Form.Item>
            <Form.Item label="Fixo" name="fixo" className="form-search-ficha-fixo form-search-ficha-form-item">
              <MaskedInput mask="(00) 0000-0000" allowClear />
            </Form.Item>
          </div>
          <Form.Item className="form-search-ficha-button form-search-ficha-form-item">
            <Button type="primary" htmlType="submit" loading={getLoading}>
              Buscar
            </Button>
            <Button style={{ marginLeft: '10px' }} onClick={onReset}>
              Limpar
            </Button>
          </Form.Item>
        </Form>

        <div className="table-search-ficha">
          <Table
            columns={getColumns}
            dataSource={getData}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>

      <Modal
        title="Ficha Completa"
        visible={getVisible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        {getSelectedFicha && (
          <div>
            <p><strong>Nome:</strong> {getSelectedFicha.nome_completo || 'NÃO INFORMADO'}</p>
            <p><strong>CPF:</strong> {getSelectedFicha.cpf ? getSelectedFicha.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : 'NÃO INFORMADO'}</p>
            <p><strong>Gênero:</strong> {generoMap[getSelectedFicha.genero] || 'NÃO INFORMADO'}</p>
            <p><strong>Data de Nascimento:</strong> {getSelectedFicha.data_nascimento ? moment(getSelectedFicha.data_nascimento).format('DD/MM/YYYY').toUpperCase() : 'NÃO INFORMADO'}</p>
            <p><strong>Escolaridade:</strong> {escolaridadeMap[getSelectedFicha.escolaridade] || 'NÃO INFORMADO'}</p>
            <p><strong>Atividade:</strong> {atividadeMap[getSelectedFicha.atividade] || 'NÃO INFORMADO'}</p>
            <p><strong>Endereço:</strong> {getSelectedFicha.endereco || 'NÃO INFORMADO'}</p>
            <p><strong>Complemento:</strong> {getSelectedFicha.complemento || 'NÃO INFORMADO'}</p>
            <p><strong>Bairro:</strong> {getSelectedFicha.bairro || 'NÃO INFORMADO'}</p>
            <p><strong>CEP:</strong> {getSelectedFicha.cep ? getSelectedFicha.cep.replace(/(\d{5})(\d{3})/, '$1-$2') : 'NÃO INFORMADO'}</p>
            <p><strong>UF:</strong> {getSelectedFicha.uf || 'NÃO INFORMADO'}</p>
            <p><strong>Celular:</strong> {getSelectedFicha.celular ? getSelectedFicha.celular.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') : 'NÃO INFORMADO'}</p>
            <p><strong>Fixo:</strong> {getSelectedFicha.fixo ? getSelectedFicha.fixo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3') : 'NÃO INFORMADO'}</p>
            <p><strong>Email:</strong> {getSelectedFicha.email.toLowerCase()}</p>
            <p><strong>Interesse em ter negócio:</strong> {getSelectedFicha.interesse_ter_negocio === 'S' ? 'SIM' : 'NÃO'}</p>
            <p><strong>Preferência de Aula:</strong> {getSelectedFicha.preferencia_aula || 'NÃO INFORMADO'}</p>
            <p><strong>Meio de Comunicação de Aula:</strong> {getSelectedFicha.meio_comunicacao_aula || 'NÃO INFORMADO'}</p>
            <p><strong>Assistir Online:</strong> {getSelectedFicha.assistir_online === 'S' ? 'SIM' : 'NÃO'}</p>
            {getSelectedFicha.assistir_online === 'S' && (
              <p><strong>Se assistir em casa, como?</strong> {getSelectedFicha.if_true_assistir_casa || 'NÃO INFORMADO'}</p>
            )}
            <p><strong>Nome Fantasia:</strong> {getSelectedFicha.nome_fantasia || 'NÃO INFORMADO'}</p>
            <p><strong>CNPJ:</strong> {getSelectedFicha.cnpj ? getSelectedFicha.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') : 'NÃO INFORMADO'}</p>
            <p><strong>Situação da Empresa:</strong> {getSelectedFicha.situacao_empresa === 'ATIVA' ? 'ATIVA' : 'NÃO ATIVA'}</p>
            <p><strong>Porte da Empresa:</strong> {getSelectedFicha.porte_empresa || 'NÃO INFORMADO'}</p>
            <p><strong>Data de Abertura:</strong> {getSelectedFicha.data_abertura ? moment(getSelectedFicha.data_abertura).format('DD/MM/YYYY').toUpperCase() : 'NÃO INFORMADO'}</p>
            <p><strong>CNAE Principal:</strong> {getSelectedFicha.cnae_principal || 'NÃO INFORMADO'}</p>
            <p><strong>Setor:</strong> {getSelectedFicha.setor || 'NÃO INFORMADO'}</p>
            <p><strong>Tipo de Vínculo:</strong> {getSelectedFicha.tipo_vinculo || 'NÃO INFORMADO'}</p>
            <p><strong>Módulo de Capacitação:</strong> {getModulosCapacita.find((modulo: any) => modulo.id === getSelectedFicha.modulo_capacita)?.nome.split(": ").join(": ") || 'NÃO INFORMADO'}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default SearchFicha;
