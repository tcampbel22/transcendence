import Fastify from "fastify";
import helmet from "@fastify/helmet";
import authRoute from "./routes/auth.js";

const fastify = Fastify({ logger: true });

// Register helmet for security headers
fastify.register(helmet);

fastify.register(authRoute) 
/*this will route all requests to /api/login to the authRoute function. We can also use fastify.register(authRoute, 
{ prefix: "/api" }) to add a prefix to all routes in the authRoute function. authRoute is in routes/auth.js*/

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
