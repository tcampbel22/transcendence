import { registerService } from "../services/register.service.js";

export const registerController = {

	async registerUser(request, reply) {
		try {
			const { username, email, password, picture } = request.body;
			const user = await registerService.registerUser({ username, email, password, picture });
			reply.code(201).send({
				message: "User registered successfully",
				userId: user.id,
				username: user.username}); 
		} catch (err) {
			request.log.error(err);
			if (err.code === 'P2002' && err.meta?.target?.includes('username')) {
				return reply.code(409).send({ message: "Username already taken" });
			  }
			return reply.code(500).send({message: "Internal server error"});
		}
	},
	async getAllUsers(request, reply) {
		try {
			const users = await registerService.getAllUsers();
			return reply.code(200).send(users);
		} catch (err) {
			request.log.error(err);
			return reply.code(500).send({message: "Failed to fetch users"});
		}
	}
}