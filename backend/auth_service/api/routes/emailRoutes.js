import { sendEmail, validateOTP } from "../controllers/emailController.js";

export default async function emailRoutes(fastify, options) {
    fastify.post("/send-email", sendEmail);
    fastify.post("/verify-otp", validateOTP);
}
