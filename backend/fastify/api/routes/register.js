import argon2 from "argon2";
// import { register_post } from "../schemas/post_schemas"
import { prisma } from "../../database/db.js";

export default async function registerRoute(fastify, options) {
	fastify.post("/api/register", async (request, reply) => {
		console.log("POST /api/register");
		const { alias, email, password } = request.body;
		try {
			const hashedPassword = await argon2.hash(password);
			const post = prisma.post.create({
				data: {
					alias,
					email,
					hashedPassword,
				},
			});
			reply.code(201).send(post);
		/*
		const isMatch = await argon2.verify(hashedPassword, password);
		console.log("Password match:", isMatch);

		const isMatchWrong = await argon2.verify(hashedPassword, "wrongpassword");
		console.log("Password match with wrong password:", isMatchWrong);
		
		console.log("Hashed password:", hashedPassword);
		THESE ARE JUST FOR TESTING PURPOSES
		*/
		} catch (error) {
			console.error("Error hashing password:", error);
			reply.status(500).send({ message: "Internal server error" });
			return;
		}
	});
	fastify.get("/api/register", async (request, reply) => {
		try {
		  const users = await prisma.post.findMany();
		  reply.send(users);
		} catch (error) {
		  console.error("Error fetching users:", error);
		  reply.code(500).send({ error: "Failed to fetch users" });
		}
	  });
}