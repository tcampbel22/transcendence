import { profileService } from "../services/profile.service.js"
import { ErrorNotFound, ErrorUnAuthorized, handleError } from "@app/errors"
import logger from "@eleekku/logger"
import fs from "fs";
import util from "util";
import { pipeline } from "stream";
import path from "path";

export const profileController = {
	
	async validateUser(request, reply) {
		const { id } = request.params;
		try {
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
		const { id } = request.params;
		try {
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
				message: `User list fetched successfully`,
				users: users
			})
		} catch (err) {
			request.log.error(err);
			return handleError(err, reply, `Failed to fetch users`);
		}
	},
	async updateUsername(request, reply) {
		const { id } = request.params;
		const { newUsername } = request.body;
		try {
			const user = await profileService.updateUsername(parseInt(id), newUsername);
			logger.info(`User ${id}'s username updated to ${newUsername}`);
			return reply.code(201).send({
				message: `User ${id}'s username updated successfully`,
				id: user.id,
				newUsername: user.username,
			});
		} catch (err) {
			logger.error(`Failed to update user ${id}'s username: ${err.message}`);
			request.log.error(err);
			return handleError(err, reply, `Failed to update user ${id}'s username`);
		}
	},
	async updatePicture(request, reply) {
		const { id } = request.params;
		// const { newPicture } = request.body;
		try {
			const data = await request.file();
			if (!data)
				throw new ErrorNotFound(`No file uploaded`);
			const fileExtension = path.extname(data.filename).toLowerCase();
			if (!['jpg', '.jpeg', '.png'].includes(fileExtension))
				throw new ErrorUnAuthorized(`File should be jpg, jpeg or png`);
			const filename = `user_${id}_${Date.now()}${fileExtension}`;
			const filepath = `/app/uploads/${filename}`;
			const pictureUrl = `/uploads/${filename}`;
			
			const pump = util.promisify(pipeline);
			await pump(data.file, fs.createWriteStream(filepath));
			
			const user = await profileService.updatePicture(parseInt(id), pictureUrl);
			logger.info(`User ${id}'s profile picture updated`);
			return reply.code(201).send({
				message: `User ${id}'s profile picture updated successfully`,
				id: user.id,
				newPicture: user.picture,
			});
		} catch (err) {
			request.log.error(err);
			return handleError(err, reply, `Failed to update user${id}'s profile picture`);
		}
	},
	async updatePassword(request, reply) {
		const { id } = request.params;
		const { newPassword } = request.body;
		try {
			const user = await profileService.updatePassword(parseInt(id), newPassword);
			logger.info(`User ${id}'s password updated`);
			return reply.code(201).send({
				message: `User ${id}'s password updated successfully`,
				id: user.id,
			});
		} catch (err) {
			logger.error(`Failed to update user ${id}'s password: ${err.message}`);
			request.log.error(err);
			return handleError(err, reply, `Failed to update user ${id}'s password`);
		}
	},
	async validatePassword(request, reply) {
		const { id, password } = request.body
		try {
			const user = await profileService.validatePassword(parseInt(id), password);
			logger.info(`User registered to play: ${user.username}, ID: ${user.id}`);
			reply.status(200).send({
				message: `User ${id} password successfully validated`,
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
		const { id } = request.params;
		try {
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
		const { id } = request.params;
		const { isWinner } = request.body;
		try {
			const user = await profileService.updateStats(parseInt(id), isWinner);
			return reply.code(201).send({
				message: `User ${id}'s stats updated successfully`,
				id: user.id,
				wins: user.wins,
				losses: user.losses,
				matchesPlayed: user.matchesPlayed,
			})
		} catch (err) {
			logger.error(`Failed to fetch user ${id}'s stats: ${err.message}`);
			request.log.error(err);
			return handleError(err, reply, `Failed to update user ${id}'s stats`);
		}
	},
	async getMatchHistory(request, reply) {
		const { id } = request.params;
		try {
			const matchHistory = await profileService.getMatchHistory(parseInt(id));
			return reply.code(200).send({
				message: `User ${id}'s match history fetched successfully`,
				matchHistory,
			})
		} catch (err) {
			logger.error(`Failed to fetch user ${id}'s match history: ${err.message}`);
			request.log.error(err);
			return handleError(err, reply, `Failed to fetch user ${id}'s match history`);
		}
	},
	async deleteUser(request, reply) {
		const { id } = request.params;
		try {
			await profileService.deleteUser(parseInt(id));
			logger.info(`User ${id} deleted successfully`);
			return reply.code(204).send({ message: `User ${id} deleted successfully` });
		} catch (err) {
			logger.error(`Failed to delete user ${id}: ${err.message}`);
			request.log.error(err);
			return handleError(err, reply, `Failed to delete user ${id}:  ${err.message}`);
		} 
	},
	async getFriendsList(request, reply) {
		const { id } = request.params;
		try {
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
		const { id } = request.params;
		const { friendId } = request.body;
		try {
			await profileService.addFriend(parseInt(id), parseInt(friendId));
			logger.info(`User ${id} added user ${friendId} as a friend`);
			return reply.code(201).send({ 
				message: `Friendship created between user ${id} and user ${friendId}` 
			});
		} catch (err) {
			logger.error(`Failed to add user ${friendId} to user ${id}'s friend list: ${err.message}`);
			request.log.error(err);
			return handleError(err, reply, `Failed to add friend to user ${id}'s friend list`);
		}
	},
	async deleteFriend(request, reply) {
		const { id } = request.params;
		const { friendId } = request.body;
		try {
			await profileService.deleteFriend(parseInt(id), parseInt(friendId));
			logger.info(`User ${id} deleted user ${friendId} from their friend list`);
			return reply.code(204).send({ message: `User ${id} friendship with ${friendId} has ended permanently` })
		} catch (err) {
			logger.error(`Failed to delete user ${friendId} from user ${id}'s friend list: ${err.message}`);
			request.log.error(err);
			return handleError(err, reply, `Failed to delete user ${id}'s friend`);
		}
	}
}