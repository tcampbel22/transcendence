import { profileController } from "../controllers/profile.controller.js"

// Get profile page 
export default async function profileRoutes(fastify, options) {
	//Get user profile
	fastify.get("/api/user/:id", profileController.getUser);
	//Update user name
	fastify.put("/api/user/:id", profileController.updateUsername);
	//Update profile pic
	fastify.put("/api/:id/picture", profileController.updatePicture);
	//Update password
	fastify.put("/api/:id/password", profileController.updatePassword);
	//Get stats (Wins, losses, matches played)
	fastify.get("/api/:id/stats", profileController.getStats);
	//Get match history
	// fastify.get("/api/:id/match-history", profileController.getMatchHistory);
	//Delete account
	// fastify.delete("/api/:id/kill-user", profileController.deleteUser);
}