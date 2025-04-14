import argon2 from "argon2";
import { prisma } from "../../database/db.js";

export const registerService = {

	async registerUser(userData) {
		
		const { username, email, password } = userData;
		const hashedPassword = await argon2.hash(password);
		
		const user = await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
			},
		});

		await prisma.userStats.create({
			data: {
				userId: user.id,
				wins: 0,
				losses: 0,
				matchesPlayed: 0,
			}
		});

		const { password: _, ...userNoPassword } = user;
		return userNoPassword;
	},

	async getAllUsers() {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				username: true,
				email: true,
				picture: true,
			}
		});
		return users;
	}
}