import { loginService } from "../services/login.service.js";
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
				secure: true,
				sameSite: "strict",
				maxAge: 3600,
			});
			logger.info(`User logged in: ${login.user.username}, ID: ${login.user.id}`);
			reply.status(200).send({
				userId: login.user.id,
				username: login.user.username
			});  
		} catch (err) {
			logger.error(`Error logging in user: ${err.message}`);
			request.log.error(err);
			reply.status(500).send({ message: "loginUser: Internal server error!" });
		}
	}
};