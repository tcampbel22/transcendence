import argon2 from "argon2";

export default async function registerRoute(fastify, options) {
	fastify.post("/api/register", async (request, reply) => {
		console.log("POST /api/register");
		const { username, email, password } = request.body;
		// add the input validation function here
		try {
		const hashedPassword = await argon2.hash(password);
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
}