import { profileService } from "../services/profile.service.js"

export const profileController = {
	async getUser(request, reply){
		try {
			const { id: userId } = request.params;
			const user = await profileService.getUser(userId);
			console.log("inside user: ", user);
			return reply.code(200).send({
				message: `User ${userId} fetched successfully`,
				userId: user.id,
				username: user.username,
				email: user.email,
				picture: user.picture,
			})
		} catch (err) {
			request.log(err);
			return reply.code(500).send({ messgae: `Failed to fetch user ${userId}`});
		}
	},
	async updateUsername(request, reply) {
		try {
			const { id: userId } = request.params;
			const { newUsername } = request.body;
			const user = await profileService.updateUsername(userId, newUsername);
			return reply.code(201).send({
				message: `User ${userId}'s username updated successfully`,
				userId: user.id,
				newUsername: user.username,
			});
		} catch (err) {
			request.log(err);
			return reply.code(500).send({ message: `Failed to update user ${userId}'s username`});
		}
	},
	async updatePicture(request, reply) {
		try {
			const { id: userId } = request.params;
			const { newPicture } = request.body;
			const user = await profileService.updatePicture(userId, newPicture);
			return reply.code(201).send({
				message: `User ${userId}'s profile picture updated successfully`,
				userId: user.id,
				picture: user.picture,
			});
		} catch (err) {
			request.log(err);
			return reply.code(500).send({ message: `Failed to update user${userId}'s profile picture`});
		}
	},
	async updatePassword(request, reply) {
		try {
			const { id: userId } = request.params;
			const { newPassword } = request.body;
			const user = await profileService.updatePassword(userId, newPassword);
			return reply.code(201).send({
				message: `User ${userId}'s password updated successfully`,
				userId: user.id,
			});
		} catch (err) {
			request.log(err);
			return reply.code(500).send({ message: `Failed to update user ${userId}'s password`});
		}
	},
	async getStats(request, reply) {
		try {
			const { userId } = request.params;
			const user = await profileService.getStats(userId);
			return reply.code(200).send({
				message: `User ${userId}'s stats fetched successfully`,
				userId: user.id,
				wins: user.wins,
				losses: user.losses,
				matchesPlayed: user.matchesPlayed,
			})
		} catch (err) {
			request.log(err);
			return reply.code(500).send({ message: `Failed to fetch user ${userId}'s stats`});
		}
	},
	async getMatchHistory(request, reply) {
		try {
			const { id: userId } = request.params;
			const matchHistory = await profileService.getMatchHistory(userId);
			return reply.code(200).send({
				message: `User ${userId}'s match history fetched successfully`,
				matchHistory,
			})
		} catch (err) {
			request.log(err);
			return reply.code(500).send({ message: `Failed to fetch user ${userId}'s match history`});
		}
	},
	async deleteUser(request, reply) {
		try {
			const { id: userId } = request.params;
			await profileService.deleteUser(userId);
			return reply.code(204).send({ message: `User ${userId} deleted successfully` });
		} catch (err) {
			request.log(err);
			return reply.code(500).send({ message: `Failed to delete user ${userId}`});
		} 
	},
	async getFriendsList(request, reply) {
		try {
			const { id: userId } = request.params;
			friendList = await profileService.getFriendsList(userId);
			if (friendList.length === 0) {
				return reply.code(200).send({
					message: `User ${userId} has no friends... :(`,
					friendList: [],
				});
			}
			return reply.code(200).send({
				message: `User ${userId} friends list fetched successfully`,
				friendList,
			});
		} catch (err) {
			request.log(err);
			return reply.code(500).send({ message: `Failed to fetch user ${userId}'s friend list`});
		}
	},
	async addFriend(request, reply) {
		try {
			const { id: userId } = request.params;
			const { friendId } = request.body;
			await profileService.addFriend(parseInt(userId), parseInt(friendId));
			return reply.code(201).send({ 
				message: `Friendship created between user ${userId} and user ${friendId}` 
			});
		} catch (err) {
			request.log(err);
			return reply.code(500).send({ message: `Failed to add friend to user ${userId}'s friend list`});
		}
	},
	async deleteFriend(request, reply) {
		try {
			const { id: userId } = request.params;
			const { friendId } = request.body;
			await profileService.deleteFriend(parseInt(userId), parseInt(friendId));
			return reply.code(204).send({ message: `User ${userId} friendship with ${friendId} has ended permanently` })
		} catch (err) {
			request.log(err);
			return reply.code(500).send({ message: `Failed to delete user ${userId}'s friend`});
		}
	}
}