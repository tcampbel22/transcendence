import { loginService } from "../services/profile.service.js";

export const loginController = {

	async loginUser(request, reply) {
		const { username, password } = request.body
        const login = loginService.loginUser(username, password);
		if (!login.user)
			return reply.status(401).send({message: 'invalid username'});
		if (!login.isMatch)
			return reply.status(401).send({ message: "invalid username or password" });
		reply.status(200).send(login.user.id);   
	}
};