import { prisma } from "../../database/db.js";
import argon2 from "argon2";
import axios from "axios";
import logger from "@eleekku/logger";
import { ErrorConflict, ErrorNotFound, ErrorCustom, ErrorUnAuthorized, ErrorBadRequest } from "@app/errors";

export const profileService = {
	// Check if user is in db
	async validateUser(id) {
		const user = await prisma.user.findUnique({ 
			where: {id: id },
			select: { id: true }
			});
		if (!user)
			throw new ErrorNotFound(`validateUser: User ${id} cannot be found`);
		return user;
	},

	// Fetches a user's profile
    async getUser(id) {
        const user = await prisma.user.findUnique({
            where: { id: id },
            select: {
                id: true,
                username: true,
                email: true,
                picture: true,
            },
        });
        if (!user) 
			throw new ErrorNotFound(`getUser: User ${id} cannot be found`);
        return user;
    },
	async getUserList(limit = 20, sortField = 'username') {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
            },
			orderBy: {
				[sortField]: 'asc',
			},
			take: limit
        });
        if (users.length === 0) 
			throw new ErrorNotFound(`getUserList: no users in database`);
        return users
    },
    // Updates a user's username
    async updateUsername(id, newUsername) {
        // Check if the new username already exists
        const duplicate = await prisma.user.findUnique({
            where: { username: newUsername },
            select: { username: true },
        });
        if (duplicate)
            throw new ErrorConflict(`updateUsername: ${duplicate.username} already exists, please choose another`);

        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { id: id },
            select: { id: true },
        });
        if (!user)
            throw new ErrorNotFound(`updateUsername: User ${id} cannot be found`);

        // Update the username
        const newUser = await prisma.user.update({
            where: { id: id },
            data: { username: newUsername },
            select: {
                id: true,
                username: true,
            },
        });
        return newUser;
    },

    // Updates a user's profile picture
    async updatePicture(id, newPicture) {
        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { id: id },
            select: {
                id: true,
                picture: true,
            },
        });
        if (!user)
            throw new ErrorNotFound(`updatePicture: User ${id} cannot be found`);

        // Check if the new picture is the same as the current one
        if (user.picture === newPicture)
            throw new ErrorConflict(`updatePicture: Picture already exists, please choose another`);

        // Update the profile picture
        const newUser = await prisma.user.update({
            where: { id: id },
            data: { picture: newPicture },
            select: {
                id: true,
                picture: true,
            },
        });
        return newUser;
    },
    // Updates a user's password
    async updatePassword(id, newPassword) {
        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { id: id },
            select: {
                id: true,
                password: true,
            },
        });
        if (!user)
            throw new ErrorNotFound(`updatePassword: User ${id} cannot be found`);

        // Hash the new password and check if it's the same as the current one
        const hashPassword = await argon2.hash(newPassword);
        const duplicate = await argon2.verify(user.password, hashPassword);
        if (duplicate)
            throw new ErrorConflict(`updatePassword: Password already exists, please choose another`);

        // Update the password
        const newUser = await prisma.user.update({
            where: { id: id },
            data: { password: hashPassword },
            select: { id: true },
        });
        return newUser;
    },
	async validatePassword(id, password) {
		try {
			const user = await prisma.user.findUnique( { 
				where: { id: id },
				select: { 
					username: true,
					id: true,
					password: true
				}
			});
			if (!user) {
				throw new ErrorNotFound(`User ${id} cannot be found`);
			}
			const isMatch = await argon2.verify(user.password, password);
			if (!isMatch) {
				throw new ErrorUnAuthorized(`User ${id} password is incorrect`);
			}
			const { password: _, ...noPasswordUser} = user;
			return { user: noPasswordUser };
		} catch (err) {
			throw (err);
		}
	},
    // Fetches a user's stats
    async getStats(id) {
        // Fetch the user's stats
        const user = await prisma.userStats.findUnique({
            where: { userId: id },
            select: {
                id: true,
                wins: true,
                losses: true,
                matchesPlayed: true,
            },
        });
        if (!user)
            throw new ErrorNotFound(`getStats: User ${id} cannot be found`);
        return user;
    },

	 // Fetches a user's stats
	 async updateStats(id, isWinner) {
		const user = await prisma.user.findUnique({
            where: { id: id },
            select: { id: true, },
        });
        if (!user)
            throw new ErrorNotFound(`updateStats: User ${id} cannot be found`);
		try {
			// Update the user's stats
			const updatedStats = await prisma.userStats.update({
				where: { userId: id },
				data: {
					wins: isWinner ? { increment: 1 } : undefined,
					losses: !isWinner ? { increment: 1 } : undefined,
					matchesPlayed: { increment: 1 } 
				}}
			);
			return updatedStats;
		} catch (err) {
			throw (err);
		}
    },


    // Fetches a user's match history
    async getMatchHistory(id) {
        // Fetch the user's basic information
        const user = await prisma.user.findUnique({
            where: { id: id },
            select: {
                id: true,
                username: true,
                picture: true,
            },
        });
        if (!user)
            throw new ErrorNotFound(`getMatchHistory: User ${id} cannot be found`);

        try {
            // Fetch match history from the game service
            const response = await axios.get(
                `http://game_service:3001/api/user/${id}`
            );
            if (response.status !== 200)
                throw new ErrorCustom(`Error retrieving match history ${response.statusText}`, response.status);

            // Handle empty match history
            if (!response.data || response.data.length === 0) {
                return {
                    ...user,
                    matchHistory: [],
                    message: `No match history found for this user ${id}`,
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
                        throw new ErrorNotFound(`Invalid game data received from game service`);
                    }
                    const isPlayer1 = game.player1Id === id;
                    const oppId =
                        game.player1Id !== id
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
                            game.winnerId === id ? "Winner" : "Loser",
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
            throw new ErrorCustom(err.message, err.statusCode);
        }
    },
    // Deletes a user
    async deleteUser(id) {
        const user = await prisma.user.findUnique({
            where: { id: id },
        });
        if (!user) {
            throw new ErrorNotFound(`User with id ${id} does not exist.`);
        }
        await prisma.user.delete({
            where: { id: id },
        });
    },
	//Returns friends of user object 
	async getFriendsList(id) {
		const rawFriendsData = await prisma.user.findUnique ({
			where: { id: id},
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
		if (!rawFriendsData)
			return [];
		const friendsList = rawFriendsData.friends.map((formatFriends) => ({
			id: formatFriends.friend.id,
			username: formatFriends.friend.username,
			picture: formatFriends.friend.picture,
			status: formatFriends.friend.isOnline ? "Online" : "Offline",
		}));
		return friendsList;
	},
	async addFriend(id, friendUsername) {
		const friend = await prisma.user.findUnique({ 
			where: { username: friendUsername },
			select: {
				id: true
			}
		});
		if (!friend)
			throw new ErrorNotFound(`User ${friendUsername} not found`)
		const user = await prisma.user.findUnique({ 
			where: { id : id },
			select: {
				id: true
			}
		});
		if (!user)
			throw new ErrorNotFound(`User ${id} not found`)
		if (id === friend.id) {
			throw new ErrorConflict("A user cannot add themselves as a friend");
		};
		const duplicate = await prisma.friend.findUnique({
			where: {
				userId_friendId: {
					userId: id,
					friendId: friend.id,
				}
			},
		});
		if (duplicate)
			throw new ErrorUnAuthorized(`User ${id} is already friends with friend ${friend.id}`);
		//Create friendship for friend
		await prisma.friend.createMany({
			data: [
				{ userId: id, friendId: friend.id, isOnline: false },
				{ userId: friend.id, friendId: id, isOnline: false },
			],
		});
		return friend.id
	},
	async deleteFriend(id, friendUsername) {
		const user = await prisma.user.findUnique({ 
			where: { id : id },
			select: {
				id: true
			}
		});
		if (!user)
			throw new ErrorNotFound(`User ${id} not found`)
		const friend = await prisma.user.findUnique({ 
			where: { username: friendUsername },
			select: {
				id: true
			}
		});
		if (!friend)
			throw new ErrorNotFound(`User ${friendUsername} not found`)
		if (id === friend.id) {
			throw new ErrorConflict("A user cannot delete themselves...");
		};
		const deleted = await prisma.friend.deleteMany({
			where: {
				OR: [
				  {
					userId: id,
					friendId: friend.id
				  },
				  {
					userId: friend.id,
					friendId: id  
				  }
				]
			  },
			});
		if (deleted.count === 0) {
			throw new ErrorNotFound(`No friendship exists between user ${id} and user ${friend.id}`);
		}
		return friend.id
	}
}