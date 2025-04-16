import { loginController } from "../controllers/login.controller.js";

export default async function authLogin(fastify, options) {
    fastify.post("/api/user/login", loginController.loginUser);
}