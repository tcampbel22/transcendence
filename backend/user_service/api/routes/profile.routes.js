import { profileController } from "../controllers/profile.controller.js"
import { authenticate } from "../../../libs/jtw_authenticator/jwt_authenticator.js";

// Get profile page 
export default async function profileRoutes(fastify, options) {
	fastify.addHook("preHandler", authenticate);
	//Get user profile
	fastify.get("/api/:id", profileController.getUser);
	//Update user name
	fastify.put("/api/:id", profileController.updateUsername);
	//Update profile pic
	fastify.put("/api/:id/picture", profileController.updatePicture);
	//Update password
	fastify.put("/api/:id/reset-password", profileController.updatePassword);
	//Get stats (Wins, losses, matches played)
	fastify.get("/api/:id/stats", profileController.getStats);
	// Get match history
	fastify.get("/api/:id/match-history", profileController.getMatchHistory);
	//Delete account
	fastify.delete("/api/:id/delete-user", profileController.deleteUser);
	//Get friends list
	fastify.get("/api/:id/friends", profileController.getFriendsList);
	//Add friend to list
	fastify.post("/api/:id/friends", profileController.addFriend);
	//Delete friend from list
	fastify.delete("/api/:id/delete-friend", profileController.deleteFriend);
	// Is a friend online
	// fastify.get("/api/:id/friends/is-online", profileController.isFriendOnline);
}