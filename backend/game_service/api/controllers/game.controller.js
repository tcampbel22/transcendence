import { gameService } from `../services/game.service.js`

export const gameController = {

	async createGame(request, reply) {
		try {
			const { player1Id, Player2Id = null } = request.body;
			const game = await gameService.startGame(player1Id, Player2Id);
			reply.code(201).send({
				message: `Game ${game.id} started successfully`,
				gameId: game.id,
				time: game.createdAt,
			});
		} catch (err) {
			console.log(`createGame: failed to create game ${gameId}`);
			return reply.code(500).send(`Failed to start the game ${gameId}`);
		}

	},
	async finishGame(request, reply) {
		try {
			const { gameId, p1score, p2score, winnerId } = request.body;
			const game = await gameService( {gameId, p1score, p2score, winnerId});
			return reply.code(201).send({
				message: `Game finished`,
				gameId: game.id,
				// winnerId: game.winnerId,
				time: game.createdAt,
		})
		} catch (err) {
			console.log(`finishGame: failed to update finished game user ${gameId}`);
			return reply.code(500).send({ message: `Failed to update finished game ${gameId}` });
		}
	},
	async getGame(request, reply) {
		try {
			const	{ gameId } = request.body;
			const game = await gameService.getGameById({ gameId });
			reply.code(200).send({
				message: `Game ${gameId} fetched successfully`,
				gameId: game.id,
				// winner: winnerId,
			})
			
		} catch(err) {
			console.log(`getGame: failed to fetch game ${gameId}`);
			return reply.code(500).send({ message: `Failed to fetch game ${gameId}`});
		}

	},
	async getUserGames(request, reply) {
		try {
			const { userId } = request.params;
			const userGames = await gameService.getUserGames( { userId } );
			reply.code(200),send({
				message: `User ${userId}'s games fetched successfully`,
				userGames,
			});
		} catch (err) {
			console.log(`getGame: failed to fetch user ${userId}'s games`);
			return reply.code(500).send({ message: `Failed to fetch user ${userId}'s games`});
		}
	},
}