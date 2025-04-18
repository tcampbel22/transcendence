import { prisma } from `../../database/db.js`;
import argon2  from `argon2`;
import axios from `axios`;
import logger from `@eleekku/logger`;


export const profileService = {
	async getUser(userId) {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				username: true,
				email: true,
				picture: true,
			}
		});
		if (!user)
			throw new Error(`getUser: User cannot be found`);
		return user;
	},
	async updateUsername(userId, newUsername) {
		const duplicate = await prisma.user.findUnique({
			where: { username: newUsername }, 
			select: { username: true },
		});
		if (duplicate)
			throw new Error(`updateUsername: Username already exists, please choose another`);
		const user = await prisma.user.findUnique({
			where: {id: userId},
			select: { id: true },
		});
		if (!user)
			throw new Error(`updateUsername: User cannot be found`);

		const newUser = await prisma.user.update({
			where: { id: userId },
			data: { username: newUsername },
			select: {
				id: true,
				username: true,
			}
		});
		return newUser;
	},
	async updatePicture(userId, newPicture) {
		const user = await prisma.user.findUnique({
			where: {id: userId},
			select: { 
				id: true,
				picture: true,
			},
		});
		if (!user)
			throw new Error(`updatePicture: User cannot be found`);
		if (user.picture === newPicture)
			throw new Error(`updatePicture: Picture already exists, please choose another`);
			
		const newUser = await prisma.user.update({
			where: { id: userId },
			data: { picture: newPicture },
			select: {
				id: true,
				picture: true,
			}
		});
		return newUser;
	},
	async updatePassword(userId, newPassword) {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				password: true,
			}
		});
		if (!user)
			throw new Error(`updatePassword: User ${userId} cannot be found`);
		const hashPassword = await argon2.hash(newPassword);
		const duplicate = await argon2.verify(user.password, hashPassword);
		if (duplicate)
			throw new Error(`updatePassword: Password already exists, please choose another`);
		const newUser = await prisma.user.update({
			where: {id: userId},
			data: { password: hashPassword },
			select: { id: true },
		});
		return newUser;
	},
	async getStats(userId) {
		const user = await prisma.userStats.findUnique({
			where: {userId: userId},
			select: { 
				userId: true,
				wins: true,
				losses: true,
				matchesPlayed: true,
			},
		});
		if (!user)
			throw new Error(`getStats: User ${userId} cannot be found`);
		return user;
	},
	async getMatchHistory(userId) {
		const user = await prisma.user.findUnique( {where: {id: userId}, select: {
			id: true,
			username: true,
			picture: true,
		}});
		if (!user)
			throw new Error(`getMatchHistory: User ${userId} cannot be found`);
		try {
			const response = await axios.get(`http://game_service:3001/api/user/${userId}`);
			if (response.status !== 200)
				throw new Error(`Error retrieving match history ${response.statusText}`);
			
			if (!response.data || response.data.length === 0) {
				return {
					...user,
					matchHistory: [],
					message: `No match history found for this user ${userId}`,
				};
			}
	
			const matchHistory = await Promise.all(response.data.map(async (game) => {

				if (!game.id || !game.createdAt || !game.player1Score || !game.player2Score) {
					throw new Error(`Invalid game data received from game service`);
				}
				const isPlayer1 = game.player1Id === userId;
				const oppId = game.player1Id !== userId ? game.player1Id : game.player2Id;
				const oppName = await prisma.user.findUnique({
					where: { id: oppId },
					select: { 
						username: true,
						picture: true,
					 },
				});
				return {
					gameId: game.id,
					date: game.createdAt,
					score: '${game.player1Score} - ${game.player2Score}',
					result: game.winnerId === userId ? 'Winner' : 'Loser',
					opponentId: isPlayer1 ? game.player2Id : game.player1Id,
					opponentName: oppName.username,
					opponentPicture: oppName.picture,
				}
			}));
			const newMatchHistory = { ...user, matchHistory };
			return newMatchHistory;
		} catch (err) {
			logger.error(`getMatchHistory: Failed to retrieve match history`);
			throw new Error(`Failed to retrieve match history for user ${userId}`);
			
		}	
	}
}