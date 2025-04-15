import { authController } from "../controllers/auth.controller.js";

export default async function authRoute(fastify, options) {
    fastify.post("/api/login", authController.authUser);
}