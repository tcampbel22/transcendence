import Fastify from "fastify";
import fastifySecureSession from "@fastify/secure-session";
import fastifyPassport from "@fastify/passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import "dotenv/config";
import fs from "fs";

const SSL_CERT_PATH = "./ssl/cert.pem";
const SSL_KEY_PATH = "./ssl/key.pem";

const fastify = Fastify({
	logger: true,
	https: {
		key: fs.readFileSync("./ssl/key.pem"),
		cert: fs.readFileSync("./ssl/cert.pem"),
	},
});

fastify.register(fastifySecureSession, {
	secret: Buffer.from(process.env.FASTIFY_SECURE_SECRET),
	cookie: {
		path: "/",
		httpOnly: true,
		secure: false,
	},
});

fastify.register(fastifyPassport.initialize());
fastify.register(fastifyPassport.secureSession());

fastifyPassport.use(
	"google",
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
		},
		async (accessToken, refreshToken, profile, done) => {
			return done(null, profile);
		},
	),
);

fastifyPassport.registerUserSerializer(async (user, request) => user);
fastifyPassport.registerUserDeserializer(async (user, request) => user);

fastify.get(
	"/auth/google",
	{
		preValidation: fastifyPassport.authenticate("google", {
			scope: ["profile", "email"],
			prompt: "select_account",
		}),
	},
	async (req, reply) => {},
);

fastify.get(
	"/auth/google/callback",
	{
		preValidation: fastifyPassport.authenticate("google", {
			failureRedirect: "/",
		}),
	},
	async (req, reply) => {
		const profile = req.user;
		console.log("mail:", profile.emails[0].value);
		console.log("name:", profile.displayName);
		console.log("photo:", profile.photos[0].value);
		console.log("photo:", profile.id);
		reply.redirect("https://localhost:4433?authenticated=true");
	},
);

fastify.listen({ port: 3003, host: "0.0.0.0" }, (err, address) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
	console.log(`Server running in ${address}`);
});
