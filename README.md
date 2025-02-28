# Projeto web_project_api_full

Este repositório contém o projeto web_project_api_full, composto por duas partes essenciais:

1. **Autorização e Registro de Usuário**
2. **Tratamento de Erros Centralizado e Implantação**

O projeto integra um back-end (NodeJS) e um front-end (React) com a seguinte estrutura:

```
.git
backend/
frontend/
README.md
```

---

## Índice

- [Descrição do Projeto](#descrição-do-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Parte I: Autorização e Registro de Usuário](#parte-i-autorização-e-registro-de-usuário)
- [Parte II: Configuração e Implantação](#parte-ii-configuração-e-implantação)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Notas Finais](#notas-finais)

---

## Descrição do Projeto

Este projeto tem como objetivo consolidar os conhecimentos de criação e autorização de usuários no servidor, conectando o cliente à API, e implementar um tratamento de erros centralizado para garantir a robustez da aplicação. Além disso, será realizada a implantação do projeto em um servidor na nuvem.

---

## Estrutura do Projeto

A organização do repositório deve ser a seguinte:

```
.git
backend/      # Código do servidor (NodeJS)
frontend/     # Aplicação cliente (React)
README.md     # Documentação do projeto
```

---

## Parte I: Autorização e Registro de Usuário

Nesta etapa, as seguintes funcionalidades devem ser implementadas:

1. **Adição de E-mail e Senha no Esquema de Usuário**

   - Incluir os campos `email` e `password` no modelo de usuário.
   - Validar o e-mail com o módulo [validator](https://www.npmjs.com/package/validator) e garantir que cada e-mail seja único.

2. **Atualização do Controlador `createUser`**

   - Incluir os campos `email` e `password` ao criar um usuário.
   - Hash das senhas antes de salvá-las no banco de dados.
   - Tornar os campos `name`, `about` e `avatar` opcionais, atribuindo valores padrão caso não sejam informados:
     - **name:** "Jacques Cousteau"
     - **about:** "Explorer"
     - **avatar:** (link padrão)

3. **Criação do Controlador `login`**

   - Autenticar o usuário utilizando e-mail e senha.
   - Gerar um JSON Web Token (JWT) com expiração de uma semana. O token deve conter apenas o campo `_id` do usuário:
     ```json
     {
       "_id": "d285e3dceed844f902650f40"
     }
     ```
   - Retornar o token no corpo da resposta ou, em caso de falha, retornar erro 401.

4. **Criação das Rotas para Login e Registro**
   - No arquivo `app.js`, rotas:
     ```js
     app.post("/signin", login);
     app.post("/signup", createUser);
     ```
5. **Implementação do Middleware de Autorização**

   - Verificar o token presente nos cabeçalhos das requisições.
   - Se o token for válido, anexar seu payload em `req.user` e chamar `next()`.
   - Em caso de token inválido, retornar erro 401.

6. **Rota para Obtenção dos Dados do Usuário**

   - Criar a rota:
     ```
     GET /users/me
     ```
     para retornar as informações do usuário autenticado.

7. **Proteção da API com Autorização**

   - Proteger todas as rotas, exceto `/signup` e `/signin`.
   - Usuários não autenticados devem receber erro 403 ao acessar rotas protegidas.

8. **Remoção do Middleware de Usuário Codificado**

   - Remover o middleware que atribuía um ID fixo ao `req.user` (utilizado em sprints anteriores).

9. **Verificação dos Direitos dos Usuários**

   - Impedir que um usuário edite ou exclua dados (cartões/perfis) de outros usuários.

10. **Impedir a Exposição do Hash da Senha**

    - Configurar o campo `password` no esquema de usuário com `select: false`.
    - Para autenticação, utilizar:
      ```js
      User.findOne({ email }).select("+password");
      ```

11. **Integração com o Front-End**
    - Armazenar o token recebido no `localStorage` e em uma variável de estado.
    - Atualizar o hook `useEffect` para verificar a existência do token.
    - Enviar o token nos cabeçalhos de todas as requisições à API (exceto para Login e Registro).

---

## Parte II: Configuração e Implantação

Nesta etapa, o foco é garantir a robustez e a disponibilidade da aplicação:

1. **Tratamento de Erros Centralizado**

   - Implementar um middleware para centralizar o tratamento de erros.
   - Retornar um erro 500 para erros imprevistos e padronizar as respostas de erro.
   - Desabilitar a regra ESLint `no-unused-vars` para o parâmetro `next` no arquivo `.eslintrc`:
     ```json
     "rules": {
       "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
     }
     ```

2. **Validação de Solicitações**

   - Utilizar o pacote [celebrate](https://www.npmjs.com/package/celebrate) com Joi para validar os corpos das requisições.
   - Para validação de URLs, usar `validator.isURL` como função customizada.

3. **Registro de Solicitações e Erros**

   - Salvar cada requisição no arquivo `request.log` e erros no arquivo `error.log`, ambos em formato JSON.
   - **Atenção:** Não inclua os arquivos de log no repositório.

4. **Conexão entre Back-End e Front-End**

   - Após compilar o front-end, copiar os arquivos da pasta `build` para o diretório `frontend/` do servidor.
   - Garantir que o diretório `.git` esteja somente na raiz do projeto.

5. **Implantação em Servidor na Nuvem**

   - Criar e configurar um servidor (ex.: Google Cloud) e implantar a API.
   - Garantir que a API esteja acessível pelo nome de domínio e que todas as funcionalidades estejam operacionais.

6. **Habilitar CORS**

   - Instalar o módulo `cors`:
     ```bash
     npm install cors
     ```
   - Configurar o CORS no back-end:
     ```js
     const cors = require("cors");
     app.use(cors());
     app.options("*", cors());
     ```

7. **Criação do Arquivo .env**

   - Criar um arquivo `.env` no servidor com as seguintes variáveis:
     ```
     NODE_ENV=production
     JWT_SECRET=sua_senha_secreta
     ```
   - **Importante:** O arquivo `.env` não deve ser versionado.

8. **Configuração de Domínio e Nginx**

   - Registrar um domínio (pode-se utilizar serviços gratuitos como o FreeDNS).
   - Configurar o Nginx para servir o front-end e redirecionar as requisições para a API (por exemplo, usando um subdomínio para o back-end).

9. **Certificados HTTPS**

   - Emitir e configurar certificados SSL para permitir conexões HTTPS seguras.

10. **Teste de Falha do Servidor**

    - Adicionar temporariamente a rota de teste de falha:
      ```js
      app.get("/crash-test", () => {
        setTimeout(() => {
          throw new Error("O servidor travará agora");
        }, 0);
      });
      ```
    - Utilizar o PM2 para reiniciar automaticamente o servidor em caso de falhas.
    - **Atenção:** Remova esta rota após a fase de testes.

11. **Informações de Acesso ao Servidor**
    - Atualize este README com o domínio do servidor para facilitar o acesso.

---

## Como Executar o Projeto

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/seu-usuario/web_project_api_full.git
   ```

2. **Configuração do Back-End**

   - Navegue até a pasta `backend/`:
     ```bash
     cd backend
     ```
   - Instale as dependências:
     ```bash
     npm install
     ```
   - Crie e configure o arquivo `.env` conforme as instruções acima.

3. **Configuração do Front-End**
   - Navegue até a pasta `frontend/` e realize o build da aplicação React.
   - Caso esteja implantando, copie o conteúdo da pasta `build` para o diretório `frontend/` no servidor.

## Tecnologias Utilizadas

- **Back-End:** Node.js, Express, MongoDB, Mongoose, JWT, Validator, Celebrate, CORS.
- **Front-End:** React.
- **Implantação:** Nginx, PM2, Google Cloud (ou outro provedor de nuvem).
- **Outras Ferramentas:** ESLint.
