import { googleCallback } from '../controllers/authController.js';
import fastifyPassport from '@fastify/passport';

export const authRoutes = (fastify) => {
    fastify.get(
        '/auth/google',
        { preValidation: fastifyPassport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }) },
        async (req, reply) => {}
    );

    fastify.get(
        '/auth/google/callback',
        { preValidation: fastifyPassport.authenticate('google', { failureRedirect: '/' }) },
        googleCallback
    );
};
