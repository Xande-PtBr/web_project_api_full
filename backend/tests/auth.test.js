const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const request = supertest(app);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_TEST_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Testes de autenticação", () => {
  test("Deve registrar um novo usuário", async () => {
    const response = await request.post("/signup").send({
      email: "test1@example.com",
      password: "password123",
      name: "Test User",
    });

    expect(response.status).toBe(201);
    expect(response.body.email).toBe("test1@example.com");
  });

  test("Deve fazer no login com credenciais erradas", async () => {
    const response = await request.post("/signin").send({
      email: "wrong@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
  });

  test("Deve logar com sucesso", async () => {
    const response = await request.post("/signin").send({
      email: "test1@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
