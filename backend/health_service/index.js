import Fastify from "fastify"

const fastify = Fastify({
	logger: true
})


const checkUserService = async () => {
	user = await fetch("https://tc-user-service.fly.dev/api/health");
	console.log(user)
	if (user.status === 200 || user.status === 401)
		return true;
	else
		return user = await fetch("https://tc-user-service.fly.dev/api/health");
}

const checkGameService = async () => {
	let game = await fetch("https://tc-game-service.fly.dev/api/health");
	console.log(game)
	if (game.status === 200 || game.status === 401)
		return true;
	else
		game = await fetch("https://tc-game-service.fly.dev/api/health");
}

fastify.get("/health-check", async (request, reply) => {
	try {
		const userHealthy = await checkUserService();
		const gameHealthy = await checkGameService();
		
		if (userHealthy && gameHealthy) {
			request.log.info("All services are running")
			return reply.send(200).send({ message: "All services are running"});
		}
		else {
			request.log.error("Services are unavailable")
			return reply.send(503).send({ message: "Services are unavailable"});
		}
	} catch(err) {
		fastify.log.error(`Failed to connect to services ${err.message}`);
	}
})

const start = async () => {
	try {
		const port = process.env.PORT || 3000;
		await fastify.listen({ port, host: "::" })
		fastify.log.info(`Listening on port ${port}`)
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
}
start();