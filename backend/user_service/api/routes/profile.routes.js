import { profileController } from "../controllers/profile.controller.js"
import * as schemas from "../schemas/profile.schema.js"

export default async function profileRoutes(fastify, options) {
    // Check if user exists
    fastify.get("/api/validate/:id", profileController.validateUser);
	
	// Get user profile
    fastify.get("/api/:id", { schema: schemas.getUserProfileSchema }, profileController.getUser);
    
    // Update user name
    fastify.put("/api/:id", { schema: schemas.updateUsernameSchema }, profileController.updateUsername);
    
    // Update profile pic
    fastify.put("/api/:id/picture", { schema: schemas.updatePictureSchema }, profileController.updatePicture);
    
    // Update password
    fastify.put("/api/:id/reset-password", { schema: schemas.updatePasswordSchema }, profileController.updatePassword);
    
    // Get stats (Wins, losses, matches played)
    fastify.get("/api/:id/stats", { schema: schemas.getStatsSchema }, profileController.getStats);
    
    // Get match history
    fastify.get("/api/:id/match-history", { schema: schemas.matchHistorySchema }, profileController.getMatchHistory);
    
    // Delete account
    fastify.delete("/api/:id/delete-user", { schema: schemas.deleteUserSchema }, profileController.deleteUser);
    
    // Get friends list
    fastify.get("/api/:id/friends", { schema: schemas.getFriendsListSchema }, profileController.getFriendsList);
    
    // Add friend to list
    fastify.post("/api/:id/friends", { schema: schemas.addFriendSchema }, profileController.addFriend);
    
    // Delete friend from list
    fastify.delete("/api/:id/delete-friend", { schema: schemas.deleteFriendSchema }, profileController.deleteFriend);
    
    // Is a friend online
    // fastify.get("/api/:id/friends/is-online", profileController.isFriendOnline);

	// Update stats Needs to update users wins, losses and matches played when game is finished
	fastify.patch("/api/:id/update-stats", profileController.updateStats);
}