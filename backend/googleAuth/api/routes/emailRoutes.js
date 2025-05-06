import { sendEmail } from "../controllers/emailController.js";

export default async function emailRoutes(fastify, options) {
    fastify.post("/send-email", sendEmail);
}
