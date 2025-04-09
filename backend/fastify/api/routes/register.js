import argon2 from "argon2";
//import { register_post } from "../schemas/post_schemas"
import { prisma } from "../../database/db.js";
import { normalizeRegisterInput } from "../../utils/normalize.js";
import { checkForExistingUser } from "../../utils/checkForExisting.js";


//read that helps with duplication issues and keeps unexpected behaviour away


export default async function registerRoute(fastify, options) {
	fastify.post("/api/register", {schema: registerSchema}, async (request, reply) => {
		try {
			//Normalize the values got from frontend
			const { username, email, password } = normalizeRegisterInput(request.body);
			if (password.toLowerCase().includes(username.toLowerCase())) {
				return reply.code(400).send({message: "Password can't contain username or vise versa"});
			}
			//check if already exists - not mandatory, but makes debuggind and the ux a bit better to get clear message
			const existingUser = await checkForExistingUser(prisma, username);
			if (!existingUser) {
				return reply.code(409).send({ message: "Username or email already taken" });
			}

			console.log(`Inside post route: ${username}, ${email}`);
			const hashedPassword = await argon2.hash(password);
			if (hashedPassword === undefined) {
				console.error("Error hashing password:", error);
				throw new Error("");
			}
				
			const user = await prisma.user.create({
				data: {
					username: username,
					email: email,
					password: hashedPassword,
				},
			});
			reply.code(201).send(user);
		/*
		const isMatch = await argon2.verify(hashedPassword, password);
		console.log("Password match:", isMatch);

		const isMatchWrong = await argon2.verify(hashedPassword, "wrongpassword");
		console.log("Password match with wrong password:", isMatchWrong);
		
		console.log("Hashed password:", hashedPassword);
		THESE ARE JUST FOR TESTING PURPOSES
		*/
		} catch (error) {
			reply.status(500).send({ message: "Internal server error" });
			return;
		}
	}
);
	//this request for testing purposes
	fastify.get("/api/register", async (request, reply) => {
		console.log("Inside GET request");
		try {
		  const users = await prisma.user.findMany();
		  reply.send(users);
		} catch (error) {
		  console.error("Error fetching users:", error);
		  reply.code(500).send({ error: "Failed to fetch users" });
		}
	  });
}