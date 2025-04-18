import { prisma } from "../../database/db.js";
import argon2 from "argon2";
import axios from "axios";
import logger from "@eleekku/logger";

export const profileService = {
    // Fetches a user's profile
    async getUser(userId) {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
            select: {
                id: true,
                username: true,
                email: true,
                picture: true,
            },
        });
        if (!user) throw new Error(`getUser: User ${userId} cannot be found`);
        return user;
    },

    // Updates a user's username
    async updateUsername(userId, newUsername) {
        // Check if the new username already exists
        const duplicate = await prisma.user.findUnique({
            where: { username: newUsername },
            select: { username: true },
        });
        if (duplicate)
            throw new Error(
                `updateUsername: ${duplicate.username} already exists, please choose another`
            );

        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
            select: { id: true },
        });
        if (!user)
            throw new Error(`updateUsername: User ${userId} cannot be found`);

        // Update the username
        const newUser = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: { username: newUsername },
            select: {
                id: true,
                username: true,
            },
        });
        return newUser;
    },

    // Updates a user's profile picture
    async updatePicture(userId, newPicture) {
        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
            select: {
                id: true,
                picture: true,
            },
        });
        if (!user)
            throw new Error(`updatePicture: User ${userId} cannot be found`);

        // Check if the new picture is the same as the current one
        if (user.picture === newPicture)
            throw new Error(
                `updatePicture: Picture already exists, please choose another`
            );

        // Update the profile picture
        const newUser = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: { picture: newPicture },
            select: {
                id: true,
                picture: true,
            },
        });
        return newUser;
    },

    // Updates a user's password
    async updatePassword(userId, newPassword) {
        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
            select: {
                id: true,
                password: true,
            },
        });
        if (!user)
            throw new Error(`updatePassword: User ${userId} cannot be found`);

        // Hash the new password and check if it's the same as the current one
        const hashPassword = await argon2.hash(newPassword);
        const duplicate = await argon2.verify(user.password, hashPassword);
        if (duplicate)
            throw new Error(
                `updatePassword: Password already exists, please choose another`
            );

        // Update the password
        const newUser = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: { password: hashPassword },
            select: { id: true },
        });
        return newUser;
    },

    // Fetches a user's stats
    async getStats(userId) {
        // Fetch the user's stats
        const user = await prisma.userStats.findUnique({
            where: { userId: parseInt(userId) },
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

    // Fetches a user's match history
    async getMatchHistory(userId) {
        // Fetch the user's basic information
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
            select: {
                id: true,
                username: true,
                picture: true,
            },
        });
        if (!user)
            throw new Error(`getMatchHistory: User ${userId} cannot be found`);

        try {
            // Fetch match history from the game service
            const response = await axios.get(
                `http://game_service:3001/api/user/${userId}`
            );
            if (response.status !== 200)
                throw new Error(
                    `Error retrieving match history ${response.statusText}`
                );

            // Handle empty match history
            if (!response.data || response.data.length === 0) {
                return {
                    ...user,
                    matchHistory: [],
                    message: `No match history found for this user ${userId}`,
                };
            }

            // Process and format the match history
            const matchHistory = await Promise.all(
                response.data.map(async (game) => {
                    if (
                        !game.id ||
                        !game.createdAt ||
                        !game.player1Score ||
                        !game.player2Score
                    ) {
                        throw new Error(
                            `Invalid game data received from game service`
                        );
                    }
                    const isPlayer1 = game.player1Id === userId;
                    const oppId =
                        game.player1Id !== userId
                            ? game.player1Id
                            : game.player2Id;
                    const oppName = await prisma.user.findUnique({
                        where: { id: parseInt(oppId) },
                        select: {
                            username: true,
                            picture: true,
                        },
                    });
                    return {
                        gameId: game.id,
                        date: game.createdAt,
                        score: `${game.player1Score} - ${game.player2Score}`,
                        result:
                            game.winnerId === userId ? "Winner" : "Loser",
                        opponentId: isPlayer1
                            ? game.player2Id
                            : game.player1Id,
                        opponentName: oppName.username,
                        opponentPicture: oppName.picture,
                    };
                })
            );
            const newMatchHistory = { ...user, matchHistory };
            return newMatchHistory;
        } catch (err) {
            logger.error(`getMatchHistory: Failed to retrieve match history`);
            throw new Error(
                `Failed to retrieve match history for user ${userId}`
            );
        }
    },
    // Deletes a user
    async deleteUser(userId) {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
        });
        if (!user) {
            throw new Error(`User with id ${userId} does not exist.`);
        }
        await prisma.user.delete({
            where: { id: parseInt(userId) },
        });
    },
	async getFriendsList(userId) {
		const rawFriendsData = await prisma.user.findUnique ({
			where: { id: parseInt(userId)},
			select: {
				friends: {
					select: {
						friend: {
							select: {
								id: true,
								username: true,
								picture: true,
								isOnline: true,
							},
						},
					},
				},
			},
		});
		if (rawFriendsData.length === 0)
			return;
		const friendsList = rawFriendsData.friends.map((formatFriends) => ({
			id: formatFriends.friend.id,
			username: formatFriends.friend.username,
			picture: formatFriends.friend.picture,
			status: formatFriends.friend.isOnline ? "Online" : "Offline",
		}));
		return friendsList;
	},
	async addFriend(userId, friendId) {
		if (userId === friendId) {
			throw new Error("A user cannot add themselves as a friend");
		};
		const temp = await prisma.user.findMany({ 
			where: {
				id: {
					in: [userId, friendId],
				},
			},
		});
		if (temp.length !== 2)
			throw new Error(`User or friend id cannot be found`);
		const duplicate = await prisma.friend.findUnique({
			where: {
				userId_friendId: {
					userId: userId,
					friendId: friendId,
				}
			},
		});
		if (duplicate)
			throw new Error(`User ${userId} is already friends with friend ${friendId}`);
		//Create friendship for friend
		await prisma.friend.createMany({
			data: [
				{ userId: userId, friendId: friendId, isOnline: false },
				{ userId: friendId, friendId: userId, isOnline: false },
			],
		});
	},
	async deleteFriend(userId, friendId) {
		if (userId === friendId) {
			throw new Error("A user cannot delete themselves... TWICE");
		};
		const temp = await prisma.user.findMany({ 
			where: {
				id: {
					in: [userId, friendId],
				},
			},
		});
		if (temp.length !== 2)
			throw new Error(`User or friend id cannot be found`);
		deleted = await prisma.friend.deleteMany({
			where: {
				AND: [{
						userId: userId,
						friendId: friendId
					},
					{
						userId: friendId,
						friendId: userId	
				}]
			},
		});
		if (deleted.count === 0) {
			throw new Error(`No friendship exists between user ${userId} and user ${friendId}`);
		}
	}
}