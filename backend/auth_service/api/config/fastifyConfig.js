/*This file sets up a Fastify server with secure session management using the @fastify/secure-session plugin. Here's a breakdown of what it does:

Imports dependencies: It loads Fastify for creating the server, @fastify/secure-session for handling secure sessions, and dotenv to manage environment variables.

Creates the Fastify instance: Fastify({ logger: true }) initializes the server with logging enabled.

Registers secure session handling: fastify.register(fastifySecureSession, {...}) 
configures session management using a secret key from environment variables. 
The session cookie is set to be secure, HTTP-only, and accessible throughout the site.*/

import Fastify from 'fastify';
import fastifySecureSession from '@fastify/secure-session';
import dotenv from 'dotenv';
import fs from "fs";
import emailRoutes from "../routes/emailRoutes.js";
import cors from "@fastify/cors";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const fastify = Fastify({
    logger: true,
    ...(isProduction && {
        https: {
            key: fs.readFileSync("./ssl/key.pem"),
            cert: fs.readFileSync("./ssl/cert.pem"),
        },
    }),
});

fastify.register(fastifySecureSession, {
    secret: Buffer.from(process.env.FASTIFY_SECURE_SECRET),
    cookie: {
        path: '/',
        httpOnly: true,
        secure: isProduction, // Solo cookies seguras en producción
    },
});

// Enable CORS for all origins or specify your frontend URL
fastify.register(cors, {
    origin: "http://localhost:5173", // Allow only your frontend
    methods: ["GET", "POST"], // Allow these HTTP methods
});

fastify.register(emailRoutes);

export default fastify;