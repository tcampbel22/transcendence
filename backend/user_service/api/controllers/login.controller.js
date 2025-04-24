import { loginService } from "../services/login.service.js";

export const loginController = {

	async loginUser(request, reply) {
		try {
			const { username, password } = request.body
			const login = await loginService.loginUser(username, password);
			if (!login.user)
				return reply.status(401).send({message: 'invalid username'});
			if (!login.isMatch)
				return reply.status(401).send({ message: "invalid username or password" });
			reply.status(200).send(login.user.id); 
		} catch (err) {
			request.log.error(err);
			reply.status(500).send({ message: "loginUser: Internal server error" });
		}
	}
};