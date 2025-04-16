import Fastify from "fastify";
import { testConnection } from "./database/db.js";
import  userRoutes  from "./api/routes/user.routes.js"

const fastify = Fastify({ logger: true });

try {
	fastify.register(userRoutes);
} catch (err) {
	fastify.log.error(err);
}

// Start the server
const start = async () => {
	try {
		const dbConnected = await testConnection();
		if (!dbConnected) {
		  throw new Error('Failed to connect to the user database');
		}
		await fastify.listen({ port: 3002, host: "0.0.0.0" });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();