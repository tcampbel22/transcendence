import Fastify from "fastify";
import loginRoutes from "../user_service/api/routes/login.routes.js";
import registerRoutes from "../user_service/api/routes/register.routes.js";
import profileRoutes from "../user_service/api/routes/profile.routes.js";
import supertest from "supertest";
import { prisma, testConnection } from "../user_service/database/db.js";
import { populate_users } from "./populate_db.js";

describe("Backend API Tests", () => {
  let app;

  beforeAll(async () => {
    const dbConnected = await testConnection();
    if (!dbConnected) {
      throw new Error("Failed to connect to the database");
    }
    app = Fastify();
    app.register(loginRoutes);
    app.register(registerRoutes);
	app.register(profileRoutes);
	populate_users();
    await app.ready();
  });

  afterAll(async () => {
    if (app) {
      await app.close(); // Close Fastify server
    }
    if (prisma) {
      await prisma.$disconnect(); // Disconnect Prisma Client
    }
  });
/*
  it("should return 200 and success message for valid login", async () => {
    const response = await supertest(app.server)
      .post("/api/login")
      .send({ username: "admin", password: "password" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful!");
  });
*/
  it("should return 401 for invalid login", async () => {
    const response = await supertest(app.server)
      .post("/api/login")
      .send({ username: "wrong", password: "wrong" });

    expect(response.status).toBe(401);
  });

  it("should return 201", async () => {
    const response = await supertest(app.server)
      .post("/api/register")
      .send({ username: "testuser", email: "haha@gmail.com", password: "kissa" });
	
	  
	  expect(response.status).toBe(201);
	});
	
	// check if user exists
	it("should return 200", async () => {
	  const response = await supertest(app.server)
		  .get("/api/validate/1")
	  expect(respnse.status).toBe(200);
	});
});
