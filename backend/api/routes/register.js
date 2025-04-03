import argon2 from "argon2";

export default async function registerRoute(fastify, options) {
	fastify.post("/api/register", async (request, reply) => {
		console.log("POST /api/register");
		const { username, email, password } = request.body;
		// add the input validation here
		try {
		const hashedPassword = await argon2.hash(password);
		console.log("Hashed password:", hashedPassword);
		} catch (error) {
			console.error("Error hashing password:", error);
			reply.status(500).send({ message: "Internal server error" });
			return;
		}

	});
}