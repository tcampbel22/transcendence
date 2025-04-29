import { registerService } from "../services/register.service.js";
import { normalize } from "../utils/normalize.js";
import { checkForExistingUser } from "../utils/checkForExisting.js";
import { prisma } from "../../database/db.js";
import logger from "@eleekku/logger";

export const registerController = {

	async registerUser(request, reply) {
		try {
			const { username, email, password, picture } = normalize(request.body);
			if (password.toLowerCase().includes(username.toLowerCase())) {
				logger.info(`User registration failed: ${username} tried to use username in password`);
				return reply.code(400).send({ message: "Password cannot contain username or vice versa" });
			}
			const existingUser = await checkForExistingUser(prisma, username);
			if (existingUser) {
				logger.info(`User registration failed: ${username} already exists`);
				return reply.code(409).send({ message: "Username or email already taken" });
			}
			const user = await registerService.registerUser({ username, email, password, picture });
			logger.info(`User registered: ${user.username}, ID: ${user.id}`);
			reply.code(201).send({
				message: "User registered successfully",
				id: user.id,
				username: user.username, 
				email: user.email
			});
		} catch (err) {
			logger.error(`Error registering user: ${err.message}`);
			request.log.error(err);
			return reply.code(500).send({ message: "Internal server error" });
		}
	},
	async getAllUsers(request, reply) {
		try {
			const users = await registerService.getAllUsers();
			return reply.code(200).send(users);
		} catch (err) {
			logger.error(`Error fetching users: ${err.message}`);
			request.log.error(err);
			return reply.code(500).send({ message: "Failed to fetch users" });
		}
	}
}