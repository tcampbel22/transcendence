import { loginController } from "../controllers/login.controller.js";

export default async function loginRoutes(fastify, options) {
    fastify.post("/api/login", loginController.loginUser);
    fastify.get("/api/logout", loginController.logoutUser);
}