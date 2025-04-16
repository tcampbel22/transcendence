import argon2 from "argon2";
import { prisma } from "../../database/db.js";

export const loginService = {

	async loginUser(username, password) {
		const user = await prisma.user.findFirst( { where: { username }});
		const isMatch = await argon2.verify(user.password, password);
		return { user, isMatch };
	}
}

