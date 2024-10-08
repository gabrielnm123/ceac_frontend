import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, Table, message, Modal, Descriptions } from 'antd';
import MaskedInput from 'antd-mask-input';
import axiosInstance from "../../../../services/axiosInstance";
import useAuthenticationVerify from "../../../../services/useAuthenticationVerify";
import '../../css/SearchFicha.css';
import dayjs from 'dayjs';
import modulosCapacitaType from "../../types/modulosCapacita";
import { useNavigate } from "react-router-dom";

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
  const [getColumns, setColumns] = useState<undefined | Array<Object>>(undefined);
  const [getForm] = Form.useForm();
  const [getVisible, setVisible] = useState<boolean>(false);
  const [getSelectedFicha, setSelectedFicha] = useState<any>(null);
  const [getTriggerAuth, setTriggerAuth] = useState<boolean>(true);
  const navigate = useNavigate();

  // useAuthenticationVerify('/login', getTriggerAuth);

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
              text ? dayjs(text).format('DD/MM/YYYY') : ''
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
        navigate('/login');
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
    setTriggerAuth((prevTriggerAuth) => !prevTriggerAuth);
    try {
      setLoading(true);
      const response = await axiosInstance.get(`capacita/fichas/${id}`);
      setSelectedFicha(response.data);
      setVisible(true);
    } catch (error) {
      navigate('/login');
      message.error('Erro ao carregar a ficha, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const dowloadFicha = () => {
    handleOpenFicha(getSelectedFicha.id);
    axiosInstance.get(`capacita/fichas/${getSelectedFicha.id}/download`, {
      responseType: 'blob'
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${getSelectedFicha.nome_completo}.docx`); // Define o nome do arquivo
        document.body.appendChild(link);
        link.click(); // Simula o clique para iniciar o download
        document.body.removeChild(link); // Remove o link temporário do DOM
      })
      .catch(() => {
        message.error('Erro ao baixar a ficha, tente novamente.')
      })
  }

  const onFinish = async (values: any) => {
    setTriggerAuth((prevTriggerAuth) => !prevTriggerAuth);
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
      navigate('/login');
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
            <Form.Item label="Atividade" name="atividade" className="form-search-ficha-atividade form-search-ficha-form-item">
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
            <Button className="limpar-button" onClick={onReset}>
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
      open={getVisible}
      onCancel={() => setVisible(false)}
      footer={null}
    >
      {getSelectedFicha && (
        <>
        <Button className="dowload-ficha" onClick={dowloadFicha}>Baixar Ficha</Button>
        <Descriptions bordered column={1} layout="horizontal">
          <Descriptions.Item label="Nome">{getSelectedFicha.nome_completo || 'NÃO INFORMADO'}</Descriptions.Item>
          <Descriptions.Item label="CPF">
            {getSelectedFicha.cpf ? getSelectedFicha.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : 'NÃO INFORMADO'}
          </Descriptions.Item>
          <Descriptions.Item label="Gênero">{generoMap[getSelectedFicha.genero] || 'NÃO INFORMADO'}</Descriptions.Item>
          <Descriptions.Item label="Data de Nascimento">
            {getSelectedFicha.data_nascimento ? dayjs(getSelectedFicha.data_nascimento).format('DD/MM/YYYY').toUpperCase() : 'NÃO INFORMADO'}
          </Descriptions.Item>
          <Descriptions.Item label="Escolaridade">{escolaridadeMap[getSelectedFicha.escolaridade] || 'NÃO INFORMADO'}</Descriptions.Item>
          <Descriptions.Item label="Atividade">{atividadeMap[getSelectedFicha.atividade] || 'NÃO INFORMADO'}</Descriptions.Item>
          <Descriptions.Item label="Endereço">{getSelectedFicha.endereco || 'NÃO INFORMADO'}</Descriptions.Item>
          <Descriptions.Item label="Complemento">{getSelectedFicha.complemento || 'NÃO INFORMADO'}</Descriptions.Item>
          <Descriptions.Item label="Bairro">{getSelectedFicha.bairro || 'NÃO INFORMADO'}</Descriptions.Item>
          <Descriptions.Item label="CEP">
            {getSelectedFicha.cep ? getSelectedFicha.cep.replace(/(\d{5})(\d{3})/, '$1-$2') : 'NÃO INFORMADO'}
          </Descriptions.Item>
          <Descriptions.Item label="UF">{getSelectedFicha.uf || 'NÃO INFORMADO'}</Descriptions.Item>
          <Descriptions.Item label="Celular">
            {getSelectedFicha.celular ? getSelectedFicha.celular.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') : 'NÃO INFORMADO'}
          </Descriptions.Item>
          <Descriptions.Item label="Fixo">
            {getSelectedFicha.fixo ? getSelectedFicha.fixo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3') : 'NÃO INFORMADO'}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{getSelectedFicha.email.toLowerCase()}</Descriptions.Item>
          <Descriptions.Item label="Interesse em ter negócio">
            {getSelectedFicha.interesse_ter_negocio === 'S' ? 'SIM' : 'NÃO'}
          </Descriptions.Item>
          <Descriptions.Item label="Preferência de Aula">{getSelectedFicha.preferencia_aula || 'NÃO INFORMADO'}</Descriptions.Item>
          <Descriptions.Item label="Meio de Comunicação de Aula">{getSelectedFicha.meio_comunicacao_aula || 'NÃO INFORMADO'}</Descriptions.Item>
          <Descriptions.Item label="Assistir Online">{getSelectedFicha.assistir_online === 'S' ? 'SIM' : 'NÃO'}</Descriptions.Item>
          {getSelectedFicha.assistir_online === 'S' && (
            <Descriptions.Item label="Se assistir em casa, como?">{getSelectedFicha.if_true_assistir_casa || 'NÃO INFORMADO'}</Descriptions.Item>
          )}
          <Descriptions.Item label="Nome Fantasia">{getSelectedFicha.nome_fantasia || 'NÃO INFORMADO'}</Descriptions.Item>
          <Descriptions.Item label="CNPJ">
            {getSelectedFicha.cnpj ? getSelectedFicha.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') : 'NÃO INFORMADO'}
          </Descriptions.Item>
          <Descriptions.Item label="Situação da Empresa">
            {getSelectedFicha.situacao_empresa === 'ATIVA' ? 'ATIVA' : 'NÃO ATIVA'}
          </Descriptions.Item>
          <Descriptions.Item label="Porte da Empresa">{getSelectedFicha.porte_empresa || 'NÃO INFORMADO'}</Descriptions.Item>
          <Descriptions.Item label="Data de Abertura">
            {getSelectedFicha.data_abertura ? dayjs(getSelectedFicha.data_abertura).format('DD/MM/YYYY').toUpperCase() : 'NÃO INFORMADO'}
          </Descriptions.Item>
          <Descriptions.Item label="CNAE Principal">{getSelectedFicha.cnae_principal || 'NÃO INFORMADO'}</Descriptions.Item>
          <Descriptions.Item label="Setor">{getSelectedFicha.setor || 'NÃO INFORMADO'}</Descriptions.Item>
          <Descriptions.Item label="Tipo de Vínculo">{getSelectedFicha.tipo_vinculo || 'NÃO INFORMADO'}</Descriptions.Item>
          <Descriptions.Item label="Módulo de Capacitação">
            {getModulosCapacita.find((modulo) => modulo.id === getSelectedFicha.modulo_capacita)?.nome.split(": ").join(": ") || 'NÃO INFORMADO'}
          </Descriptions.Item>
        </Descriptions>
        </>
      )}
    </Modal>
    </>
  );
}

export default SearchFicha;
