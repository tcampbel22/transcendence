export default async function authRoute(fastify, options) {
    fastify.post("/api/login", async (request, reply) => {
        console.log("POST /api/login");
        const { username, password } = request.body;

        // here we should implement a real authentication logic
        if (username === "admin" && password === "password") {
            reply.status(200).send({ message: "Login successful!" });
        } else {
            reply.status(401).send({ message: "Invalid credentials" });
        }
    });
}