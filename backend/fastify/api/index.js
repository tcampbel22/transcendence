import Fastify from "fastify";
import helmet from "@fastify/helmet";
//import fastifyCors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";
import authRoute from "./routes/auth.js";
import registerRoute from "./routes/register.js";
import { testConnection } from "../database/db.js";

const fastify = Fastify({ logger: true });

// Register helmet for security headers
fastify.register(helmet, {
  contentSecurityPolicy: false,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "dist"),
  prefix: "/",
});

try {
  fastify.register(authRoute);
  fastify.register(registerRoute);
  // await fastify.register(cors)
} catch (err) {
  fastify.log.error(err);
}

// Start the server
const start = async () => {
  try {
    const dbConnected = await testConnection();
    if (!dbConnected) {
      throw new Error("Failed to connect to the database");
    }
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();