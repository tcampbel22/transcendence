import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { prisma } from "../../database/db.js";
import { HttpStatusCode } from "axios";

const JWT_SECRET = "daniel1";

export const loginService = {

	async loginUser(username, password) {
		const user = await prisma.user.findFirst( { where: { username }});
		if (!user) {
			return { user: null, isMatch: false };
		}
		const isMatch = await argon2.verify(user.password, password);
		if (!isMatch) {
			return { user: null, isMatch: false };
		}
		// Generate JWT token
		const token = jwt.sign(
			{ id: user.id, username: user.username },
			JWT_SECRET,
			{ expiresIn: "1h"}
		)
		const { password: _, ...noPasswordUser} = user;
		return { user: noPasswordUser, isMatch, token };
	}
}

