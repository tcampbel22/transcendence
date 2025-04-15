import { prisma } from "../../database/db.js";

export const authController = {

	async authUser(request, reply) {
		const { username,  password } = request.body
        const user = await checkForExistingUser(prisma, username);
		if (user) {
			if (!isMatch)
				return reply.status(401).send({message: 'invalid username or password'});
			reply.status(200).send(user.id);
		}
		else {
            return reply.status(401).send({ message: "invalid username or password" });
		}
	}
};