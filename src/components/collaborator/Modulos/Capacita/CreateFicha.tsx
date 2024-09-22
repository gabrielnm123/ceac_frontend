import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, DatePicker, Checkbox, Typography, message } from 'antd';
import MaskedInput from 'antd-mask-input';
import axios from 'axios';
import axiosInstance from "../../../../services/axiosInstance";
import useAuthenticationVerify from "../../../../services/useAuthenticationVerify";
import '../../css/CreateFicha.css';
import modulosCapacitaType from "../../types/modulosCapacita";

const { Option } = Select;
const { Title } = Typography;

const CreateFicha: React.FC = () => {
  const [form] = Form.useForm();
  const [getIsOnline, setIsOnline] = useState<boolean>(false);
  const [getIsPJRequired, setIsPJRequired] = useState<boolean>(false);
  const [getModulosCapacita, setModulosCapacita] = useState<Array<modulosCapacitaType> | []>([])
  const [getTriggerAuth, setTriggerAuth] = useState<boolean>(true);

  useAuthenticationVerify('/login', getTriggerAuth);


  useEffect(() => {
    form.setFieldsValue({ if_true_assistir_casa: undefined });
  }, [getIsOnline]);

  axiosInstance.get('capacita/modulos_capacita/')
    .then(response => {
      setModulosCapacita(response.data)
    })
    .catch(error => {
      message.error('Erro ao atualizar os Módulos de Aprendizagem, atualize a página')
    })

  const handlePJFieldChange = () => {
    const pjFields = ['nome_fantasia', 'cnpj', 'situacao_empresa', 'porte_empresa', 'data_abertura', 'cnae_principal', 'setor', 'tipo_vinculo'];
    const isPJFilled = pjFields.some(field => form.getFieldValue(field));
    setIsPJRequired(isPJFilled);
  };

  const isValidCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /(\d)\1{10}/.test(cpf)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
  };

  const isValidCNPJ = (cnpj: string) => {
    cnpj = cnpj.replace(/\D/g, '');
    if (cnpj.length !== 14 || /(\d)\1{13}/.test(cnpj)) return false;
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(0))) return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    return resultado === parseInt(digitos.charAt(1));
  };

  const isValidCNAE = (cnae: string) => {
    return /^\d{7}$/.test(cnae.replace(/\D/g, ''));
  };

  const isValidCelular = (celular: string) => {
    return /^\d{11}$/.test(celular.replace(/\D/g, ''));
  };

  const isValidFixo = (fixo: string) => {
    return /^\d{10}$/.test(fixo.replace(/\D/g, ''));
  };

  const isValidCEP = (cep: string) => {
    return /^\d{8}$/.test(cep.replace(/\D/g, ''));
  };

  const fetchAddressByCEP = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        throw new Error('CEP não encontrado');
      }
      return response.data;
    } catch (error) {
      message.error('Erro ao buscar o endereço. Verifique o CEP.');
      return null;
    }
  };

  const onFinish = async (values: any) => {
    setTriggerAuth((prevTriggerAuth) => !prevTriggerAuth);
    if (values.data_nascimento) values.data_nascimento = values.data_nascimento.format('YYYY-MM-DD');
    if (values.data_abertura) values.data_abertura = values.data_abertura.format('YYYY-MM-DD');

    values.cpf = values.cpf.replace(/\D/g, '');
    values.celular = values.celular.replace(/\D/g, '');
    if (values.cnpj) values.cnpj = values.cnpj.replace(/\D/g, '');
    if (values.fixo) values.fixo = values.fixo.replace(/\D/g, '');
    values.cep = values.cep.replace(/\D/g, '');
    if (values.cnae_principal) values.cnae_principal = values.cnae_principal.replace(/\D/g, '');

    if (!isValidCPF(values.cpf)) {
      message.error('CPF inválido');
      return;
    }

    if (values.cnpj && !isValidCNPJ(values.cnpj)) {
      message.error('CNPJ inválido');
      return;
    }

    if (values.cnae_principal && !isValidCNAE(values.cnae_principal)) {
      message.error('CNAE deve conter exatamente 7 dígitos');
      return;
    }

    if (!isValidCelular(values.celular)) {
      message.error('Celular deve conter exatamente 11 dígitos');
      return;
    }

    if (values.fixo && !isValidFixo(values.fixo)) {
      message.error('Telefone fixo deve conter exatamente 10 dígitos');
      return;
    }

    if (!isValidCEP(values.cep)) {
      message.error('CEP deve conter exatamente 8 dígitos');
      return;
    }

    Object.keys(values).forEach(key => {
      if (values[key] === undefined || values[key] === '' || values[key] === null) {
        delete values[key];
      }
    });

    if (values.comunicacao) {
      values.comunicacao = values.comunicacao === 'Sim, eu concordo.' ? 'S' : 'N';
    }

    try {
      const response = await axiosInstance.post('capacita/fichas/', values);
      message.success('Ficha criada com sucesso!');
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorMsgs = Object.values(error.response.data).flat().join(', ');
        message.error(`Erro na criação da ficha: ${errorMsgs}`);
      } else {
        message.error('Erro ao criar ficha, tente novamente.');
      }
    }
  };

  const handleCEPBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      const addressData = await fetchAddressByCEP(cep);
      if (addressData) {
        form.setFieldsValue({
          endereco: addressData.logradouro.toUpperCase(),
          bairro: addressData.bairro.toUpperCase(),
          uf: addressData.uf,
        });
      }
    }
  };

  return (
    <div className="create-ficha">
      <Form className="form-create-ficha" onFinish={onFinish} layout="vertical" form={form}>
        <Form.Item
          label="Nome Completo"
          name="nome_completo"
          rules={[{ required: true, message: 'Por favor, insira o nome completo' }]}
        >
          <Input onChange={(e) => form.setFieldsValue({ nome_completo: e.target.value.toUpperCase() })} />
        </Form.Item>

        <Form.Item
          label="CPF"
          name="cpf"
          validateTrigger="onBlur"
          rules={[
            { required: true, message: 'Por favor, insira o CPF' },
            {
              validator: (_, value) => {
                if (value && value.replace(/\D/g, '').length !== 11) {
                  return Promise.reject(new Error('O CPF deve conter exatamente 11 dígitos numéricos'));
                }
                if (value && !isValidCPF(value)) {
                  return Promise.reject(new Error('CPF inválido'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <MaskedInput mask="000.000.000-00" />
        </Form.Item>

        <Form.Item
          label="Gênero"
          name="genero"
          rules={[{ required: true, message: 'Por favor, selecione o gênero' }]}
        >
          <Select>
            <Option value="M">MASCULINO</Option>
            <Option value="F">FEMININO</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Data de Nascimento"
          name="data_nascimento"
          rules={[{ required: true, message: 'Por favor, selecione a data de nascimento' }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="Escolaridade"
          name="escolaridade"
          rules={[{ required: true, message: 'Por favor, selecione a escolaridade' }]}
        >
          <Select>
            <Option value="FUNDAMENTAL">ENSINO FUNDAMENTAL</Option>
            <Option value="MEDIO">ENSINO MÉDIO</Option>
            <Option value="GRADUACAO">GRADUAÇÃO</Option>
            <Option value="POS_GRADUACAO">PÓS-GRADUAÇÃO</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Atividade"
          name="atividade"
          rules={[{ required: true, message: 'Por favor, selecione a atividade' }]}
        >
          <Select>
            <Option value="ARTESANATO">ARTESANATO</Option>
            <Option value="AGRICULTURA_URBANA">AGRICULTURA URBANA</Option>
            <Option value="COMERCIO">COMÉRCIO</Option>
            <Option value="ESTETICA_E_BELEZA">ESTÉTICA E BELEZA</Option>
            <Option value="GASTRONOMIA">GASTRONOMIA</Option>
            <Option value="INDUSTRIA">INDÚSTRIA</Option>
            <Option value="SERVICO">SERVIÇO</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="CEP"
          name="cep"
          rules={[
            { required: true, message: 'Por favor, insira o CEP' },
            {
              validator: (_, value) => {
                if (value && value.replace(/\D/g, '').length !== 8) {
                  return Promise.reject(new Error('O CEP deve conter exatamente 8 dígitos numéricos'));
                }
                if (value && !isValidCEP(value)) {
                  return Promise.reject(new Error('CEP inválido'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <MaskedInput mask="00000-000" onBlur={handleCEPBlur} />
        </Form.Item>

        <Form.Item
          label="Endereço Residencial"
          name="endereco"
          rules={[{ required: true, message: 'Por favor, insira o endereço' }]}
        >
          <Input onChange={(e) => form.setFieldsValue({ endereco: e.target.value.toUpperCase() })} />
        </Form.Item>

        <Form.Item label="Complemento" name="complemento">
          <Input onChange={(e) => form.setFieldsValue({ complemento: e.target.value.toUpperCase() })} />
        </Form.Item>

        <Form.Item
          label="Bairro"
          name="bairro"
          rules={[{ required: true, message: 'Por favor, insira o bairro' }]}
        >
          <Input onChange={(e) => form.setFieldsValue({ bairro: e.target.value.toUpperCase() })} />
        </Form.Item>

        <Form.Item
          label="UF"
          name="uf"
          rules={[{ required: true, message: 'Por favor, selecione o estado' }]}
        >
          <Select>
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

        <Form.Item
          label="Celular"
          name="celular"
          rules={[
            { required: true, message: 'Por favor, insira o número de celular' },
            {
              validator: (_, value) => {
                if (value && value.replace(/\D/g, '').length !== 11) {
                  return Promise.reject(new Error('O celular deve conter exatamente 11 dígitos numéricos'));
                }
                if (value && !isValidCelular(value)) {
                  return Promise.reject(new Error('Celular inválido'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <MaskedInput mask="(00) 0 0000-0000" />
        </Form.Item>

        <Form.Item
          label="Telefone Fixo"
          name="fixo"
          rules={[
            {
              validator: (_, value) => {
                if (value && value.replace(/\D/g, '').length !== 10) {
                  return Promise.reject(new Error('O telefone fixo deve conter exatamente 10 dígitos numéricos'));
                }
                if (value && !isValidFixo(value)) {
                  return Promise.reject(new Error('Telefone fixo inválido'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <MaskedInput mask="(00) 0000-0000" />
        </Form.Item>

        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            { required: true, message: 'Por favor, insira o e-mail' },
            { type: 'email', message: 'Por favor, insira um e-mail válido' },
          ]}
        >
          <Input onChange={(e) => form.setFieldsValue({ email: e.target.value.toLowerCase() })} />
        </Form.Item>

        <Form.Item
          label="Interesse em ter negócio"
          name="interesse_ter_negocio"
          rules={[{ required: true, message: 'Por favor, selecione' }]}
        >
          <Select>
            <Option value="S">SIM</Option>
            <Option value="N">NÃO</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Preferência de Aula"
          name="preferencia_aula"
          rules={[{ required: true, message: 'Por favor, selecione' }]}
        >
          <Select>
            <Option value="ONLINE">ONLINE</Option>
            <Option value="PRESENCIAL">PRESENCIAL</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Meio de Comunicação para Aula"
          name="meio_comunicacao_aula"
          rules={[{ required: true, message: 'Por favor, selecione' }]}
        >
          <Select>
            <Option value="WHATSAPP">WHATSAPP</Option>
            <Option value="EMAIL">EMAIL</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Condições de Assistir Aulas Online"
          name="assistir_online"
          rules={[{ required: true, message: 'Por favor, selecione' }]}
        >
          <Select
            onChange={(value) => setIsOnline(value === 'S')}
          >
            <Option value="S">SIM</Option>
            <Option value="N">NÃO</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Por onde assistiria as aulas online"
          name="if_true_assistir_casa"
          rules={[
            {
              required: getIsOnline,
              message: 'Por favor, selecione por onde assistiria as aulas online',
            },
          ]}
        >
          <Select disabled={!getIsOnline}>
            <Option value="COMPUTADOR">COMPUTADOR</Option>
            <Option value="CELULAR">CELULAR</Option>
            <Option value="TABLET">TABLET</Option>
            <Option value="OUTRO">OUTRO</Option>
          </Select>
        </Form.Item>

        <Title level={2}>Dados Pessoa Jurídica</Title>
        <Form.Item
          label="Nome Fantasia"
          name="nome_fantasia"
          rules={[{ required: getIsPJRequired, message: 'Por favor, insira o nome fantasia' }]}
        >
          <Input onChange={handlePJFieldChange} />
        </Form.Item>

        <Form.Item
          label="CNPJ"
          name="cnpj"
          rules={[
            { required: getIsPJRequired, message: 'Por favor, insira o CNPJ' },
            {
              validator: (_, value) => {
                if (value && value.replace(/\D/g, '').length !== 14) {
                  return Promise.reject(new Error('O CNPJ deve conter exatamente 14 dígitos numéricos'));
                }
                if (value && !isValidCNPJ(value)) {
                  return Promise.reject(new Error('CNPJ inválido'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <MaskedInput mask="00.000.000/0000-00" onChange={handlePJFieldChange} />
        </Form.Item>

        <Form.Item
          label="Situação da Empresa"
          name="situacao_empresa"
          rules={[{ required: getIsPJRequired, message: 'Por favor, selecione a situação da empresa' }]}
        >
          <Select onChange={handlePJFieldChange}>
            <Option value="ATIVA">ATIVA</Option>
            <Option value="N_ATIVA">NÃO ATIVA</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Porte da Empresa"
          name="porte_empresa"
          rules={[{ required: getIsPJRequired, message: 'Por favor, selecione o porte da empresa' }]}
        >
          <Select onChange={handlePJFieldChange}>
            <Option value="MEI">MICROEMPREENDEDOR INDIVIDUAL (MEI)</Option>
            <Option value="ME">MICROEMPRESA (ME)</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Data de Abertura"
          name="data_abertura"
          rules={[
            { required: getIsPJRequired, message: 'Por favor, selecione a data de abertura' },
            {
              validator: (_, value) => {
                if (value && value.replace(/\D/g, '').length !== 10) {
                  return Promise.reject(new Error('A data de abertura deve conter exatamente 10 dígitos numéricos'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" onChange={handlePJFieldChange} />
        </Form.Item>

        <Form.Item
          label="CNAE Principal"
          name="cnae_principal"
          rules={[
            { required: getIsPJRequired, message: 'Por favor, insira o CNAE Principal' },
            {
              validator: (_, value) => {
                if (value && value.replace(/\D/g, '').length !== 7) {
                  return Promise.reject(new Error('O CNAE deve conter exatamente 7 dígitos numéricos'));
                }
                if (value && !isValidCNAE(value)) {
                  return Promise.reject(new Error('CNAE inválido'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input onChange={handlePJFieldChange} />
        </Form.Item>

        <Form.Item
          label="Setor"
          name="setor"
          rules={[{ required: getIsPJRequired, message: 'Por favor, selecione o setor' }]}
        >
          <Select onChange={handlePJFieldChange}>
            <Option value="COMERCIO">COMÉRCIO</Option>
            <Option value="SERVICO">SERVIÇO</Option>
            <Option value="AGRONEGOCIOS">AGRONEGÓCIOS</Option>
            <Option value="INDUSTRIA">INDÚSTRIA</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Tipo de Vínculo"
          name="tipo_vinculo"
          rules={[{ required: getIsPJRequired, message: 'Por favor, selecione o tipo de vínculo' }]}
        >
          <Select onChange={handlePJFieldChange}>
            <Option value="REPRESENTANTE">REPRESENTANTE</Option>
            <Option value="RESPONSAVEL">RESPONSÁVEL</Option>
          </Select>
        </Form.Item>
        <Title level={2}>Módulos de Capacitação</Title>
        <Form.Item label="Selecione um Módulo" name="modulo_capacita" rules={[{ required: true, message: "Selecione um Módulo" }]}>
          <Select allowClear showSearch options={getModulosCapacita.map((modulo: modulosCapacitaType) => {
            return { value: modulo.id, label: modulo.nome }
          })} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Criar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateFicha;
