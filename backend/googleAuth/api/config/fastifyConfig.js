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

dotenv.config();


const SSL_CERT_PATH = "./ssl/cert.pem";
const SSL_KEY_PATH = "./ssl/key.pem";

const fastify = Fastify({
	logger: true,
	https: {
		key: fs.readFileSync(SSL_KEY_PATH),
		cert: fs.readFileSync(SSL_CERT_PATH),
	},
});

fastify.register(fastifySecureSession, {
    secret: Buffer.from(process.env.FASTIFY_SECURE_SECRET),
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
    },
});

fastify.register(emailRoutes);

export default fastify;