import Fastify from 'fastify';
import fastifySecureSession from '@fastify/secure-session';
import dotenv from 'dotenv';

dotenv.config();

export const fastify = Fastify({ logger: true });

fastify.register(fastifySecureSession, {
    secret: Buffer.from(process.env.FASTIFY_SECURE_SECRET),
    cookie: {
        path: '/',
        httpOnly: true,
        secure: true, // HTTPS recomendado
    },
});
