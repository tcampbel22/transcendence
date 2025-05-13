import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import logger from "@eleekku/logger";
import fastifyHelmet from "@fastify/helmet";

const SSL_CERT_PATH = "./ssl/cert.pem";
const SSL_KEY_PATH = "./ssl/key.pem";

const fastify = Fastify({
	logger: true,
	https: {
		key: fs.readFileSync(SSL_KEY_PATH),
		cert: fs.readFileSync(SSL_CERT_PATH),
	},
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
fastify.register(fastifyStatic, {
	root: path.join(__dirname, "dist"),
	prefix: "/",
});
fastify.register(fastifyHelmet, {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'blob:', "https://localhost:4433"],
    }
  }
});

// Start the server
const start = async () => {
	try {
		await fastify.listen({ port: 3000, host: "0.0.0.0" });
		logger.info("Server is running on http://localhost:3000");
	} catch (err) {
		logger.error(err);
		fastify.log.error(err);
		process.exit(1);
	}
};
start();