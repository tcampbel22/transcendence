import { registerService } from "../services/register.service.js";
import { checkForExistingUser } from "../utils/checkForExisting.js";
import { prisma } from "../../database/db.js";

export const registerController = {

	async registerUser(request, reply) {
		try {
			const { username, email, password } = request.body;
			if (password.toLowerCase().includes(username.toLowerCase())) {
				request.log.info(`User registration failed: ${username} tried to use username in password`);
				return reply.code(400).send({ message: "Password cannot contain username or vice versa" });
			}
			const existingUser = await checkForExistingUser(prisma, username);
			if (existingUser) {
				request.log.info(`User registration failed: ${username} already exists`);
				return reply.code(409).send({ 
					message: "Username or email already taken",
					id: existingUser.id
				 });
			}
			const picture = 'default.png';
			const user = await registerService.registerUser({ username, email, password, picture });
			request.log.info(`User registered: ${user.username}, ID: ${user.id}`);
			reply.code(201).send({
				message: "User registered successfully",
				id: user.id,
				username: user.username, 
				email: user.email,
				picture
			});
		} catch (err) {
			request.log.error(`Error registering user: ${err}`);
			return reply.code(500).send({ message: "Internal server error" });
		}
	}
}