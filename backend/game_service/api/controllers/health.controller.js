export const healthController = (request, reply) => {
	reply.header('Access-Control-Allow-Origin', '*');
	return  reply.status(200).send({
		status: "ok" });
}