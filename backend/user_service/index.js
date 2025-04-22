import Fastify from "fastify";
import { testConnection } from "./database/db.js";
import  loginRoutes  from "./api/routes/login.routes.js"
import registerRoutes from "./api/routes/register.routes.js";
import profileRoutes from "./api/routes/profile.routes.js";
import cors from '@fastify/cors';

const fastify = Fastify({ logger: true });

//testing purposes only to get frontend connected in the dev env.
fastify.register(cors, {
	origin: ["http://localhost:5173"], // 👈 Vite's default dev server port
	method: ["GET", "POST", "PUT", "DELETE"]
  });

try {
	fastify.register(loginRoutes);
	fastify.register(registerRoutes);
	fastify.register(profileRoutes);
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