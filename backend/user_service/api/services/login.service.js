import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { prisma } from "../../database/db.js";
import { HttpStatusCode } from "axios";
import { ErrorNotFound, ErrorUnAuthorized, handleError } from "@app/errors"

const JWT_SECRET = "daniel1";

export const loginService = {

	async loginUser(username, password) {
		const userCheck = await prisma.user.findFirst({ 
			where: { username }, 
			select: { 
				id: true,
				username: true,
				password: true
			 }
		});
		if (!userCheck) {
			return { user: null, isMatch: false };
		}
		const isMatch = await argon2.verify(userCheck.password, password);
		if (!isMatch) {
			return { user: null, isMatch: false };
		}
		// Generate JWT token
		const token = jwt.sign(
			{ id: userCheck.id, username: userCheck.username },
			JWT_SECRET,
			{ expiresIn: "1h"}
		)
		const user = await prisma.user.update({ 
			where: { id: userCheck.id }, 
			data: { isOnline: true },
			select: {
				id: true,
				username: true,
				email: true,
				picture: true,
				isOnline: true
			}
		})
		return { user, isMatch, token };
	},

	async logoutUser(id) {
		const user = await prisma.user.update({
			where: { id: id }, 
			data: { isOnline: false },
			select: { 
				id: true,
				isOnline: true
			}
		});
		if (!user)
			throw new ErrorNotFound(`User ${id} cannot be found`);
		return user;
	}
}

