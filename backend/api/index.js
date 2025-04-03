import Fastify from "fastify";
import helmet from "@fastify/helmet";
import authRoute from "./routes/auth.js";
import registerRoute from "./routes/register.js";

const fastify = Fastify({ logger: true });

// Register helmet for security headers
fastify.register(helmet);

fastify.register(authRoute) 
fastify.register(registerRoute)
// Register routes so ther is a route for each reqeuest which are registered here

fastify.get("/", async (request, reply) => {
	console.log("GET /");
	reply.status(200).send("hello from backend");
	// This is just for testing purposes I guess
})

fastify.post("/api/register", async (request, reply) => {
	console.log("GET /api/register");
	const { username, password } = request.body;	
})

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
