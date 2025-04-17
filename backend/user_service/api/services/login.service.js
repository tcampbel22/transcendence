import argon2 from "argon2";
import { prisma } from "../../database/db.js";

export const loginService = {

	async loginUser(username, password) {
		const user = await prisma.user.findFirst( { where: { username }});
		if (!user) {
			return { user: null, isMatch: false };
		}
		const isMatch = await argon2.verify(user.password, password);
		const { password: _, ...noPasswordUser} = user;
		return { user: noPasswordUser, isMatch };
	}
}

