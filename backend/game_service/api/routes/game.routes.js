import { gameController } from "../controllers/game.controller.js";

export default async function gameRoutes(fastify, options) {

	//Create a new game instance
	fastify.post("/api/game", gameController.createGame);
	//Record the winner of the game  and score
	fastify.patch("/api/game/:id/finish", gameController.finishGame);
	//Get game info (id of game in game table)
	fastify.get("/api/game/:id", gameController.getGame);
	//Get a user's match history (id of user)
	fastify.get("/api/user/:id/game", gameController.getMatchHistory)
}