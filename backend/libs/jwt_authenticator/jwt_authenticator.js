import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = async (request, reply) => {
  const internalKey = process.env.INTERNAL_KEY;
  if (request.headers["x-internal-key"] === internalKey) {
    // Skip authentication for internal requests
    return;
  }
	try {
    const token = request.cookies.token;
    if (!token) {
      console.error("Authentication failed: No token provided");
      return reply.status(401).send({ message: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    request.user = decoded;
  } catch (err) {
    logger.error("JWT verification failed:", err);
    console.error("Authentication failed:", err.message);
    return reply.status(401).send({ message: "Unauthorized: Invalid or expired token" });
  }
}

export default authenticate;
