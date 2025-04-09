import Fastify from "fastify";
import authRoute from "../fastify/api/routes/auth.js";
import registerRoute from "../fastify/api/routes/register.js";
import supertest from "supertest";

describe("Backend API Tests", () => {
  let app;

  beforeAll(async () => {
    app = Fastify();
    app.register(authRoute);
    app.register(registerRoute);
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should return 200 and success message for valid login", async () => {
    const response = await supertest(app.server)
      .post("/api/login")
      .send({ username: "admin", password: "password" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful!");
  });

  it("should return 401 for invalid login", async () => {
    const response = await supertest(app.server)
      .post("/api/login")
      .send({ username: "wrong", password: "wrong" });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid credentials");
  });

  it("should return 200", async () => {
    const response = await supertest(app.server)
      .post("/api/register")
      .send({ username: "testuser", email: "haha@gmail.com", password: "kissa" }); // Missing email and password

    expect(response.status).toBe(200);
  });
});