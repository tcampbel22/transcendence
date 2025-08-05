import fastify from './api/config/fastifyConfig.js';
import { configurePassport } from './api/config/passport.js';
import { authRoutes } from './api/routes/authRoutes.js';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "@fastify/cors";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

configurePassport(fastify);

authRoutes(fastify);

fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/auth/google/',
});

// const isDev = process.env.NODE_ENV === "development";
// const origin = isDev ? "http://localhost:5173" : "https://transendence.fly.dev"
// fastify.register(cors, {
//   origin: [origin],
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "x-internal-key"],
//   credentials: true,
// });

fastify.listen({ port: 3003, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
