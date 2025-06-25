import Fastify from "fastify";
import { testConnection } from "./database/db.js";
import gameRoutes from "./api/routes/game.routes.js";
import logger from "@eleekku/logger";
import fs from "fs";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";

const SSL_CERT_PATH = "ssl/cert.pem";
const SSL_KEY_PATH = "ssl/key.pem";

const isProduction = process.env.NODE_ENV === "production";

const fastify = Fastify({
  logger: true,
  ...(isProduction && {
    https: {
      key: fs.readFileSync(SSL_KEY_PATH),
      cert: fs.readFileSync(SSL_CERT_PATH),
    },
  }),
});

fastify.register(cors, {
  origin: ["http://localhost:5173"], // 👈 Vite's default dev server port
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
      logger.error("game_service failed to connect to the database");
      throw new Error("Failed to connect to the database");
    }
    await fastify.listen({ port: 3001, host: "0.0.0.0" });
    logger.info("game_service connected to the database");
  } catch (err) {
    logger.error(err);
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
