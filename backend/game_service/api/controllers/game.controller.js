import { gameService } from "../services/game.service.js"

export const gameController = {

	async createGame(request, reply) {
		try {
			const { player1Id, player2Id } = request.body;
			const game = await gameService.startGame(parseInt(player1Id), parseInt(player2Id));
			reply.code(201).send({
				message: `Game ${game.id} started successfully`,
				gameId: game.id,
				time: game.createdAt,
			});
		} catch (err) {
			request.log.error(`createGame: failed to create game`, err);
			return reply.code(500).send(`Failed to start the game: `, err);
		}

	},
	async finishGame(request, reply) {
		try {
			const { id } = request.params;
			const { p1score, p2score, winnerId } = request.body;
			const game = await gameService.finishGame(parseInt(id), parseInt(p1score), parseInt(p2score), parseInt(winnerId));
			return reply.code(201).send({
				message: `Game finished`,
				id: game.id,
		});
		} catch (err) {
			request.log.error(`finishGame: failed to update finished game ${request.params.id}`);
			return reply.code(500).send({ message: `Failed to update finished game ${request.params.id}` });
		}
	},
	async getGame(request, reply) {
		try {
			const { id: gameId } = request.params;
			const game = await gameService.getGameById(gameId);
			reply.code(200).send({
				message: `Game ${gameId} fetched successfully`,
				gameId: game.id,
			})
			
		} catch(err) {
			request.log.error(`getGame: failed to fetch game ${request.params.id}`);
			return reply.code(500).send({ message: `Failed to fetch game ${request.params.id}`});
		}

	},
	async getUserGames(request, reply) {
		try {
			const { id: userId } = request.params;
			const userGames = await gameService.getUserGames(userId);
			return reply.code(200).send({
				message: `User ${userId}'s games fetched successfully`,
				id,
				userGames,
			});
		} catch (err) {
			request.log.error(`getGame: failed to fetch user ${request.params.id}'s games`);
			return reply.code(500).send({ message: `Failed to fetch user ${request.params.id}'s games`});
		}
	},
}