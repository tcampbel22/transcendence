import Fastify from "fastify";
import helmet from "@fastify/helmet";

const fastify = Fastify({ logger: true });

// Register helmet for security headers
fastify.register(helmet);

fastify.addHook("preHandler", (request, reply) => {
	console.log("Request received");
	console.log(request.body);
	if (request.headers["content-type"] !== "application/json") {
		reply.code(400).send({ error: "Invalid content type" })
	}
})

fastify.get("/api/login", async (request, reply) => {
	const { username, password } = request.body;
	console.log("Login attempt")

	// here we should implement a real authentication logic
	if (username === "admin" && password === "password") {
		reply.status(200).send({ message: "Login successful!" });
	} else {
		reply.status(401).send({ message: "Invalid credentials" });
	}
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
