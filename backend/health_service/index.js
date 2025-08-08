import Fastify from "fastify"

const fastify = Fastify({
	logger: true
})

//Make this 2 functions and stop pinging once the connection is made
const checkAllServices = async () => {
	const user = await fetch("https://tc-user-service.fly.dev/api/health");
	const game = await fetch("https://tc-game-service.fly.dev/api/health");
	console.log(user)
	console.log(game)
	if (user.status === 401 && game.status === 200)
		return true;
	else 
		return false;
}

fastify.get("/health-check", async (request, reply) => {
	try {
		const allHealthy = await checkAllServices();
		
		if (allHealthy) {
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