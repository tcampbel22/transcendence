import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";

const fastify = Fastify({ logger: true });


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
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();
