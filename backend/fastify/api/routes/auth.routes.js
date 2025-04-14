import argon2 from "argon2";
import { checkForExistingUser } from "../utils/checkForExisting.js";
import { prisma } from "../../database/db.js";

export default async function authRoute(fastify, options) {
    fastify.post("/api/login", async (request, reply) => {

		const { username,  password } = request.body
        const user = await checkForExistingUser(prisma, username);
		if (user) {
			const isMatch = await argon2.verify(user.password, password);
			if (!isMatch)
				return reply.status(401).send({message: 'invalid username or password'});
			reply.status(200).send(user.id);
		}
       
        else {
            return reply.status(401).send({ message: "invalid username or password" });
        }
    });
}