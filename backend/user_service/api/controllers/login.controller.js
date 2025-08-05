import { loginService } from "../services/login.service.js";
import jsonwebtoken from "jsonwebtoken";
import { ErrorNotFound, ErrorUnAuthorized, handleError } from "../utils/error.js"

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
				path: "/",
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
				maxAge: 3600
			});
			request.log.info(`User logged in: ${login.user.username}, ID: ${login.user.id}`);
			reply.status(200).send({
				userId: login.user.id,
				username: login.user.username,
				email: login.user.email,
				isOnline: login.user.isOnline,
				is2faEnabled: login.user.is2faEnabled
			});  
		} catch (err) {
			request.log.error(`Error logging in user: ${err.message}`);
			reply.status(500).send({ message: "loginUser: Internal server error!" });
		}
	},

	async logoutUser(request, reply) {
		try {
			const token = request.cookies.token;
			let userId = null;
			let username = null;

			if (token) {
			try {
				const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
				userId = decoded.id;
				username = decoded.username;
				request.log.info(`User logged out: ${username}, ID: ${userId}`);
				await loginService.logoutUser(parseInt(userId));
			} catch (err) {
				// Token is invalid or expired, just proceed to clear cookie
				request.log.info("Logout: token was invalid or expired.");
			}
			} else {
			request.log.info("Logout: no token present.");
			}

			reply.clearCookie("token");
			reply.status(200).send({ 
			message: "Logged out successfully"
			});
		} catch (err) {
			request.log.error(`Error logging out user: ${err.message}`);
			return handleError(err, reply, `Failed to logout user`);
		}
	}

};