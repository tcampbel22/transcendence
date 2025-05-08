import { gameService } from "../services/game.service.js"
import { handleError } from "@app/errors";

export const gameController = {

	async createGame(request, reply) {
		try {
			const { player1Id, player2Id } = request.body;
			const game = await gameService.startGame(parseInt(player1Id), parseInt(player2Id));
			return reply.code(201).send({
				message: `Game ${game.id} started successfully`,
				gameId: game.id,
				time: game.createdAt,
			});
		} catch (err) {
			request.log.error(`createGame: failed to create game`, err);
			return handleError(err, reply, `Failed to create the game`);
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
			return handleError(err, reply, `Failed to update the game`);
		}
	},
	async getGame(request, reply) {
		try {
			const { id: gameId } = request.params;
			const game = await gameService.getGameById(gameId);
			return reply.code(200).send({
				message: `Game ${gameId} fetched successfully`,
				gameId: game.id,
			})
			
		} catch(err) {
			request.log.error(`getGame: failed to fetch game ${request.params.id}`);
			return handleError(err, reply, `Failed to fetch the game`);
		}

	},
	async getUserGames(request, reply) {
		try {
			const { id } = request.params;
			const userGames = await gameService.getUserGames(id);
			return reply.code(200).send({
				message: `User ${id}'s games fetched successfully`,
				id,
				userGames,
			});
		} catch (err) {
			console.log(`getGame: failed to fetch user ${request.params.id}'s games`, err);
			return handleError(err, reply, `Failed to fetch users game`);
		}
	},
}