import { gameController } from "../controllers/game.controller.js";
import * as schema from "../schemas/game.schema.js"

export default async function gameRoutes(fastify, options) {

	//Create a new game instance
	fastify.post("/api/create-game", {schema: schema.createGameSchema }, gameController.createGame);
	//Record the winner of the game and score
	fastify.patch("/api/:id/finish-game", {schema: schema.finishGameSchema }, gameController.finishGame);
	//Get game info (id of game in game table)
	fastify.get("/api/:id", gameController.getGame);
	//Get a user's match history
	fastify.get("/api/user/:id", {schema: schema.getUserGamesSchema }, gameController.getUserGames);
}