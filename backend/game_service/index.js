import Fastify from "fastify";
import { testConnection } from "./database/db.js";
import  gameRoutes  from "./api/routes/game.routes.js"

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
		  throw new Error('Failed to connect to the database');
		}
		await fastify.listen({ port: 3001, host: "0.0.0.0" });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();