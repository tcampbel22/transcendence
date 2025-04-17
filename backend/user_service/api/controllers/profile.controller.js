import { profileService } from "../services/profile.service.js"

export const profileController = {
	async getUser(request, reply){
		try {
			const { id: userId } = request.params;
			const user = profileService.getUser(userId);
			return reply.code(200).send({
				message: "User fetched successfully",
				userId: user.id,
				username: user.username,
				email: user.email,
				picture: user.picture,
			})
		} catch (err) {
			request.log(err);
			return reply.code(500).send({ messgae: "Failed to fetch user"});
		}
	},
	async updateUsername(request, reply) {
		try {
			const { id: userId } = request.params;
			const { newUsername } = request.body;
			const user = profileService.updateUsername(userId, newUsername);
			return reply.code(201).send({
				message: "Username updated successfully",
				userId: user.id,
				username: user.username,
			});
		} catch (err) {
			request.log(err);
			return reply.code(500).send({ message: "Failed to update username"});
		}
	},
	async updatePicture(request, reply) {
		try {
			const { id: userId } = request.params;
			const { newPicture } = request.body;
			const user = profileService.updatePicture(userId, newPicture);
			return reply.code(201).send({
				message: "Profile picture updated successfully",
				userId: user.id,
				picture: user.picture,
			});
		} catch (err) {
			request.log(err);
			return reply.code(500).send({ message: "Failed to update profile picture"});
		}
	},
	async updatePassword(request, reply) {
		try {
			const { id: userId } = request.params;
			const { newPassword } = request.body;
			const user = profileService.updatePassword(userId, newPassword);
			return reply.code(201).send({
				message: "Password updated successfully",
				userId: user.id,
			});
		} catch (err) {
			request.log(err);
			return reply.code(500).send({ message: "Failed to update password"});
		}
	},
	async getStats(request, reply) {
		try {
			const { userId } = request.params;
			const user = profileService.getStats(userId);
			return reply.code(200).send({
				message: "User stats fetched successfully",
				userId: user.id,
				wins: user.wins,
				losses: user.losses,
				matchesPlayed: user.matchesPlayed,
			})
		} catch (err) {
			request.log(err);
			return reply.code(500).send({ message: "Failed to fetch user stats"});
		}
	},
	async getMatchHistory(request, reply) {
		try {
			const { id: userId } = request.params;
			const user = profileService.getMatchHistory(userId);
			return reply.code(200).send({
				message: "User's match history fetched successfully",
				userId: user.id,
				wins: user.wins,
				losses: user.losses,
				matchesPlayed: user.matchesPlayed,
			})
		} catch (err) {
			request.log(err);
			return reply.code(500).send({ message: "Failed to fetch users match history"});
		}
	}
}