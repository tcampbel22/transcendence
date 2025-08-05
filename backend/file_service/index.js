import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";
import cors from "@fastify/cors";


const fastify = Fastify();

const isDev = process.env.NODE_ENV === "development";
const origin = isDev ? "http://localhost:5173" : "https://transendence.fly.dev"
fastify.register(cors, {
  origin: [origin],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-internal-key"],
  credentials: true,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
fastify.register(fastifyStatic, {
	root: path.join(__dirname, "dist"),
	prefix: "/",
});

fastify.setNotFoundHandler((request, reply) => {
	reply.type("text/html").sendFile("index.html");
  });

// Start the server
const start = async () => {
	try {
		const port = process.env.PORT || 3000
		await fastify.listen({ port, host: '::' });
		fastify.log.info(`Server is listening on ${port}`);
		console.log(`Listening on port ${port}`);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();