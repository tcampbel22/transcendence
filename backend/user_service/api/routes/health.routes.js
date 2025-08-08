import { healthController } from "../controllers/health.controller.js";

export default async function healthRoutes(fastify, options) {
	fastify.get("/api/health", healthController);
}