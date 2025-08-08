export const healthController = (request, reply) => {
	return  reply.status(200).send({ status: "ok" });
}