import { prisma } from "../../database/db.js";
import axios from "axios";
<<<<<<< HEAD
import logger from "@eleekku/logger";


const userServiceBaseUrl = process.env.NODE_ENV === "production"
    ? "https://user_service"
    : "http://localhost";
=======
import { ErrorConflict, ErrorNotFound, ErrorCustom, ErrorUnAuthorized, ErrorBadRequest } from "@app/errors";

const isProduction = process.env.NODE_ENV === 'production'
const SERVICE_URL = isProduction ? 'user_service' : 'localhost' 
>>>>>>> development

export const gameService = {

	async startGame(player1Id, player2Id) {
<<<<<<< HEAD
		try {
			logger.info(`Starting game for players ${player1Id} and ${player2Id}`);	
			const p1Response = await axios.get(`${userServiceBaseUrl}:3002/api/validate/${player1Id}`);
			console.log(p1Response.status);
			if (p1Response.status !== 200)
					throw new Error(`${p1Response.status}: Error retrieving player: ${p1Response.statusText}`);
			const p2Response = await axios.get(`${userServiceBaseUrl}:3002/api/validate/${player2Id}`)
=======
		try {	
			const p1Response = await axios.get(`http://${SERVICE_URL}:3002/api/validate/${player1Id}`);
			if (p1Response.status !== 200)
					throw new ErrorCustom(`Error retrieving player`, p1Response.status);
			const p2Response = await axios.get(`http://${SERVICE_URL}:3002/api/validate/${player2Id}`)
>>>>>>> development
			if (p2Response.status !== 200)
				throw new ErrorCustom(`Error retrieving player`, p2Response.status);
			//Create default game row
			logger.info(`Creating game for players ${player1Id} and ${player2Id}`);
			const newGame = await prisma.game.create({
				data: {
					player1Id: player1Id,
					player2Id: player2Id,
					player1Score: 0,
					player2Score: 0,
					winnerId: player1Id,
				},
			});
			return newGame;
		} catch (err) {
			logger.error("Game creation failed:", err.message);
			console.error("Game creation failed:", err.message);
			throw err;
		}
	},
	
	async finishGame(id, p1score, p2score, winnerId) {
		try {
			//Check if game exists
			const game = await prisma.game.findUnique({ 
				where: { id: id },
				select: { 
					player1Id: true,
					player2Id: true
				}
			})
			if (!game)
				throw new ErrorNotFound(`Game ${id} not found`);
			//Update game
			const updatedGame = await prisma.game.update(
			{
				where: { id: id },
				data: {
					player1Score: p1score,
					player2Score: p2score,
					winnerId: winnerId,
				}
			});

			//Update P1 userstats
			try {
<<<<<<< HEAD
				await axios.patch(`${userServiceBaseUrl}:3002/api/${game.player1Id}/update-stats`, {
=======
				await axios.patch(`http://${SERVICE_URL}:3002/api/${game.player1Id}/update-stats`, {
>>>>>>> development
				 	isWinner: game.player1Id === winnerId,
					gameId: id });
			} catch (err) {
				console.log(`Failed to update player 1's stats`);
			}

			//Update P2 userstats, if it exists
			if (game.player2Id) {
				try {
<<<<<<< HEAD
					await axios.patch(`${userServiceBaseUrl}:3002/api/${game.player2Id}/update-stats`, {
=======
					await axios.patch(`http://${SERVICE_URL}:3002/api/${game.player2Id}/update-stats`, {
>>>>>>> development
						isWinner: game.player2Id === winnerId,
						gameId: id });
				} catch (err) {
					console.log(`Failed to update player 2's stats`);
			}}

			return updatedGame;
		} catch (err) {
			console.error("Failed to finish game: ", err.message);
			throw err;
		}
	},
	// Fetches a specific game by id
	async getGameById(gameId) {
		const game = await prisma.game.findUnique({ where: { id: parseInt(gameId) }})
		if (!game)
			throw new ErrorNotFound(`getGameById: gameId ${gameId} does not exist`);
		return game;
	},
    // Fetches all games a user has played in
	async getUserGames(userId) {
		const games = await prisma.game.findMany(
			{ where: {
				OR: [
					{ player1Id: parseInt(userId) },
					{ player2Id: parseInt(userId) },
				],
			},
			orderBy: { createdAt: 'desc' },
		});
<<<<<<< HEAD
	//	if (!games || games.length === 0)
	//		throw new Error(`getUserGames: user ${userId} does not have a game history`);
=======
		if (!games || games.length === 0)
			return []
>>>>>>> development
		return games;

	},
}