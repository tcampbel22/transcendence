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
	//Create default game row
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
	
	async endGame(gameId, p1score, p2score, winnerId) {
		//Check if game exists
		const game = await prisma.game.findUnique({ 
			where: { id: gameId},
			include: { player1: true, player2: true,}
		})
		if (!game)
			throw new Error("Game not found");
		//Update game and userStats tables of each player, use transaction to ensure the updates are atomic
		const updatedGame = await prisma.$transaction(async (tx) => {
			//Update game
			const tempGame = await tx.game.update(
			{
				where: { id: gameId },
				data: {
					player1Score: p1score,
					player2Score: p2score,
					winnerId: winnerId,
				}
			});
			//Update P1 userstats
			await tx.userStats.update(
			{
				where: { userId: game.player1Id },
				data: {
					matchesPlayed: { increment: 1},
					wins: winnerId === game.player1Id ? { increment: 1} : undefined,
					losses: winnerId !== game.player1Id ? { increment: 1} : undefined,
				}
			});
			//Update P2 userstats, if it exists
			if (game.player2Id) {
				await tx.userStats.update({
					where: { userId: game.player2Id },
					data: {
						matchesPlayed: { increment: 1},
						wins: winnerId === game.player2Id ? { increment: 1} : undefined,
						losses: winnerId !== game.player2Id ? { increment: 1} : undefined,
					}
				});
			}
			return tempGame;
		});
		return updatedGame;
	},
	
	async getGameById(gameId) {
		const game = await prisma.game.findUnique({ where: { id: gameId }})
		if (!game)
			throw new Error("getGameById: gameId does not exist");
		return game;
	},
	
	async getUserGames(userId) {
		const userGames = await prisma.user.findUnique( { 
			where: { id: userId },
			include: {
				gamesAsPlayer1: true,
				gamesAsPlayer2: true,
			}
		});
		if (!userGames)
			throw new Error("getUserGames: userId does not exist");
		return userGames;
	},

	async getUserFriends(userId) {

	},
}