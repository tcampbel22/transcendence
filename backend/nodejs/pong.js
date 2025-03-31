import Fastify from "fastify";
import helmet from "@fastify/helmet";

const fastify = Fastify({ logger: true });

await fastify.register(helmet);

// Declare a route
fastify.get("/", async (request, reply) => {
	return { hello: "world" };
});

// Health check route
fastify.get("/api/health", async (request, reply) => {
	return { status: "ok" };
});

// Calculator route
fastify.post("/api/calculate", async (request, reply) => {
	const numbers = request.body.numbers;
	try {
		const result = numbers
			.split(",")
			.map((x) => parseInt(x.trim()))
			.reduce((a, b) => a + b);
		return `Result: ${result}`;
	} catch (error) {
		reply.code(400);
		return "Invalid input";
	}
});

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
