import { gameService } from "../services/game.service.js"

export const gameController = {

	async createGame(request, reply) {
		try {
			const { player1Id, Player2Id = null } = request.body;
			const game = await gameService.startGame(player1Id, Player2Id);
			reply.code(201).send({
				message: "Game started successfully",
				gameId: game.id,
				time: game.createdAt,
			});
		} catch (err) {
			console.log("createGame: failed to create game");
			return reply.code(500).send("Failed to start the game");
		}

	},
	async finishGame(request, reply) {
		try {
			const { gameId, p1score, p2score, winnerId } = request.body;
			const game = await gameService( {gameId, p1score, p2score, winnerId});
			return reply.code(201).send({
				message: "Game finished",
				gameId: game.id,
				// winnerId: game.winnerId,
				time: game.createdAt,
		})
		} catch (err) {
			console.log("finishGame: failed to update finished game");
			return reply.code(500).send({ message: "Failed to update finished game" });
		}
	},
	async getGame(request, reply) {
		try {
			const	{ gameId } = request.body;
			const game = await gameService.getGameById({ gameId });
			reply.code(200).send({
				message: "Game fetched successfully",
				gameId: game.id,
				// winner: winnerId,
			})
			
		} catch(err) {
			console.log("getGame: failed to fetch game");
			return reply.code(500).send({ message: "Failed to fetch game"});
		}

	},
	async getUserGames(request, reply) {

	},
}