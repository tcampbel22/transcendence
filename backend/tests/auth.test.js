import Fastify from "fastify";
import multipart from "@fastify/multipart";
import loginRoutes from "../user_service/api/routes/login.routes.js";
import registerRoutes from "../user_service/api/routes/register.routes.js";
import profileRoutes from "../user_service/api/routes/profile.routes.js";
import supertest from "supertest";
import { prisma, testConnection } from "../user_service/database/db.js";
import { populate_users, add_user } from "./populate_db.js";
import nock from "nock";


const SERVICE_URL = 'localhost';

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
	app.register(multipart);
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
		.set("x-internal-key", "dj")
		.send({ username: "wrong", password: "wrong" });

	expect(response.status).toBe(401);
	});

	//Creates a user
	it("should return 201, user created successfully", async () => {
	const response = await supertest(app.server)
		.post("/api/register")
		.set("x-internal-key", "dj")
		.send({ username: "testuser", email: "hahe@gmail.com", password: "kissa" });
		
		expect(response.status).toBe(201);
	});

	//Deletes that user
	it("should return 204 and delete the user", async () => {
		const response = await supertest(app.server)
			.delete(`/api/${userId}/delete-user`)
			.set("x-internal-key", process.env.INTERNAL_KEY);
		expect(response.status).toBe(204);
	});

	//Deletes that doesn't exist
	it("should return 404", async () => {
		const response = await supertest(app.server)
			.delete("/api/11/delete-user")
			.set("x-internal-key", "dj");
		expect(response.status).toBe(404);
	});
	
	// check if user exists
	it("should return 200", async () => {
		const response = await supertest(app.server)
			.get(`/api/validate/${userId}`)
			.set("x-internal-key", "dj");
		expect(response.status).toBe(200);
	});

	// get a user that doesn't exist
	it("should return 404", async () => {
		const response = await supertest(app.server)
			.get("/api/validate/999")
			.set("x-internal-key", "dj");
		expect(response.status).toBe(404);
	});

	//Creates a user with missing username
	it("should return 400", async () => {
		const response = await supertest(app.server)
			.post("/api/register")
			.set("x-internal-key", "dj")
			.send({ username: "", email: "hahe@gmail.com", password: "kissa" });
			
		expect(response.status).toBe(400);
	});

	//Creates a user with missing email
	it("should return 400", async () => {
		const response = await supertest(app.server)
			.post("/api/register")
			.set("x-internal-key", "dj")
			.send({ username: "testuser", email: "", password: "kissa" });
			
		expect(response.status).toBe(400);
	});

	//Creates a user with missing password
	it("should return 400", async () => {
		const response = await supertest(app.server)
			.post("/api/register")
			.set("x-internal-key", "dj")
			.send({ username: "testuser", email: "hahe@gmail.com", password: "" });
			
		expect(response.status).toBe(400);
	});

	// gets a users stats
	it("should return 200", async () => {
		const response = await supertest(app.server)
			.get(`/api/${userId}/stats`)
			.set("x-internal-key", "dj");
		expect(response.status).toBe(200);
	});

	// gets a users stats that doesn't exist
	it("should return 404", async () => {
		const response = await supertest(app.server)
			.get("/api/999/stats")
			.set("x-internal-key", "dj");
		expect(response.status).toBe(404);
	});

	// Update user stats
	it("should return 201 and update the users stats", async () => {
		const response = await supertest(app.server)
			.patch(`/api/${userId}/update-stats`)
			.set("x-internal-key", "dj")
			.send({ isWinner: true })
		expect(response.status).toBe(201)
	});

	// add friend and then try to add them again
	it("Adds a friend and then attempt to add them again", async () => {
		const response = await supertest(app.server)
			.post(`/api/${userId}/friends`)
			.set("x-internal-key", "dj")
			.send({ friendUsername: "friend" });
		expect(response.status).toBe(201)
		const response2 = await supertest(app.server)
			.post(`/api/${userId}/friends`)
			.set("x-internal-key", "dj")
			.send({ friendUsername: "friend" });
		expect(response2.status).toBe(409) // Changed from 401 to 409 (Conflict)
	});

	// add friend and then delete them
	it("Should add a friend and then delete them", async () => {
		// First add a friend
		const response = await supertest(app.server)
			.post(`/api/${userId}/friends`)
			.set("x-internal-key", "dj")
			.send({ friendUsername: "friend" });
		expect(response.status).toBe(201);
		// Delete the friend
		const response2 = await supertest(app.server)
			.delete(`/api/${userId}/delete-friend`)
			.set("x-internal-key", "dj")
			.send({ friendUsername: "friend" });
		expect(response2.status).toBe(201);
	});

	// delete friend that is not a friend
	it("Should return 404 as there is no friendship", async () => {
		const response = await supertest(app.server)
			.delete(`/api/${userId}/delete-friend`)
			.set("x-internal-key", "dj")
			.send({ friendUsername: "friend" });
		expect(response.status).toBe(404)
	});

	// delete friend that doesn't exist
	it("Should return 404 as friend does not exist", async () => {
		const response = await supertest(app.server)
			.post(`/api/${userId}/friends`)
			.set("x-internal-key", "dj")
			.send({ friendUsername: "fake_friend" });
		expect(response.status).toBe(404)
	});

	// delete friend with current users username
	it("Should return 409 as user cannot delete themselves", async () => {
		const response = await supertest(app.server)
			.post(`/api/${userId}/friends`)
			.set("x-internal-key", "dj")
			.send({ friendUsername: "fake" });
		expect(response.status).toBe(409)
	});

	// Get friends list
	it("Adds a friend and returns a list of all friends", async () => {
		// First add a friend
		const response = await supertest(app.server)
			.post(`/api/${userId}/friends`)
			.set("x-internal-key", "dj")
			.send({ friendUsername: "friend" });
		expect(response.status).toBe(201);
			// Get users friend list
		const response2 = await supertest(app.server)
			.get(`/api/${userId}/friends`)
			.set("x-internal-key", "dj");
		expect(response2.status).toBe(200)
		// Get friends friend list
		const response3 = await supertest(app.server)
			.get(`/api/${friendId}/friends`)
			.set("x-internal-key", "dj");
		expect(response3.status).toBe(200)
	});
	// Get match history
	it("Returns a users match history", async () => {
		const mockUserGamesResponse = {
			userGames: [
			  {
				id: 103,
				player1Id: userId,
				player2Id: 57,
				winnerId: userId,
				player1Score: 10,
				player2Score: 7,
				createdAt: "2025-05-06T14:23:15Z"
			  },
			  {
				id: 98,
				player1Id: 33,
				player2Id: userId,
				winnerId: 33,
				player1Score: 10,
				player2Score: 8,
				createdAt: "2025-05-05T19:45:22Z"
			  },
			  {
				id: 87,
				player1Id: userId,
				player2Id: 19,
				winnerId: userId,
				player1Score: 10,
				player2Score: 4,
				createdAt: "2025-05-03T08:12:37Z"
			  } 
			]};
		nock(`http://${SERVICE_URL}:3001`)
			.get(`/api/user/${userId}`)
			.reply(200, mockUserGamesResponse)
		const response = await supertest(app.server)
		  .get(`/api/${userId}/match-history`)
		  .set("x-internal-key", "dj");
		expect(response.status).toBe(200);
	});

	// Get empty match history
	it("Returns a users empty match history", async () => {
		const mockUserGamesResponse = [];
		nock(`http://${SERVICE_URL}:3001`)
			.get(`/api/user/${userId}`)
			.reply(200, mockUserGamesResponse)
		const response = await supertest(app.server)
		.get(`/api/${userId}/match-history`)
		.set("x-internal-key", "dj");
		expect(response.status).toBe(200);
	});
});
