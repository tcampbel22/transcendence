import Fastify from "fastify";
import { testConnection } from "./database/db.js";
import  loginRoutes  from "./api/routes/login.routes.js"
import registerRoutes from "./api/routes/register.routes.js";
import profileRoutes from "./api/routes/profile.routes.js";
import logger from "@eleekku/logger"

const fastify = Fastify({ logger: true });

try {
	fastify.register(loginRoutes);
	fastify.register(registerRoutes);
	fastify.register(profileRoutes);
} catch (err) {
	logger.error(err);
	fastify.log.error(err);
}

// Start the server
const start = async () => {
	try {
		const dbConnected = await testConnection();
		if (!dbConnected) {
			logger.error('user_service failed to connect to the user database')
		  throw new Error('Failed to connect to the user database');
		}
		logger.info('user_service connected to the user database')
		await fastify.listen({ port: 3002, host: "0.0.0.0" });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();