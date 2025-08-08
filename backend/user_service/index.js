import Fastify from "fastify";
import { testConnection } from "./database/db.js";
import loginRoutes from "./api/routes/login.routes.js";
import registerRoutes from "./api/routes/register.routes.js";
import profileRoutes from "./api/routes/profile.routes.js";
import healthRoutes from "./api/routes/health.routes.js"
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import multipart from "@fastify/multipart";


const fastify = Fastify({
	logger: true });

const isDev = process.env.NODE_ENV === "development";
const origin = isDev ? "http://localhost:5173" : "https://transendence.fly.dev"

fastify.register(cors, {
  origin: [origin],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-internal-key"],
  credentials: true,
});

fastify.register(multipart, {
  addToBody: false,
  limits: {
    fileSize: 10 * 1024 * 1024,
	files: 1,
  },
});

try {
  fastify.register(healthRoutes);
  fastify.register(loginRoutes);
  fastify.register(registerRoutes);
  fastify.register(profileRoutes);
  fastify.register(
    fastifyCookie,
    {
      secret: process.env.JWT_SECRET,
    }, // for cookies signature
  );

} catch (err) {
  fastify.log.error(err);
}

// Start the server
const start = async () => {
  try {
    const dbConnected = await testConnection();
	const port = process.env.PORT || 3002
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
