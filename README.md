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

## Abaixo ignore

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
