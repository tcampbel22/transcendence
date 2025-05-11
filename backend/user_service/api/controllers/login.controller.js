import { loginService } from "../services/login.service.js";
import jsonwebtoken from "jsonwebtoken";
import logger from "@eleekku/logger"

export const loginController = {

	async loginUser(request, reply) {
		try {
			const { username, password } = request.body
			const login = await loginService.loginUser(username, password);
			if (!login.user)
				return reply.status(401).send({message: 'invalid username'});
			if (!login.isMatch)
				return reply.status(401).send({ message: "invalid username or password" });

			reply.setCookie("token", login.token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
				maxAge: 3600,
			});
			logger.info(`User logged in: ${login.user.username}, ID: ${login.user.id}`);
			reply.status(200).send({
				userId: login.user.id,
				username: login.user.username,
				email: login.user.email,
			});  
		} catch (err) {
			logger.error(`Error logging in user: ${err.message}`);
			request.log.error(err);
			reply.status(500).send({ message: "loginUser: Internal server error!" });
		}
	},

	async logoutUser(request, reply) {
		try {
			const token = request.cookies.token;
			// Decode the token to get user information
			const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
			logger.info(`User logged out: ${decoded.username}, ID: ${decoded.id}`);
			reply.clearCookie("token");
			reply.status(200).send({ message: "Logged out successfully" });
		} catch (err) {
			logger.error(`Error logging out user: ${err.message}`);
			request.log.error(err);
			reply.status(500).send({ message: "logoutUser: Internal server error!" });
		}
	}
};