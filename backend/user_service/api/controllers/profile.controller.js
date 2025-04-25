import { profileService } from "../services/profile.service.js"
import { handleError } from "@app/errors"
import logger from "@eleekku/logger"

export const profileController = {
	
	async validateUser(request, reply) {
		try {
			const { id } = request.params;
			const user = await profileService.validateUser(parseInt(id));
			return reply.code(200).send({
				message: `User ${id} fetched successfully`,
				id: user.id,
			});
		} catch (err) {
			request.log.error(err);
			return handleError(err, reply, `Failed to fetch user ${id}`);
		}
	},
	
	async getUser(request, reply){
		try {
			const { id } = request.params;
			const user = await profileService.getUser(parseInt(id));
			return reply.code(200).send({
				message: `User ${id} fetched successfully`,
				id: user.id,
				username: user.username,
				email: user.email,
				picture: user.picture,
			})
		} catch (err) {
			request.log.error(err);
			return handleError(err, reply, `Failed to fetch user ${id}`);
		}
	},
	async getUserList(request, reply){
		try {
			const users = await profileService.getUserList();
			return reply.code(200).send({
				message: `User ${id} fetched successfully`,
				users: users
			})
		} catch (err) {
			request.log.error(err);
			return handleError(err, reply, `Failed to fetch users`);
		}
	},
	async updateUsername(request, reply) {
		try {
			const { id } = request.params;
			const { newUsername } = request.body;
			const user = await profileService.updateUsername(parseInt(id), newUsername);
			logger.info(`User ${userId}'s username updated to ${newUsername}`);
			return reply.code(201).send({
				message: `User ${id}'s username updated successfully`,
				id: user.id,
				newUsername: user.username,
			});
		} catch (err) {
			logger.error(`Failed to update user ${userId}'s username: ${err.message}`);
			request.log.error(err);
			return handleError(err, reply, `Failed to update user ${id}'s username`);
		}
	},
	async updatePicture(request, reply) {
		try {
			const { id } = request.params;
			const { newPicture } = request.body;
			const user = await profileService.updatePicture(parseInt(id), newPicture);
			logger.info(`User ${userId}'s profile picture updated`);
			return reply.code(201).send({
				message: `User ${id}'s profile picture updated successfully`,
				id: user.id,
				picture: user.picture,
			});
		} catch (err) {
			request.log.error(err);
			return handleError(err, reply, `Failed to update user${id}'s profile picture`);
		}
	},
	async updatePassword(request, reply) {
		try {
			const { id } = request.params;
			const { newPassword } = request.body;
			const user = await profileService.updatePassword(parseInt(id), newPassword);
			logger.info(`User ${userId}'s password updated`);
			return reply.code(201).send({
				message: `User ${id}'s password updated successfully`,
				id: user.id,
			});
		} catch (err) {
			logger.error(`Failed to update user ${userId}'s password: ${err.message}`);
			request.log.error(err);
			return handleError(err, reply, `Failed to update user ${id}'s password`);
		}
	},
	async validatePassword(request, reply) {
		try {
			const { id, password } = request.body
			const user = await loginService.validatePassword(parseInt(id), password);
			logger.info(`User registered to play: ${user.username}, ID: ${user.id}`);
			reply.status(200).send({
				id: user.id,
				username: user.username,
			});  
		} catch (err) {
			logger.error(`Error validating user password: ${err.message}`);
			request.log.error(err);
			return handleError(err, reply, `Failed to validate user ${id}'s password`);
		}
	},
	async getStats(request, reply) {
		try {
			const { id } = request.params;
			const user = await profileService.getStats(parseInt(id));
			return reply.code(200).send({
				message: `User ${id}'s stats fetched successfully`,
				id: user.id,
				wins: user.wins,
				losses: user.losses,
				matchesPlayed: user.matchesPlayed,
			})
		} catch (err) {
			request.log.error(err);
			return handleError(err, reply, `Failed to fetch user ${id}'s stats`);
		}
	},
	async updateStats(request, reply) {
		try {
			const { id } = request.params;
			const { isWinner } = request.body;
			const user = await profileService.updateStats(parseInt(id), isWinner);
			return reply.code(201).send({
				message: `User ${id}'s stats updated successfully`,
				id: user.id,
				wins: user.wins,
				losses: user.losses,
				matchesPlayed: user.matchesPlayed,
			})
		} catch (err) {
			logger.error(`Failed to fetch user ${userId}'s stats: ${err.message}`);
			request.log.error(err);
			return handleError(err, reply, `Failed to update user ${id}'s stats`);
		}
	},
	async getMatchHistory(request, reply) {
		try {
			const { id } = request.params;
			const matchHistory = await profileService.getMatchHistory(parseInt(id));
			return reply.code(200).send({
				message: `User ${id}'s match history fetched successfully`,
				matchHistory,
			})
		} catch (err) {
			logger.error(`Failed to fetch user ${userId}'s match history: ${err.message}`);
			request.log.error(err);
			return handleError(err, reply, `Failed to fetch user ${id}'s match history`);
		}
	},
	async deleteUser(request, reply) {
		try {
			const { id } = request.params;
			await profileService.deleteUser(parseInt(id));
			logger.info(`User ${userId} deleted successfully`);
			return reply.code(204).send({ message: `User ${id} deleted successfully` });
		} catch (err) {
			logger.error(`Failed to delete user ${userId}: ${err.message}`);
			request.log.error(err);
			return handleError(err, reply, `Failed to delete user ${id}`);
		} 
	},
	async getFriendsList(request, reply) {
		try {
			const { id } = request.params;
			friendList = await profileService.getFriendsList(parseInt(id));
			if (friendList.length === 0) {
				return reply.code(200).send({
					message: `User ${id} has no friends... :(`,
					friendList: [],
				});
			}
			return reply.code(200).send({
				message: `User ${id} friends list fetched successfully`,
				friendList,
			});
		} catch (err) {
			request.log.error(err);
			return handleError(err, reply, `Failed to fetch user ${id}'s friend list`);
		}
	},
	async addFriend(request, reply) {
		try {
			const { id } = request.params;
			const { friendId } = request.body;
			await profileService.addFriend(parseInt(id), parseInt(friendId));
			logger.info(`User ${userId} added user ${friendId} as a friend`);
			return reply.code(201).send({ 
				message: `Friendship created between user ${id} and user ${friendId}` 
			});
		} catch (err) {
			logger.error(`Failed to add user ${friendId} to user ${userId}'s friend list: ${err.message}`);
			request.log.error(err);
			return handleError(err, reply, `Failed to add friend to user ${id}'s friend list`);
		}
	},
	async deleteFriend(request, reply) {
		try {
			const { id } = request.params;
			const { friendId } = request.body;
			await profileService.deleteFriend(parseInt(id), parseInt(friendId));
			logger.info(`User ${userId} deleted user ${friendId} from their friend list`);
			return reply.code(204).send({ message: `User ${id} friendship with ${friendId} has ended permanently` })
		} catch (err) {
			logger.error(`Failed to delete user ${friendId} from user ${userId}'s friend list: ${err.message}`);
			request.log.error(err);
			return handleError(err, reply, `Failed to delete user ${id}'s friend`);
		}
	}
}