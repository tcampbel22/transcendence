import { ErrorNotFound } from "../../../libs/error_lib/error.js";
import { profileService } from "../services/profile.service.js"
import { handleError } from "@app/errors"

export const profileController = {
	async getUser(request, reply){
		try {
			const { id } = request.params;
			const user = profileService.getUser(id);
			return reply.code(200).send({
				message: `User ${id} fetched successfully`,
				id: user.id,
				username: user.username,
				email: user.email,
				picture: user.picture,
			})
		} catch (err) {
			request.log(err);
			return handleError(err, reply, `Failed to fetch user ${id}`);
		}
	},
	async updateUsername(request, reply) {
		try {
			const { id } = request.params;
			const { newUsername } = request.body;
			const user = await profileService.updateUsername(id, newUsername);
			return reply.code(201).send({
				message: `User ${id}'s username updated successfully`,
				id: user.id,
				newUsername: user.username,
			});
		} catch (err) {
			request.log(err);
			return handleError(err, reply, `Failed to update user ${id}'s username`);
		}
	},
	async updatePicture(request, reply) {
		try {
			const { id } = request.params;
			const { newPicture } = request.body;
			const user = await profileService.updatePicture(id, newPicture);
			return reply.code(201).send({
				message: `User ${id}'s profile picture updated successfully`,
				id: user.id,
				picture: user.picture,
			});
		} catch (err) {
			request.log(err);
			return handleError(err, reply, `Failed to update user${id}'s profile picture`);
		}
	},
	async updatePassword(request, reply) {
		try {
			const { id } = request.params;
			const { newPassword } = request.body;
			const user = await profileService.updatePassword(id, newPassword);
			return reply.code(201).send({
				message: `User ${id}'s password updated successfully`,
				id: user.id,
			});
		} catch (err) {
			request.log(err);
			return handleError(err, reply, `Failed to update user ${id}'s password`);
		}
	},
	async getStats(request, reply) {
		try {
			const { id } = request.params;
			const user = await profileService.getStats(id);
			return reply.code(200).send({
				message: `User ${id}'s stats fetched successfully`,
				id: user.id,
				wins: user.wins,
				losses: user.losses,
				matchesPlayed: user.matchesPlayed,
			})
		} catch (err) {
			request.log(err);
			return handleError(err, reply, `Failed to fetch user ${id}'s stats`);
		}
	},
	async getMatchHistory(request, reply) {
		try {
			const { id } = request.params;
			const matchHistory = await profileService.getMatchHistory(id);
			return reply.code(200).send({
				message: `User ${id}'s match history fetched successfully`,
				matchHistory,
			})
		} catch (err) {
			request.log(err);
			return handleError(err, reply, `Failed to fetch user ${id}'s match history`);
		}
	},
	async deleteUser(request, reply) {
		try {
			const { id } = request.params;
			await profileService.deleteUser(id);
			return reply.code(204).send({ message: `User ${id} deleted successfully` });
		} catch (err) {
			request.log(err);
			return handleError(err, reply, `Failed to delete user ${id}`);
		} 
	},
	async getFriendsList(request, reply) {
		try {
			const { id } = request.params;
			friendList = await profileService.getFriendsList(id);
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
			request.log(err);
			return handleError(err, reply, `Failed to fetch user ${id}'s friend list`);
		}
	},
	async addFriend(request, reply) {
		try {
			const { id } = request.params;
			const { friendId } = request.body;
			await profileService.addFriend(parseInt(id), parseInt(friendId));
			return reply.code(201).send({ 
				message: `Friendship created between user ${id} and user ${friendId}` 
			});
		} catch (err) {
			request.log(err);
			return handleError(err, reply, `Failed to add friend to user ${id}'s friend list`);
		}
	},
	async deleteFriend(request, reply) {
		try {
			const { id } = request.params;
			const { friendId } = request.body;
			await profileService.deleteFriend(parseInt(id), parseInt(friendId));
			return reply.code(204).send({ message: `User ${id} friendship with ${friendId} has ended permanently` })
		} catch (err) {
			request.log(err);
			return handleError(err, reply, `Failed to delete user ${id}'s friend`);
		}
	}
}