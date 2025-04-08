import Fastify from "fastify";
import helmet from "@fastify/helmet";
import path from "path";
import { fileURLToPath } from "url";
import fastifyStatic from "@fastify/static";
import authRoute from "./routes/auth.js";
import registerRoute from "./routes/register.js";
import fastifyCors from "@fastify/cors";

const fastify = Fastify({ logger: true });

// Register helmet for security headers
fastify.register(helmet);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
fastify.register(fastifyStatic, {
	root: path.join(__dirname, "frontend/dist"),
	prefix: "/",
});

fastify.register(fastifyCors, {
	origin: ['http://localhost:5173'],  // Allow requests only from your frontend
	methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific methods
	allowedHeaders: ['Content-Type'],  // Allow specific headers if needed
  });

fastify.register(authRoute) 
fastify.register(registerRoute)
// Register routes so ther is a route for each reqeuest which are registered here

/*
fastify.get("/", async (request, reply) => {
	console.log("GET /");
	reply.status(200).send("hello from backend");
	// This is just for testing purposes I guess
})*/

// Start the server
const start = async () => {
	try {
		await fastify.listen({ port: 3000, host: "0.0.0.0" });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();
