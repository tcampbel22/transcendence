import Fastify from "fastify";
import gameRoutes from "../game_service/api/routes/game.routes.js";
import supertest from "supertest";
import { prisma, testConnection } from "../game_service/database/db.js";
// import { populate_games } from "./populate_db.js";
import nock from "nock"


describe("Backend Game API Tests", () => {
	let app;
	let gameId;
	beforeAll(async () => {
	const dbConnected = await testConnection();
	if (!dbConnected) {
		process.stdout.write("Failed to connect to db");
		throw new Error("Failed to connect to the database");
	}
	// if (prisma.game.count({}) === 0)
	// 	console.log("No users in db, calling populate db")
	// 	await populate_users();
	process.stdout.write("Connected to db");

	app = Fastify();
	app.register(gameRoutes);
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

	beforeEach( async () => {
		nock(`http://user_service:3002`)
		.get("/api/validate/1")
		.reply(200, { id: 1 })
		.get("/api/validate/2")
		.reply(200, { id: 2 })

		// Insert a test game into the database
		const createdGame = await prisma.game.create({
			data: {
				player1Id: 1,
				player2Id: 2,
				player1Score: 0,
				player2Score: 0,
				winnerId: null, // Game not finished yet
			},
		});
		gameId = createdGame.id;
	});

	afterEach(async () => {
		await prisma.game.deleteMany();
        nock.cleanAll(); // Clean up all mocks after each test
    });

	it("should return 201 when creating a game", async () => {
	const response = await supertest(app.server)
		.post("/api/create-game")
		.send({ player1Id: 1, player2Id: 2 });
	expect(response.status).toBe(201);
	});

	it("should return 200 when fetching game details", async () => {
	const response = await supertest(app.server)
		.get(`/api/${gameId}`)
	expect(response.status).toBe(200);
	});
	
	it("should return 201 when finishing a game", async () => {
	const response = await supertest(app.server)
		.patch(`/api/${gameId}/finish-game`)
		.send(({ p1score: 5, p2score: 1, winnerId: 1 }));
	expect(response.status).toBe(201);
	});

});
