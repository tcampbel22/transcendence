import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = async (request, reply) => {
	try {
    const token = request.cookies.token;
    if (!token) {
      return reply.status(401).send({ message: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    request.user = decoded;
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized: Invalid or expired token" });
  }
}