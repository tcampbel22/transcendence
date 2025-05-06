/*
This file defines authentication routes for a Fastify server using @fastify/passport.
The /auth/google route initiates Google authentication when requested by the frontend,
prompting the user to select an account and granting access to their profile and email.
The /auth/google/callback route handles Google's response after authentication,
verifying the user and executing the googleCallback function to process their data.
If authentication fails, the user is redirected to the homepage (/).
*/

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
