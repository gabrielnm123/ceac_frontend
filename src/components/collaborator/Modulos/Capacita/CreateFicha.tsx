import React from "react";
import { Form, Input, Button, Select, DatePicker, Checkbox, Typography, message } from 'antd';
import MaskedInput from 'antd-mask-input';
import axiosInstance from "../../../../services/axiosInstance";
import authenticationVerify from "../../../../services/authenticationVerify";
import '../../css/CreateFicha.css';

const { Option } = Select;
const { Title } = Typography;

const CreateFicha: React.FC = () => {
  authenticationVerify('/login');

  const onFinish = async (values: any) => {
    try {
      const response = await axiosInstance.post('capacita/fichas/', values);
      message.success('Ficha criado com sucesso!');
    } catch (error) {
      message.error('Erro ao criar ficha, tente novamente.');
    }
  };

  return (
    <div className="create-ficha">
      <Form className="form-create-ficha" onFinish={onFinish} layout="vertical">
        <Form.Item label="Nome Completo" name="nome_completo" rules={[{ required: true, message: 'Por favor, insira o nome completo' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="CPF" name="cpf" rules={[{ required: true, message: 'Por favor, insira o CPF' }]}>
          <MaskedInput mask="000.000.000-00" />
        </Form.Item>
        <Form.Item label="Gênero" name="genero" rules={[{ required: true, message: 'Por favor, selecione o gênero' }]}>
          <Select>
            <Option value="M">Masculino</Option>
            <Option value="F">Feminino</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Data de Nascimento" name="data_nascimento" rules={[{ required: true, message: 'Por favor, selecione a data de nascimento' }]}>
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item label="Escolaridade" name="escolaridade" rules={[{ required: true, message: 'Por favor, selecione a escolaridade' }]}>
          <Select>
            <Option value="fundamental">Ensino Fundamental</Option>
            <Option value="medio">Ensino Médio</Option>
            <Option value="graduacao">Graduação</Option>
            <Option value="pos_graduacao">Pós-Graduação</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Atividade" name="atividade" rules={[{ required: true, message: 'Por favor, insira a atividade' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Endereço Residencial" name="endereco" rules={[{ required: true, message: 'Por favor, insira o endereço' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Complemento" name="complemento">
          <Input />
        </Form.Item>
        <Form.Item label="Bairro" name="bairro" rules={[{ required: true, message: 'Por favor, insira o bairro' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="CEP" name="cep" rules={[{ required: true, message: 'Por favor, insira o CEP' }]}>
          <MaskedInput mask="00000-000" />
        </Form.Item>
        <Form.Item label="UF" name="uf" rules={[{ required: true, message: 'Por favor, selecione o estado' }]}>
          <Select>
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
        <Form.Item label="Contato" name="contato" rules={[{ required: true, message: 'Por favor, insira o contato' }]}>
          <MaskedInput mask="(00) 0.0000-0000" />
        </Form.Item>
        <Form.Item label="E-mail" name="email" rules={[{ required: true, message: 'Por favor, insira o e-mail' }, { type: 'email', message: 'Por favor, insira um e-mail válido' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Interesse em ter negócio" name="interesse_ter_negocio" rules={[{ required: true, message: 'Por favor, selecione' }]}>
          <Select>
            <Option value="s">Sim</Option>
            <Option value="n">Não</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Preferência de Aula" name="preferencia_aula" rules={[{ required: true, message: 'Por favor, selecione' }]}>
          <Select>
            <Option value="online">Online</Option>
            <Option value="presencial">Presencial</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Meio de Comunicação para Aula" name="meio_comunicacao_aula" rules={[{ required: true, message: 'Por favor, selecione' }]}>
          <Select>
            <Option value="whatsapp">WhatsApp</Option>
            <Option value="email">Email</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Condições de Assistir Aulas Online" name="assistir_online" rules={[{ required: true, message: 'Por favor, selecione' }]}>
          <Select>
            <Option value="s">Sim</Option>
            <Option value="n">Não</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Por onde assistiria as aulas online" name="if_true_assistir_casa">
          <Select>
            <Option value="computador">Computador</Option>
            <Option value="celular">Celular</Option>
            <Option value="tablet">Tablet</Option>
            <Option value="outro">Outro</Option>
          </Select>
        </Form.Item>
        <Title level={2}>Dados Pessoa Jurídica</Title>
        <Form.Item label="Nome Fantasia" name="nome_fantasia">
          <Input />
        </Form.Item>
        <Form.Item label="CNPJ" name="cnpj">
          <MaskedInput mask="00.000.000/0000-00" />
        </Form.Item>
        <Form.Item label="Situação da Empresa" name="situacao_empresa">
          <Select>
            <Option value="ativa">Ativa</Option>
            <Option value="n_ativa">Não Ativa</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Porte da Empresa" name="porte_empresa">
          <Select>
            <Option value="MEI">Microempreendedor Individual (MEI)</Option>
            <Option value="ME">Microempresa (ME)</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Data de Abertura" name="data_abertura">
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item label="CNAE Principal" name="cnae_principal">
          <Input />
        </Form.Item>
        <Form.Item label="Setor" name="setor">
          <Select>
            <Option value="comercio">Comércio</Option>
            <Option value="servico">Serviço</Option>
            <Option value="agronegocios">Agronegócios</Option>
            <Option value="industria">Indústria</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Tipo de Vínculo" name="tipo_vinculo">
          <Select>
            <Option value="representante">Representante</Option>
            <Option value="responsavel">Responsável</Option>
          </Select>
        </Form.Item>
        <Title level={2}>Módulos de Capacitação</Title>
        <Form.Item name="modulo_marketing" valuePropName="checked">
          <Checkbox>Marketing (Como dominar o mercado digital)</Checkbox>
        </Form.Item>
        <Form.Item name="modulo_financeiro" valuePropName="checked">
          <Checkbox>Financeiro (Domine o fluxo de caixa de sua empresa)</Checkbox>
        </Form.Item>
        <Form.Item name="modulo_planejamento" valuePropName="checked">
          <Checkbox>Planejamento (Modelo de negócio que funciona, aprenda a fazer o seu)</Checkbox>
        </Form.Item>
        <Form.Item name="modulo_outros" valuePropName="checked">
          <Checkbox>Outros</Checkbox>
        </Form.Item>
        <Title level={2}>Declarações e Autorizações</Title>
        <Form.Item name="responsabilizacao" valuePropName="checked">
          <Checkbox>Declaro estar CIENTE de que sou plenamente responsável pela veracidade das informações aqui prestadas...</Checkbox>
        </Form.Item>
        <Form.Item name="manejo_dados" valuePropName="checked">
          <Checkbox>Declaro estar CIENTE de que, em razão da parceria com o SEBRAE...</Checkbox>
        </Form.Item>
        <Form.Item name="armazenamento_dados" valuePropName="checked">
          <Checkbox>DECLARO estar CIENTE quanto ao armazenamento dos meus dados...</Checkbox>
        </Form.Item>
        <Form.Item name="autorizacao" valuePropName="checked">
          <Checkbox>AUTORIZO ao SEBRAE o armazenamento e a utilização dos meus dados...</Checkbox>
        </Form.Item>
        <Form.Item name="comunicacao" rules={[{ required: true, message: 'Por favor, selecione' }]}>
          <Checkbox.Group>
            <Checkbox value="s">Sim, eu concordo.</Checkbox>
            <Checkbox value="n">Não, eu não concordo.</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Criar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateFicha;
