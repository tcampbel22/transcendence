import { prisma } from "../../database/db.js";

export const gameService = {

	async startGame(player1Id, player2Id = null) {
		const player1 = await prisma.user.findUnique({ where: { id: player1Id} });
		if (!player1) {
			throw new Error("Player 1 not found");
		}
		if (player2Id) {
			const player2 = await prisma.user.findUnique({ where: { id: player2Id} });
			if (!player2) {
			throw new Error("Player 2 not found");
		}
	}

	const newGame = await prisma.game.create({
		data: {
			player1Id: player1Id,
			player2Id: player2Id,
			player1Score: 0,
			player2Score: 0,
			winnerId: player1Id,
		},
		include: {
			player1: true,
			player2: true
		}
		});
		return newGame;
	},
	
	async updateGameSccore() {},
	
	async endGame() {},
	
	async getGameById() {},
	
	async getUserGames() {},
}