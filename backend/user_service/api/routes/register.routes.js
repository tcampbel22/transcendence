import { registerSchema } from "../schemas/post_schemas.js";
import { registerController } from "../controllers/register.controller.js";

export default async function registerRoute(fastify, options) {
	//Add user to db through register page
	fastify.post("/api/user/register", {schema: registerSchema}, registerController.registerUser);
	//get all user from db
	fastify.get("/api/user/register", registerController.getAllUsers);

}

