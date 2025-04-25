import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";
import logger from "@eleekku/logger"

const fastify = Fastify({ logger: true, trustProxy: true });


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
fastify.register(fastifyStatic, {
	root: path.join(__dirname, "dist"),
	prefix: "/",
});

// Start the server
const start = async () => {
	try {
		await fastify.listen({ port: 3000, host: "0.0.0.0" });
		logger.info("Server is running on http://localhost:3000");
	} catch (err) {
		logger.error(err)
		fastify.log.error(err);
		process.exit(1);
	}
};
start();
