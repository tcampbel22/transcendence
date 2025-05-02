import argon2 from "argon2";
import { prisma } from "../../database/db.js";

export const registerService = {

	async registerUser(userData) {
		
		const { username, email, password, picture } = userData;
		const hashedPassword = await argon2.hash(password);
		
		//Creates a row in the user table with the new user (ATOMIC)
		const result = await prisma.$transaction(async (tx) => {
			const user = await tx.user.create({
				data: {
					username,
					email,
					password: hashedPassword,
					picture,
				},
				select: {
					id: true,
					username: true,
					email: true,
					picture: true,
				}
			});
			//Creates a new row in the userstats table assigned to the newly created user
			await tx.userStats.create({
				data: {
					userId: user.id,
					wins: 0,
					losses: 0,
					matchesPlayed: 0,
				}
			});
			return user;
		});
		return result;
	}
}