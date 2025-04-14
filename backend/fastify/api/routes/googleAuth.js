import fastifySecureSession from '@fastify/secure-session';
import fastifyPassport from '@fastify/passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export async function googleAuth(fastify, options) {
  // Register secure-session plugin
  fastify.register(fastifySecureSession, {
    secret: Buffer.from('96e86052a27b52b634bba5415dcf80909d4c0d14a7e44826ccb4762ac4f4b656'),
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false // Change to true in production with HTTPS
    },
  });

  // Register and initialize Passport
  fastify.register(fastifyPassport.initialize());
  fastify.register(fastifyPassport.secureSession());

  // Configure Google OAuth Strategy
  fastifyPassport.use(
    'google',
    new GoogleStrategy(
      {
        clientID: '626578837925-680bd28nejok4m6v9m5qrfqaolf1tnll.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:3000/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  );

  // Serialize and deserialize user
  fastifyPassport.registerUserSerializer(async (user, request) => user);
  fastifyPassport.registerUserDeserializer(async (user, request) => user);

  // Routes
  fastify.get(
    '/auth/google',
    { preValidation: fastifyPassport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }) },
    async (req, reply) => {}
  );

  fastify.get(
    '/auth/google/callback',
    { preValidation: fastifyPassport.authenticate('google', { failureRedirect: '/' }) },
    async (req, reply) => {
      reply.redirect('https://localhost:4433');
    }
  );
}