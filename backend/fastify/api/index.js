import Fastify from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";
import authRoute from "./routes/auth.routes.js";
import registerRoute from "./routes/register.routes.js";
import { testConnection } from "../database/db.js";

const fastify = Fastify({ logger: true });

// Register helmet for security headers
fastify.register(helmet);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
fastify.register(fastifyStatic, {
	root: path.join(__dirname, "dist"),
	prefix: "/",
});
try {
	fastify.register(authRoute);
	fastify.register(registerRoute);
	// fastify.register(gameRoutes);
	fastify.register(cors, {
  		origin: '*',
  		methods: ['GET', 'POST', 'PUT', 'DELETE'],
  		allowedHeaders: ['Content-Type', 'Authorization'],
	});
} catch (err) {
	fastify.log.error(err);
}

// fastify.register(fastifyCors, {
// 	origin: ['http://localhost:5173'],  // Allow requests only from your frontend
// 	methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific methods
// 	allowedHeaders: ['Content-Type'],  // Allow specific headers if needed
//   });

// fastify.register(authRoute) 
// fastify.register(registerRoute)

// Start the server
const start = async () => {
	try {
		const dbConnected = await testConnection();
		if (!dbConnected) {
		  throw new Error('Failed to connect to the database');
		}
		await fastify.listen({ port: 3000, host: "0.0.0.0" });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();
