import Fastify from 'fastify';
import fastifySecureSession from '@fastify/secure-session';
import fastifyPassport from '@fastify/passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify({ logger: true });

const prisma = new PrismaClient();

export const saveUser = async (userData) => {
    try {
        const existingUser = await prisma.user.findUnique({
            where: { googleId: userData.googleId },
        });

        if (existingUser) {
            console.log('Usuario ya existente:', existingUser);
        } else {
            const newUser = await prisma.user.create({
                data: {
                    googleId: userData.googleId,
                    name: userData.name,
                    email: userData.email,
                },
            });
            console.log('Usuario agregado:', newUser);
        }
    } catch (error) {
        console.error('Error al manejar el usuario:', error.message);
    } finally {
        await prisma.$disconnect(); // Cerrar conexiones
    }
};

// Register plugins
fastify.register(fastifySecureSession, {
    secret: Buffer.from(process.env.FASTIFY_SECURE_SECRET),
    cookie: {
        path: '/',
        httpOnly: true,
        secure: true, // Cambiar a true para producción
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

fastify.get(
  '/auth/google/callback',
  { preValidation: fastifyPassport.authenticate('google', { failureRedirect: '/' }) },
  async (req, reply) => {
      try {
          const profile = req.user;
          const userData = {
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
          };
          await saveUser(userData);
          reply.redirect('https://localhost:4433?authenticated=true');
      } catch (error) {
          fastify.log.error('Error en Google Callback:', error.message);
          reply.redirect('/error');
      }
  }
);


fastify.listen({ port: 3003, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Servidor ejecutándose en ${address}`);
});
