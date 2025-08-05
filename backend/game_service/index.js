import Fastify from "fastify";
import { testConnection } from "./database/db.js";
import gameRoutes from "./api/routes/game.routes.js";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";


const fastify = Fastify({
	logger: true,
});

const isDev = process.env.NODE_ENV === "development";
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
      fastify.log.error("game_service failed to connect to the database");
      throw new Error("Failed to connect to the database");
    }
    await fastify.listen({ port: 3001, host: "0.0.0.0" });
    fastify.log.info("game_service connected to the database");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
