/*This file configures Google authentication in a Fastify server using @fastify/passport and passport-google-oauth20.
 It initializes Passport, registers secure session handling, sets up Google OAuth with credentials from environment variables,
  and defines user serialization/deserialization for session management, allowing users to log in via Google securely.*/

import fastifyPassport from '@fastify/passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export const configurePassport = (fastify) => {
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
};
