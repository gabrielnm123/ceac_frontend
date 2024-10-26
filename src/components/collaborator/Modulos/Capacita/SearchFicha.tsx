import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, Table, message, Modal, Descriptions, Popconfirm, Typography } from 'antd';
import MaskedInput from 'antd-mask-input';
import axiosInstance from "../../../../services/axiosInstance";
import '../../css/SearchFicha.css';
import dayjs from 'dayjs';
import modulosCapacitaType from "../../types/modulosCapacita";
import { useNavigate } from "react-router-dom";
import { logout } from "../../menuItems/itemUser";
import CreateFicha from "./CreateFicha";

const { Option } = Select;
const { Title } = Typography

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
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [getVisibleFicha, setVisibleFicha] = useState<boolean>(false);
  const [getSelectedFicha, setSelectedFicha] = useState<any>(null);
  const [getIsEditingFicha, setIsEditingFicha] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('capacita/modulos_capacita/')
      .then((response) => {
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
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          logout();
          navigate('/colaborador/login');
        } else message.error('Erro ao carregar os módulos de aprendizagem, tente novamente.');
      })

    axiosInstance.get('capacita/fichas/')
      .then((response) => {
        setData(response.data);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          logout();
          navigate('/colaborador/login');
        } else message.error('Erro ao carregar fichas, recarregue a página.');
      })
  }, []);

  const handleOpenFicha = (id: number) => {
    axiosInstance.get(`capacita/fichas/${id}`)
      .then((response) => {
        setLoading(true);
        setSelectedFicha(response.data);
        setVisibleFicha(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          logout();
          navigate('/colaborador/login');
        } else message.error('Erro ao carregar a ficha, tente novamente.');
      })
      .finally(() => {
        setLoading(false);
      })
  };

  const dowloadFicha = () => {
    axiosInstance.get(`capacita/fichas/${getSelectedFicha.id}/download`, {
      responseType: 'blob'
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${getSelectedFicha.nome_completo}.docx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          logout();
          navigate('/colaborador/login');
        } else message.error('Erro ao baixar a ficha, tente novamente.');
      })
  }

  const deleteFicha = () => {
    axiosInstance.delete(`capacita/fichas/${getSelectedFicha.id}/`)
      .then(() => {
        message.success(`Ficha do(a) ${getSelectedFicha.nome_completo} deletada com sucesso.`)
        setVisibleFicha(false)
        onFinish(form.getFieldsValue());
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          logout();
          navigate('/colaborador/login');
        } else message.error(`Erro ao deletar a ficha do(a) ${getSelectedFicha.nome_completo}. Tente novamente.`);
      })
  }

  const onReset = () => {
    form.resetFields();
  };

  const editingFicha = () => {
    form2.resetFields()
    form2.setFieldsValue({
      ...getSelectedFicha,
      data_nascimento: dayjs(getSelectedFicha.data_nascimento),
      data_abertura: getSelectedFicha.data_abertura ? dayjs(getSelectedFicha.data_abertura) : null,
      cpf: getSelectedFicha.cpf ? getSelectedFicha.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '',
      celular: getSelectedFicha.celular ? getSelectedFicha.celular.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') : '',
      fixo: getSelectedFicha.fixo ? getSelectedFicha.fixo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3') : '',
      cep: getSelectedFicha.cep ? getSelectedFicha.cep.replace(/(\d{5})(\d{3})/, '$1-$2') : '',
      cnpj: getSelectedFicha.cnpj ? getSelectedFicha.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') : '',
    });
    setIsEditingFicha(true);
  };

  const onEditFinish = (values: any) => {
    setLoading(true);
    axiosInstance.put(`capacita/fichas/${getSelectedFicha.id}/`, values)
      .then(() => {
        message.success('Ficha editada com sucesso!');
        setIsEditingFicha(false);
        handleOpenFicha(getSelectedFicha.id);
        onFinish(form.getFieldsValue());
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          logout();
          navigate('/colaborador/login');
        } else message.error('Erro ao editar ficha, tente novamente.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFinish = (values: any) => {
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
    axiosInstance.get('capacita/fichas/', { params: cleanedValues })
      .then((response) => {
        setData(response.data);
        if (response.data.length === 0) {
          message.info('Nenhuma ficha encontrada.');
        } else {
          message.success('Busca realizada com sucesso!');
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          logout();
          navigate('/colaborador/login');
        } else message.error('Erro ao buscar ficha, tente novamente.');
      })
      .finally(() => {
        setLoading(false);
      })
  };

  return (
    <>
      <div className="search-ficha">
        <Form form={form} className="form-search-ficha" onFinish={onFinish}>
          <div className="form-search-ficha-minus-button">
            <Form.Item label="Nome" name="nome" className="form-search-ficha-nome form-search-ficha-item">
              <Input onChange={(e) => form.setFieldsValue({ nome: e.target.value.toUpperCase() })} allowClear />
            </Form.Item>
            <Form.Item label="Módulo de Capacitação" name='modulo_capacita' className="form-search-ficha-modulos-capacita form-search-ficha-item">
              <Select allowClear showSearch className="form-search-ficha-select-modulos-capacita" options={getModulosCapacita.map(
                (modulo: modulosCapacitaType) => {
                  return { value: modulo.id, label: modulo.nome };
                }
              )} />
            </Form.Item>
            <Form.Item label="CPF" name="cpf" className="form-search-ficha-cpf form-search-ficha-item">
              <MaskedInput mask="000.000.000-00" allowClear />
            </Form.Item>
            <Form.Item label="Data de Nascimento" name="data_nascimento" className="form-search-ficha-nascimento form-search-ficha-item">
              <DatePicker format="DD/MM/YYYY" allowClear />
            </Form.Item>
            <Form.Item label="Gênero" name="genero" className="form-search-ficha-genero form-search-ficha-item">
              <Select allowClear showSearch className="form-search-ficha-select-genero">
                <Option value="M">MASCULINO</Option>
                <Option value="F">FEMININO</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Escolaridade" name="escolaridade" className="form-search-ficha-escolaridade form-search-ficha-item">
              <Select allowClear showSearch className="form-search-ficha-select-escolaridade">
                <Option value="FUNDAMENTAL">ENSINO FUNDAMENTAL</Option>
                <Option value="MEDIO">ENSINO MÉDIO</Option>
                <Option value="GRADUACAO">GRADUAÇÃO</Option>
                <Option value="POS_GRADUACAO">PÓS-GRADUAÇÃO</Option>
              </Select>
            </Form.Item>
            <Form.Item label="UF" name="uf" className="form-search-ficha-uf form-search-ficha-item">
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
            <Form.Item label="Atividade" name="atividade" className="form-search-ficha-atividade form-search-ficha-item">
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
            <Form.Item label="Email" name="email" className="form-search-ficha-email form-search-ficha-item">
              <Input type="email" allowClear />
            </Form.Item>
            <Form.Item label="Celular" name="celular" className="form-search-ficha-celular form-search-ficha-item">
              <MaskedInput mask="(00) 0.0000-0000" allowClear />
            </Form.Item>
            <Form.Item label="Fixo" name="fixo" className="form-search-ficha-fixo form-search-ficha-item">
              <MaskedInput mask="(00) 0000-0000" allowClear />
            </Form.Item>
          </div>
          <Form.Item className="form-search-ficha-button form-search-ficha-item">
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
        open={getVisibleFicha}
        onCancel={() => setVisibleFicha(false)}
        footer={null}
      >
        {getSelectedFicha && (
          <div className="modal-ficha">
            <div className="button-ficha-description">
              <Button className="dowload-ficha" type="primary" onClick={dowloadFicha}>Baixar Ficha</Button>
              <Button className="edit-ficha" onClick={editingFicha}>Editar Ficha</Button>
              <Popconfirm
                title="Tem certeza que deseja deletar esta ficha?"
                onConfirm={deleteFicha}
                okText="Sim"
                cancelText="Não"
              >
                <Button className="delete-ficha">Deletar Ficha</Button>
              </Popconfirm>
            </div>
            <Title className="modal-title" level={2}>Dados Pessoais</Title>
            <Descriptions bordered column={1} layout="horizontal">

              <Descriptions.Item label="Nome">{getSelectedFicha.nome_completo}</Descriptions.Item>
              <Descriptions.Item label="CPF">
                {getSelectedFicha.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
              </Descriptions.Item>
              <Descriptions.Item label="Gênero">{generoMap[getSelectedFicha.genero]}</Descriptions.Item>
              <Descriptions.Item label="Data de Nascimento">
                {dayjs(getSelectedFicha.data_nascimento).format('DD/MM/YYYY').toUpperCase()}
              </Descriptions.Item>
              <Descriptions.Item label="Escolaridade">{escolaridadeMap[getSelectedFicha.escolaridade]}</Descriptions.Item>
              <Descriptions.Item label="Atividade">{atividadeMap[getSelectedFicha.atividade]}</Descriptions.Item>
              <Descriptions.Item label="Endereço">{getSelectedFicha.endereco}</Descriptions.Item>
              {getSelectedFicha.complemento && (
                <Descriptions.Item label="Complemento">{getSelectedFicha.complemento}</Descriptions.Item>
              )}
              <Descriptions.Item label="Bairro">{getSelectedFicha.bairro}</Descriptions.Item>
              <Descriptions.Item label="CEP">
                {getSelectedFicha.cep.replace(/(\d{5})(\d{3})/, '$1-$2')}
              </Descriptions.Item>
              <Descriptions.Item label="UF">{getSelectedFicha.uf}</Descriptions.Item>
              <Descriptions.Item label="Celular">
                {getSelectedFicha.celular.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}
              </Descriptions.Item>
              {getSelectedFicha.fixo && (
                <Descriptions.Item label="Fixo">
                  {getSelectedFicha.fixo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')}
                </Descriptions.Item>
              )}
              <Descriptions.Item label="Email">{getSelectedFicha.email.toLowerCase()}</Descriptions.Item>
              <Descriptions.Item label="Interesse em ter negócio">
                {getSelectedFicha.interesse_ter_negocio === 'S' ? 'SIM' : 'NÃO'}
              </Descriptions.Item>
              <Descriptions.Item label="Preferência de Aula">{getSelectedFicha.preferencia_aula}</Descriptions.Item>
              <Descriptions.Item label="Meio de Comunicação de Aula">{getSelectedFicha.meio_comunicacao_aula}</Descriptions.Item>
              <Descriptions.Item label="Assistir Online">{getSelectedFicha.assistir_online === 'S' ? 'SIM' : 'NÃO'}</Descriptions.Item>
              {getSelectedFicha.assistir_online === 'S' && getSelectedFicha.if_true_assistir_casa && (
                <Descriptions.Item label="Se assistir em casa, como?">{getSelectedFicha.if_true_assistir_casa}</Descriptions.Item>
              )}
            </Descriptions>

            {getSelectedFicha.nome_fantasia && (
              <Title className="modal-title" level={2}>Dados Jurídicos</Title>
            )}
            <Descriptions bordered column={1} layout="horizontal">
              {getSelectedFicha.nome_fantasia && (
                <Descriptions.Item label="Nome Fantasia">{getSelectedFicha.nome_fantasia}</Descriptions.Item>
              )}
              {getSelectedFicha.cnpj && (
                <Descriptions.Item label="CNPJ">
                  {getSelectedFicha.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')}
                </Descriptions.Item>
              )}
              {getSelectedFicha.situacao_empresa && (
                <Descriptions.Item label="Situação da Empresa">
                  {getSelectedFicha.situacao_empresa === 'ATIVA' ? 'ATIVA' : 'NÃO ATIVA'}
                </Descriptions.Item>
              )}
              {getSelectedFicha.porte_empresa && (
                <Descriptions.Item label="Porte da Empresa">{getSelectedFicha.porte_empresa}</Descriptions.Item>
              )}
              {getSelectedFicha.data_abertura && (
                <Descriptions.Item label="Data de Abertura">
                  {dayjs(getSelectedFicha.data_abertura).format('DD/MM/YYYY').toUpperCase()}
                </Descriptions.Item>
              )}
              {getSelectedFicha.cnae_principal && (
                <Descriptions.Item label="CNAE Principal">{getSelectedFicha.cnae_principal}</Descriptions.Item>
              )}
              {getSelectedFicha.setor && (
                <Descriptions.Item label="Setor">{getSelectedFicha.setor}</Descriptions.Item>
              )}
              {getSelectedFicha.tipo_vinculo && (
                <Descriptions.Item label="Tipo de Vínculo">{getSelectedFicha.tipo_vinculo}</Descriptions.Item>
              )}
            </Descriptions>

            <Title className="modal-title" level={2}>Módulo de Capacitação</Title>
            <Descriptions bordered column={1} layout="horizontal">
              {getModulosCapacita.find((modulo) => modulo.id === getSelectedFicha.modulo_capacita)?.nome && (
                <Descriptions.Item label="Módulo de Capacitação">
                  {getModulosCapacita.find((modulo) => modulo.id === getSelectedFicha.modulo_capacita)?.nome.split(": ").join(": ")}
                </Descriptions.Item>
              )}
            </Descriptions>

          </div>
        )}
      </Modal>
      <Modal
        open={getIsEditingFicha}
        onCancel={() => setIsEditingFicha(false)}
        footer={null}
      >
        <Title className="modal-title" level={2}>Editar Ficha</Title>
        <CreateFicha form={form2} funcEditing={onEditFinish} />
      </Modal>
    </>
  );
}

export default SearchFicha;
