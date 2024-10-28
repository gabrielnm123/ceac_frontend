import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, DatePicker, Typography, message, Checkbox, Popconfirm } from 'antd';
import MaskedInput from 'antd-mask-input';
import axios from 'axios';
import axiosInstance from "../../../../services/axiosInstance";
import '../../css/CreateFicha.css';
import modulosCapacitaType from "../../types/modulosCapacita";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { logout } from "../../menuItems/itemUser";
import { useNavigate } from "react-router-dom";
import createFichaProps from "../../types/createFichaProps";
import { isCPF, isCNPJ, isPhone, isCEP } from 'brazilian-values';

const { Option } = Select;
const { Title, Text } = Typography;

const CreateFicha: React.FC<createFichaProps> = (props) => {
  if (props.form) {
    var form = props.form;
  } else {
    var [form] = Form.useForm();
  }
  const [getIsOnline, setIsOnline] = useState<boolean>(form.getFieldsValue().assistir_online === 'S');
  const [getIsPJRequired, setIsPJRequired] = useState<boolean>(false);
  const [getModulosCapacita, setModulosCapacita] = useState<Array<modulosCapacitaType> | []>([])
  const navigate = useNavigate();

  useEffect(() => {
    if (props.form && form.getFieldsValue().nome_fantasia) {
      setIsPJRequired(true);
    }
    axiosInstance.get('capacita/modulos_capacita/')
      .then(response => {
        setModulosCapacita(response.data)
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          logout();
          navigate('/colaborador/login');
        } else message.error('Erro ao carregar os módulos da capacitação, recarregue a página.');
      })
  }, [])

  const isValidCPF = (cpf: string) => {
    if (typeof cpf === 'string') { cpf = cpf.replace(/\D/g, '') } else return false;
    return isCPF(cpf);
  };

  const isValidCNPJ = (cnpj: string) => {
    if (typeof cnpj === 'string') {
      cnpj = cnpj.replace(/\D/g, '');
      isCNPJ(cnpj)
    } else return false
  };

  const isValidCNAE = (cnae: string) => {
    return typeof cnae === 'string' ? /^\d{7}$/.test(cnae.replace(/\D/g, '')) : false;
  };

  const isValidCelular = (celular: string) => {
    return typeof celular === 'string' ? /^\d{11}$/.test(celular.replace(/\D/g, '')) : false;
  };

  const isValidFixo = (fixo: string) => {
    return typeof fixo === 'string' ? /^\d{10}$/.test(fixo.replace(/\D/g, '')) : false;
  };

  const isValidCEP = (cep: string) => {
    return typeof cep === 'string' ? /^\d{8}$/.test(cep.replace(/\D/g, '')) : false;
  };

  const isValidInput = (input: string) => typeof input === 'string' && (input.trim() !== '' || input === '');

  const fetchAddressByCEP = (cep: string) => {
    return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        if (response.data.erro) {
          throw new Error('CEP não encontrado');
        }
        return response.data;
      })
      .catch((error) => {
        message.error('Erro ao buscar o endereço. Verifique o CEP.');
        return null;
      });
  };

  const handleCEPBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = typeof e.target.value === 'string' ? e.target.value.replace(/\D/g, '') : null;
    if (cep && cep.length === 8) {
      fetchAddressByCEP(cep)
        .then((addressData) => {
          if (addressData) {
            form.setFieldsValue({
              endereco: addressData.logradouro.toUpperCase(),
              bairro: addressData.bairro.toUpperCase(),
              uf: addressData.uf,
            });
          }
        })
    }
  };

  const handleAssistirCasa = (value: string) => {
    form.resetFields(['if_true_assistir_casa']);
    setIsOnline(value === 'S');
  }

  const handlePJFieldChange = (e: CheckboxChangeEvent) => {
    const PJFields: Array<string> = [
      'nome_fantasia',
      'cnpj',
      'situacao_empresa',
      'porte_empresa',
      'data_abertura',
      'cnae_principal',
      'setor',
      'tipo_vinculo'
    ];
    form.resetFields(PJFields);
    setIsPJRequired(e.target.checked);
  };

  const onFinish = () => {
    const values = form.getFieldsValue()
    Object.entries(values).forEach(([key, value]) => {
      if (!value || value === '__.___.___/____-__' || value === '(__) ____-____' || (typeof value === 'string' && value.trim() === '')) {
        values[key] = null
      } else if (typeof value === 'string') {
        values[key] = value.trim()
      }
    });
    if (values.data_nascimento) values.data_nascimento = values.data_nascimento.format('YYYY-MM-DD');
    if (values.data_abertura) values.data_abertura = values.data_abertura.format('YYYY-MM-DD');

    values.cpf = typeof values.cpf === 'string' ? values.cpf.replace(/\D/g, '') : null;
    values.cnae_principal = typeof values.cnae_principal === 'string' ? values.cnae_principal.replace(/\D/g, '') : null;
    values.celular = typeof values.celular === 'string' ? values.celular.replace(/\D/g, '') : null;
    if (values.cnpj) values.cnpj = typeof values.cnpj === 'string' ? values.cnpj.replace(/\D/g, '') : null;
    if (values.fixo) values.fixo = typeof values.fixo === 'string' ? values.fixo.replace(/\D/g, '') : null;
    values.cep = typeof values.cep === 'string' ? values.cep.replace(/\D/g, '') : null;
    if (values.cnae_principal) values.cnae_principal = typeof values.cnae_principal === 'string' ? values.cnae_principal.replace(/\D/g, '') : null;

    if (!isValidCPF(values.cpf)) {
      message.error('CPF inválido');
      return null;
    }

    if (!isValidCNPJ(values.cnpj) && getIsPJRequired) {
      message.error('CNPJ inválido');
      return null;
    }

    if (!isValidCNAE(values.cnae_principal) && getIsPJRequired) {
      message.error('CNAE deve conter exatamente 7 dígitos');
      return null;
    }

    if (!isValidCelular(values.celular) && values.celular !== null) {
      message.error('Celular deve conter exatamente 11 dígitos');
      return null;
    }
    if (!isValidFixo(values.fixo) && values.fixo !== null) {
      message.error('Telefone fixo deve conter exatamente 10 dígitos');
      return null;
    }

    if (!isValidCEP(values.cep)) {
      message.error('CEP deve conter exatamente 8 dígitos');
      return null;
    }

    if (values.comunicacao) {
      values.comunicacao = values.comunicacao === 'Sim, eu concordo.' ? 'S' : 'N';
    }
    if (props.funcEditing) {
      props.funcEditing(values);
    } else {
      axiosInstance.post('capacita/fichas/', values)
        .then(() => {
          message.success('Ficha criada com sucesso!');
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            logout();
            navigate('/colaborador/login');
          } else message.error('Erro ao criar ficha, tente novamente.');
        })
    }
  };

  return (
    <Form className="form-create-ficha" onFinish={onFinish} layout="vertical" form={form}>
      <div className="form-create-ficha-partes">
        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="Nome Completo"
          name="nome_completo"
          rules={[{ required: true, message: 'Por favor, insira o nome completo' },
          {
            validator: (_, value) => {
              if (!isValidInput(value)) {
                return Promise.reject(new Error('Por favor, insira o nome completo'))
              }
              return Promise.resolve()
            }
          }
          ]}
        >
          <Input onChange={(e) => form.setFieldsValue({ nome_completo: e.target.value.toUpperCase() })} allowClear />
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="CPF"
          name="cpf"
          rules={[
            { required: true, message: 'Por favor, insira o CPF' },
            {
              validator: (_, value) => {
                if (!isValidCPF(value)) {
                  return Promise.reject(new Error('CPF inválido'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <MaskedInput mask="000.000.000-00" allowClear />
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="Gênero"
          name="genero"
          rules={[{ required: true, message: 'Por favor, selecione o gênero' }]}
        >
          <Select showSearch className="form-create-ficha-select" allowClear>
            <Option value="M">MASCULINO</Option>
            <Option value="F">FEMININO</Option>
          </Select>
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="Data de Nascimento"
          name="data_nascimento"
          rules={[{ required: true, message: 'Por favor, selecione a data de nascimento' }]}
        >
          <DatePicker format="DD/MM/YYYY" allowClear />
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="Escolaridade"
          name="escolaridade"
          rules={[{ required: true, message: 'Por favor, selecione a escolaridade' }]}
        >
          <Select showSearch className="form-create-ficha-select" allowClear>
            <Option value="FUNDAMENTAL">ENSINO FUNDAMENTAL</Option>
            <Option value="MEDIO">ENSINO MÉDIO</Option>
            <Option value="GRADUACAO">GRADUAÇÃO</Option>
            <Option value="POS_GRADUACAO">PÓS-GRADUAÇÃO</Option>
          </Select>
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="Atividade"
          name="atividade"
          rules={[{ required: true, message: 'Por favor, selecione a atividade' }]}
        >
          <Select showSearch className="form-create-ficha-select" allowClear>
            <Option value="ARTESANATO">ARTESANATO</Option>
            <Option value="AGRICULTURA_URBANA">AGRICULTURA URBANA</Option>
            <Option value="COMERCIO">COMÉRCIO</Option>
            <Option value="ESTETICA_E_BELEZA">ESTÉTICA E BELEZA</Option>
            <Option value="GASTRONOMIA">GASTRONOMIA</Option>
            <Option value="INDUSTRIA">INDÚSTRIA</Option>
            <Option value="SERVICO">SERVIÇO</Option>
          </Select>
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="CEP"
          name="cep"
          rules={[
            { required: true, message: 'Por favor, insira o CEP' },
            {
              validator: (_, value) => {
                if (!isValidCEP(value)) {
                  return Promise.reject(new Error('CEP inválido'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <MaskedInput mask="00000-000" onBlur={handleCEPBlur} allowClear />
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="Endereço Residencial"
          name="endereco"
          rules={[{ required: true, message: 'Por favor, insira o endereço' }, {
            validator: (_, value) => {
              if (!isValidInput(value)) {
                return Promise.reject('Por favor, insira o endereço');
              }
              return Promise.resolve();
            }
          }]}
        >
          <Input onChange={(e) => form.setFieldsValue({ endereco: e.target.value.toUpperCase() })} allowClear />
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item" label="Complemento" name="complemento">
          <Input onChange={(e) => { if (e.target.value) { form.setFieldsValue({ complemento: e.target.value.toUpperCase() }) } }} allowClear />
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="Bairro"
          name="bairro"
          rules={[{ required: true, message: 'Por favor, insira o bairro' }, {
            validator: (_, value) => {
              if (!isValidInput(value)) {
                return Promise.reject('Por favor, insira o bairro')
              }
              return Promise.resolve()
            }
          }]}
        >
          <Input onChange={(e) => form.setFieldsValue({ bairro: e.target.value.toUpperCase() })} allowClear />
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="UF"
          name="uf"
          rules={[{ required: true, message: 'Por favor, selecione o estado' }]}
        >
          <Select showSearch className="form-create-ficha-select" allowClear>
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

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="Celular"
          name="celular"
          rules={[
            { required: true, message: 'Por favor, insira o número de celular' },
            {
              validator: (_, value) => {
                if (!isValidCelular(value)) {
                  return Promise.reject(new Error('Celular inválido'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <MaskedInput mask="(00) 0 0000-0000" allowClear />
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="Telefone Fixo"
          name="fixo"
          rules={[
            {
              validator: (_, value) => {
                if (typeof value === 'string' && value.trim()) {
                  if (!isValidFixo(value)) {
                    return Promise.reject(new Error('Telefone fixo inválido'));
                  }
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <MaskedInput mask="(00) 0000-0000" allowClear />
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="E-mail"
          name="email"
          rules={[
            { required: true, message: 'Por favor, insira o e-mail' },
            { type: 'email', message: 'Por favor, insira um e-mail válido' },
          ]}
        >
          <Input onChange={(e) => form.setFieldsValue({ email: e.target.value.toLowerCase() })} allowClear />
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="Interesse em ter negócio"
          name="interesse_ter_negocio"
          rules={[{ required: true, message: 'Por favor, selecione' }]}
        >
          <Select showSearch className="form-create-ficha-select" allowClear>
            <Option value="S">SIM</Option>
            <Option value="N">NÃO</Option>
          </Select>
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="Preferência de Aula"
          name="preferencia_aula"
          rules={[{ required: true, message: 'Por favor, selecione' }]}
        >
          <Select showSearch className="form-create-ficha-select" allowClear>
            <Option value="ONLINE">ONLINE</Option>
            <Option value="PRESENCIAL">PRESENCIAL</Option>
          </Select>
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="Meio de Comunicação para Aula"
          name="meio_comunicacao_aula"
          rules={[{ required: true, message: 'Por favor, selecione' }]}
        >
          <Select showSearch className="form-create-ficha-select" allowClear>
            <Option value="WHATSAPP">WHATSAPP</Option>
            <Option value="EMAIL">EMAIL</Option>
          </Select>
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="Condições de Assistir Aulas Online"
          name="assistir_online"
          rules={[{ required: true, message: 'Por favor, selecione' }]}
        >
          <Select showSearch className="form-create-ficha-select" onChange={handleAssistirCasa} allowClear>
            <Option value="S">SIM</Option>
            <Option value="N">NÃO</Option>
          </Select>
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="Por onde assistiria as aulas online"
          name="if_true_assistir_casa"
          rules={[
            {
              required: getIsOnline,
              message: 'Por favor, selecione por onde assistiria as aulas online',
            },
          ]}
        >
          <Select showSearch className="form-create-ficha-select" disabled={!getIsOnline} allowClear>
            <Option value="COMPUTADOR">COMPUTADOR</Option>
            <Option value="CELULAR">CELULAR</Option>
            <Option value="TABLET">TABLET</Option>
            <Option value="OUTRO">OUTRO</Option>
          </Select>
        </Form.Item>

      </div>
      <Title className="form-create-ficha-title" level={2}>Dados Pessoa Jurídica</Title>
      <div className="form-create-ficha-title">
        <Checkbox checked={getIsPJRequired} className='form-create-ficha-checkbox-juridica' onChange={handlePJFieldChange} />
        <Text type="warning">
          Marque a caixa ao lado se for preencher os dados jurídicos
        </Text>
      </div>
      <div className="form-create-ficha-partes">
        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="Nome Fantasia"
          name="nome_fantasia"
          rules={[{ required: getIsPJRequired, message: 'Por favor, insira o nome fantasia' },
          {
            validator: (_, value) => {
              if (!isValidInput(value) && getIsPJRequired) {
                return Promise.reject('Por favor, insira o nome fantasia');
              }
              return Promise.resolve();
            }
          }
          ]}
        >
          <Input disabled={!getIsPJRequired} allowClear />
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="CNPJ"
          name="cnpj"
          rules={[{ required: getIsPJRequired, message: 'Por favor, insira o CNPJ' },
          {
            validator: (_, value) => {
              if (getIsPJRequired && value) {
                if (!isValidCNPJ(value)) {
                  return Promise.reject(new Error('CNPJ inválido'));
                }
              }
              return Promise.resolve();
            },
          },
          ]}
        >
          <MaskedInput disabled={!getIsPJRequired} mask="00.000.000/0000-00" allowClear />
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="Situação da Empresa"
          name="situacao_empresa"
          rules={[{ required: getIsPJRequired, message: 'Por favor, selecione a situação da empresa' }]}
        >
          <Select showSearch disabled={!getIsPJRequired} className="form-create-ficha-select" allowClear>
            <Option value="ATIVA">ATIVA</Option>
            <Option value="N_ATIVA">NÃO ATIVA</Option>
          </Select>
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="Porte da Empresa"
          name="porte_empresa"
          rules={[{ required: getIsPJRequired, message: 'Por favor, selecione o porte da empresa' }]}
        >
          <Select showSearch disabled={!getIsPJRequired} className="form-create-ficha-select" allowClear>
            <Option value="MEI">MICROEMPREENDEDOR INDIVIDUAL (MEI)</Option>
            <Option value="ME">MICROEMPRESA (ME)</Option>
          </Select>
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="Data de Abertura"
          name="data_abertura"
          rules={[{ required: getIsPJRequired, message: 'Por favor, selecione a data de abertura' },
          {
            validator: (_, value) => {
              if (getIsPJRequired && value) {
                if (typeof value === 'string' && value.replace(/\D/g, '').length !== 10) {
                  return Promise.reject(new Error('A data de abertura deve conter exatamente 8 dígitos numéricos'));
                }
              }
              return Promise.resolve();
            },
          },
          ]}
        >
          <DatePicker disabled={!getIsPJRequired} format="DD/MM/YYYY" allowClear />
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="CNAE Principal"
          name="cnae_principal"
          rules={[{ required: getIsPJRequired, message: 'Por favor, insira o CNAE Principal' },
          {
            validator: (_, value) => {
              if (getIsPJRequired && value) {
                if (!isValidCNAE(value)) {
                  return Promise.reject(new Error('CNAE inválido'));
                }
              }
              return Promise.resolve();
            },
          },
          ]}
        >
          <MaskedInput disabled={!getIsPJRequired} mask="0000-00/0" allowClear />
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="Setor"
          name="setor"
          rules={[{ required: getIsPJRequired, message: 'Por favor, selecione o setor' }]}
        >
          <Select showSearch disabled={!getIsPJRequired} className="form-create-ficha-select" allowClear>
            <Option value="COMERCIO">COMÉRCIO</Option>
            <Option value="SERVICO">SERVIÇO</Option>
            <Option value="AGRONEGOCIOS">AGRONEGÓCIOS</Option>
            <Option value="INDUSTRIA">INDÚSTRIA</Option>
          </Select>
        </Form.Item>

        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item"
          label="Tipo de Vínculo"
          name="tipo_vinculo"
          rules={[{ required: getIsPJRequired, message: 'Por favor, selecione o tipo de vínculo' }]}
        >
          <Select showSearch disabled={!getIsPJRequired} className="form-create-ficha-select" allowClear>
            <Option value="REPRESENTANTE">REPRESENTANTE</Option>
            <Option value="RESPONSAVEL">RESPONSÁVEL</Option>
          </Select>
        </Form.Item>
      </div>
      <Title className="form-create-ficha-title" level={2}>Módulos de Capacitação</Title>
      <div className="form-create-ficha-partes">
        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item" label="Selecione um Módulo" name="modulo_capacita" rules={[{ required: true, message: "Selecione um Módulo" }]}>
          <Select className="form-create-ficha-select" allowClear showSearch options={getModulosCapacita.map((modulo: modulosCapacitaType) => {
            return { value: modulo.id, label: modulo.nome }
          })} />
        </Form.Item>
      </div>
      <div className="form-create-ficha-button">
        <Form.Item validateTrigger="onBlur" className="form-create-ficha-item form-create-ficha-button" >
          {
            props.form ? <Popconfirm
              title="Tem certeza que deseja confirmar a edição"
              onConfirm={() => onFinish()}
              okText="Sim"
              cancelText="Não"
            >
              <Button type="primary">Editar</Button>
            </Popconfirm> : <Button type="primary" htmlType="submit">Criar</Button>
          }
        </Form.Item>
      </div>
    </Form>
  );
};

export default CreateFicha;
