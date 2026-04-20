# Around The U.S. — Full Stack

Aplicação full stack de rede social de fotos onde usuários se registram, fazem login e gerenciam cartões de lugares com curtidas. Projeto desenvolvido como parte do currículo da **TripleTen** (antigo Practicum).

---

## Funcionalidades

- Cadastro e autenticação de usuários com **JWT**
- Senhas criptografadas com **bcryptjs**
- Rotas protegidas por middleware de autorização
- CRUD de cartões (criar, curtir, excluir)
- Edição de perfil e avatar
- Validação de requisições com **Celebrate + Joi**
- Registro de logs de requisições e erros com **Winston**
- Tratamento centralizado de erros
- Integração completa front-end ↔ API REST

---

## Tecnologias

**Back-End**
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Celebrate / Joi
- Winston + express-winston
- CORS
- dotenv

**Front-End**
- React (Vite)
- React Router v6
- Context API
- LocalStorage para persistência de token

**Infraestrutura**
- Nginx (reverse proxy)
- PM2 (process manager)
- Google Cloud (servidor na nuvem)
- Certificado SSL/HTTPS

---

## Arquitetura

```
web_project_api_full/
├── backend/
│   ├── app.js              # Entry point, middlewares, rotas
│   ├── controllers/        # Lógica de users e cards
│   ├── models/             # Schemas Mongoose (User, Card)
│   ├── routes/             # Routers Express
│   ├── middlewares/        # Auth, logger, errorHandler
│   └── errors/             # Classes de erro customizadas
└── frontend/
    └── src/
        ├── components/     # Header, Main, cards, popups, auth
        ├── contexts/       # CurrentUserContext
        └── utils/          # api.js, auth.js, token.js
```

---

## Como rodar localmente

### Pré-requisitos

- Node.js >= 18
- MongoDB rodando localmente na porta `27017`

### Back-End

```bash
cd backend
npm install
```

Crie o arquivo `.env`:

```env
NODE_ENV=development
JWT_SECRET=seu_segredo_aqui
PORT=3000
```

```bash
npm run dev
```

### Front-End

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

---

## Variáveis de Ambiente (produção)

| Variável     | Descrição                          |
|--------------|------------------------------------|
| `NODE_ENV`   | `production` ou `development`      |
| `JWT_SECRET` | Chave secreta para assinar tokens  |
| `PORT`       | Porta do servidor (padrão: 3000)   |
| `MONGO_URI`  | URI de conexão ao MongoDB Atlas    |

---

## Demo

[https://web-project-api-full-ebon.vercel.app/](https://web-project-api-full-ebon.vercel.app/)

---

## Autor

**Alexandre Silva** — [GitHub](https://github.com/AlexandeSilva-Dev-Fullstack)
