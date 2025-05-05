import Fastify from "fastify";
import loginRoutes from "../user_service/api/routes/login.routes.js";
import registerRoutes from "../user_service/api/routes/register.routes.js";
import profileRoutes from "../user_service/api/routes/profile.routes.js";
import supertest from "supertest";
import { prisma, testConnection } from "../user_service/database/db.js";
import { populate_users, add_user } from "./populate_db.js";

describe("Backend User API Tests", () => {
	let app;
	let userId;
	let friendId;
	
	beforeAll(async () => {
	const dbConnected = await testConnection();
	if (!dbConnected) {
		process.stdout.write("Failed to connect to db");
		throw new Error("Failed to connect to the database");
	}
	app = Fastify();
	app.register(loginRoutes);
	app.register(registerRoutes);
	app.register(profileRoutes);
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

	beforeEach(async () => {
		await populate_users();
		userId = await add_user("fake");
		friendId = await add_user("friend");
	});
	
	afterEach(async () => {
		await prisma.user.deleteMany();
	});

	it("should return 401 for invalid login", async () => {
	const response = await supertest(app.server)
		.post("/api/login")
		.send({ username: "wrong", password: "wrong" });

	expect(response.status).toBe(401);
	});

	//Creates a user
	it("should return 201, user created succeessfully", async () => {
	const response = await supertest(app.server)
		.post("/api/register")
		.send({ username: "testuser", email: "hahe@gmail.com", password: "kissa" });
		
		expect(response.status).toBe(201);
	});

	//Deletes that user
	it("should return 204 and delete the user", async () => {
		const response = await supertest(app.server)
			.delete(`/api/${userId}/delete-user`);
		expect(response.status).toBe(204);
	});

	//Deletes that doesn't exist
	it("should return 404", async () => {
		const response = await supertest(app.server)
			.delete("/api/11/delete-user");
		expect(response.status).toBe(404);
	});
	
	// check if user exists
	it("should return 200", async () => {
		const response = await supertest(app.server)
			.get(`/api/validate/${userId}`)
		expect(response.status).toBe(200);
	});

	// get a user that doesn't exist
	it("should return 404", async () => {
		const response = await supertest(app.server)
			.get("/api/validate/999")
		expect(response.status).toBe(404);
	});

	//Creates a user with missing username
	it("should return 400", async () => {
		const response = await supertest(app.server)
			.post("/api/register")
			.send({ username: "", email: "hahe@gmail.com", password: "kissa" });
			
		expect(response.status).toBe(400);
	});

	//Creates a user with missing email
	it("should return 400", async () => {
		const response = await supertest(app.server)
			.post("/api/register")
			.send({ username: "testuser", email: "", password: "kissa" });
			
		expect(response.status).toBe(400);
	});

	//Creates a user with missing password
	it("should return 400", async () => {
		const response = await supertest(app.server)
			.post("/api/register")
			.send({ username: "testuser", email: "hahe@gmail.com", password: "" });
			
		expect(response.status).toBe(400);
	});

	// gets a users stats
	it("should return 200", async () => {
		const response = await supertest(app.server)
			.get(`/api/${userId}/stats`)
		expect(response.status).toBe(200);
	});

	// gets a users stats that doesn't exist
	it("should return 404", async () => {
		const response = await supertest(app.server)
			.get("/api/999/stats")
		expect(response.status).toBe(404);
	});




	




});
