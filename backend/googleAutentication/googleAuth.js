import Fastify from 'fastify';
import fastifySecureSession from '@fastify/secure-session';
import fastifyPassport from '@fastify/passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import dotenv from 'dotenv';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const fastify = Fastify({ logger: true });

// Register plugins
fastify.register(fastifySecureSession, {
    secret: Buffer.from(process.env.FASTIFY_SECURE_SECRET),
    cookie: {
        path: '/',
        httpOnly: true,
        secure: true, // Set to true if using HTTPS
    },
});

fastify.register(fastifyPassport.initialize());
fastify.register(fastifyPassport.secureSession());

fastifyPassport.use(
    'google',
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);

fastifyPassport.registerUserSerializer(async (user, request) => user);
fastifyPassport.registerUserDeserializer(async (user, request) => user);

fastify.get(
    '/auth/google',
    { preValidation: fastifyPassport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }) },
    async (req, reply) => {}
);

fastify.get('/auth/google/callback',
    { preValidation: fastifyPassport.authenticate('google', { failureRedirect: '/' }) },
    async (req, reply) => {
        const profile = req.user;
        const userData = encodeURIComponent(JSON.stringify({//need to change this to response.data.id
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
        }));
        try {
            const payload = {
                username : profile.displayName,
                email : profile.emails[0].value,
                password : profile.id,
            }
            const response = await axios.post(`http://user_service:3002/api/register`, payload)
            console.log('Respuesta del servicio de usuario:', response.data);
            reply.redirect(`/auth/google/callback.html?user=${userData}`);
        }
        catch (error) {
            if (error.response) {
                console.error('Error al registrar el usuario:', error.response.data);
            } else {
                console.error('Error al registrar el usuario:', error.message); 
            }
            reply.redirect(`/auth/google/callback.html?user=${userData}`);
        }
    }
  );

  fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/auth/google/',
});

fastify.listen({ port: 3003, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Servidor ejecutándose en ${address}`);
});
