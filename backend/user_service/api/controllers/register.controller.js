import { registerService } from "../services/register.service.js";
import { normalize } from "../utils/normalize.js";
import { checkForExistingUser } from "../utils/checkForExisting.js";
import { prisma } from "../../database/db.js";

export const registerController = {

	async registerUser(request, reply) {
		try {
			const { username, email, password, picture } = normalize(request.body);
			if (password.toLowerCase().includes(username.toLowerCase())) {
				return reply.code(400).send({ message: "Password cannot contain username or vice versa" });
			}
			const existingUser = await checkForExistingUser(prisma, username);
			if (existingUser) {
				return reply.code(409).send({ message: "Username or email already taken" });
			}
			const user = await registerService.registerUser({ username, email, password, picture });
			reply.code(201).send({
				message: "User registered successfully",
				id: user.id,
				username: user.username}); 
		} catch (err) {
			request.log.error(err);
			return reply.code(500).send({ message: "Internal server error" });
		}
	},
	async getAllUsers(request, reply) {
		try {
			const users = await registerService.getAllUsers();
			return reply.code(200).send(users);
		} catch (err) {
			request.log.error(err);
			return reply.code(500).send({ message: "Failed to fetch users" });
		}
	}
}