import Fastify from "fastify";
import { testConnection } from "./database/db.js";
import loginRoutes from "./api/routes/login.routes.js";
import registerRoutes from "./api/routes/register.routes.js";
import profileRoutes from "./api/routes/profile.routes.js";
import logger from "@eleekku/logger"
import cors from '@fastify/cors';
import fastifyCookie from "@fastify/cookie";
import fs from "fs";
import multipart from "@fastify/multipart"
import path from "path";
import fastifyStatic from '@fastify/static'; // for static file setup


const SSL_CERT_PATH = "./ssl/cert.pem";
const SSL_KEY_PATH = "./ssl/key.pem";

const isProduction = process.env.NODE_ENV === "production";

const fastify = Fastify({
	logger: true,
	...(isProduction && {
	https: {
		key: fs.readFileSync(SSL_KEY_PATH),
		cert: fs.readFileSync(SSL_CERT_PATH),
	},
	}),
});
//testing purposes only to get frontend connected in the dev env.
fastify.register(cors, {
	origin: ["http://localhost:5173"],
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
	credentials: true,
});

fastify.register(multipart, {
	addToBody: false,
	limits: {
	  fileSize: 10 * 1024 * 1024
	}
});
try {
	fastify.register(loginRoutes);
	fastify.register(registerRoutes);
	fastify.register(profileRoutes);
	fastify.register(fastifyCookie, {
		secret: process.env.JWT_SECRET }, // for cookies signature
	)
	fastify.register(fastifyStatic, {
		root: path.join(process.cwd(), "uploads"), // Adjust this path to your uploads directory
		prefix: "/uploads/", // The URL path prefix for your images
	});
} catch (err) {
	logger.error(err);
	fastify.log.error(err);
}

// Start the server
const start = async () => {
	try {
		const dbConnected = await testConnection();
		if (!dbConnected) {
			logger.error("user_service failed to connect to the user database");
			throw new Error("Failed to connect to the user database");
		}
		logger.info("user_service connected to the user database");
		await fastify.listen({ port: 3002, host: "0.0.0.0" });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();
