import { fastify } from './api/config/fastifyConfig.js';
import { configurePassport } from './api/config/passport.js';
import { authRoutes } from './api/routes/authRoutes.js';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

configurePassport(fastify);

authRoutes(fastify);

fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/auth/google/',
});

fastify.listen({ port: 3003, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
