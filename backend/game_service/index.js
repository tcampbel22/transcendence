import Fastify from "fastify";
import { testConnection } from "./database/db.js";
import gameRoutes  from "./api/routes/game.routes.js"
import logger from "@eleekku/logger"

const fastify = Fastify({ logger: true });

try {
	fastify.register(gameRoutes);
} catch (err) {
	fastify.log.error(err);
}

// Start the server
const start = async () => {
	try {
		console.log("Connecting to DB from:", process.cwd());
		const dbConnected = await testConnection();
		if (!dbConnected) {
			logger.error('game_service failed to connect to the database')
		  throw new Error('Failed to connect to the database');
		}
		await fastify.listen({ port: 3001, host: "0.0.0.0" });
		logger.info('game_service connected to the database')
	} catch (err) {
		logger.error(err);
		fastify.log.error(err);
		process.exit(1);
	}
};
start();