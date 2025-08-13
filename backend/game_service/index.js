import Fastify from "fastify";
import { testConnection } from "./database/db.js";
import healthRoutes from "./api/routes/health.routes.js";
import gameRoutes from "./api/routes/game.routes.js";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";


const fastify = Fastify({
	logger: true });

const isDev = process.env.NODE_ENV === "dev";
const origin = isDev ? "http://localhost:5173" : "https://transendence.fly.dev"
fastify.register(cors, {
  origin: [origin],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-internal-key"],
  credentials: true,
});

try {
  fastify.register(fastifyCookie, {
  secret: process.env.JWT_SECRET, // for cookies signature
  });
  fastify.register(healthRoutes);
  fastify.register(gameRoutes);
} catch (err) {
  fastify.log.error(err);
}

// Start the server
const start = async () => {
    try {
		const dbConnected = await testConnection();
		const port = process.env.PORT || 3001
		if (!dbConnected) {
		  throw new Error("Failed to connect to the user database");
		}
		await fastify.listen({ port, host: '::' });
		fastify.log.info(`user service listening on ${port}`)
	  } catch (err) {
		fastify.log.error(err);
		process.exit(1);
	  }
};
start();
