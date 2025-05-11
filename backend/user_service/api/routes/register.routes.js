import { registerSchema } from "../schemas/register.schema.js";
import { registerController } from "../controllers/register.controller.js";

export default async function registerRoutes(fastify, options) {
	//Add user to db through register page
	fastify.post("/api/register", {schema: registerSchema}, registerController.registerUser);
}

