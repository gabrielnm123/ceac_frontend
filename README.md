# ceac_frontend

Frontend para a comunidade se cadastrar em cursos da ONG CEAC (Centro Estudantil de Ação Cultural).

## Descrição

O **ceac_frontend** é um sistema para gerenciar cadastros e inscrições em cursos oferecidos pela ONG CEAC. O projeto foi desenvolvido utilizando React, TypeScript, Webpack e Ant Design, garantindo uma interface responsiva e intuitiva.

## Funcionalidades

- Cadastro e autenticação de usuários.
- Visualização e inscrição em cursos.
- Integração com APIs para gerenciamento de dados.
- Interface responsiva e intuitiva.

## Tecnologias Utilizadas

- **React** e **ReactDOM**
- **TypeScript**
- **Webpack**
- **Ant Design (antd)**
- **Axios**
- **React Router DOM**

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/gabrielnm123/ceac_frontend.git
   ```

2. **Acesse o diretório do projeto:**

   ```bash
   cd ceac_frontend
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   ```

   ou

   ```bash
   yarn install
   ```

## Execução

Para iniciar a aplicação em ambiente de desenvolvimento, utilize:

```bash
npm start
```

ou

```bash
yarn start
```

A aplicação será servida em `http://localhost:3000`.

## Estrutura do Projeto

```project structure
ceac_frontend/
├── LICENSE
├── README.md
├── declarations.d.ts
├── node_modules/
├── package-lock.json
├── package.json
├── public/
├── src/
├── tsconfig.json
└── webpack.config.js
```

## Próximas Tarefas

### Refatorar o Acesso às Variáveis do localStorage

**Contexto:**  
Atualmente, várias variáveis importantes (como dados de usuário, configurações, etc.) são acessadas diretamente no `localStorage`, permitindo que o usuário modifique esses valores livremente. Essa abordagem pode comprometer a integridade dos dados e dificultar a manutenção do sistema.

**Objetivo:**  
Implementar uma estratégia centralizada para gerenciar o acesso às variáveis do `localStorage`, garantindo que:

- O acesso a esses dados seja feito de forma controlada e padronizada.
- Seja possível implementar medidas de segurança (como criptografia ou validação) para evitar alterações indevidas pelo usuário.
- A lógica de leitura e escrita esteja concentrada em um único módulo, facilitando futuras alterações e manutenção.

**Estratégia Sugerida:**  

- Criar um módulo ou hook customizado que encapsule as operações de leitura, gravação e remoção no `localStorage`.
- Esse módulo deverá expor métodos que permitam acessar os dados de forma segura, sem permitir acesso direto às variáveis armazenadas.
- Estender essa estratégia para todas as variáveis atualmente manipuladas diretamente via `localStorage`.

**Benefícios:**  

- **Segurança:** Reduz a possibilidade de o usuário alterar valores críticos diretamente.
- **Centralização:** Facilita a manutenção e atualização da lógica de acesso aos dados.
- **Consistência:** Garante que todas as variáveis sejam gerenciadas de maneira padronizada em toda a aplicação.

## Licença

Distribuído sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.

## Contato

**Gabriel Nunes**  
[GitHub](https://github.com/gabrielnm123)
