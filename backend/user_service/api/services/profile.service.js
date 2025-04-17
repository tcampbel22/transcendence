import { prisma } from "../../database/db.js";
import argon2  from "argon2"

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
			throw new Error("getUser: User cannot be found");
		return user;
	},
	async updateUsername(userId, newUsername) {
		const duplicate = await prisma.user.findUnique({
			where: { username: newUsername }, 
			select: { username: true },
		});
		if (duplicate)
			throw new Error("updateUsername: Username already exists, please choose another");
		const user = await prisma.user.findUnique({
			where: {id: userId},
			select: { id: true },
		});
		if (!user)
			throw new Error("updateUsername: User cannot be found");

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
			throw new Error("updatePicture: User cannot be found");
		if (user.picture === newPicture)
			throw new Error("updatePicture: Picture already exists, please choose another");
			
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
			throw new Error("updatePassword: User cannot be found");
		const hashPassword = await argon2.hash(newPassword);
		const duplicate = await argon2.verify(user.password, hashPassword);
		if (duplicate)
			throw new Error("updatePassword: Password already exists, please choose another");
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
	}
}