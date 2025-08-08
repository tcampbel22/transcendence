import { profileService } from "../services/profile.service.js"
import { ErrorBadRequest, ErrorCustom, ErrorNotFound, handleError } from "../utils/error.js"
import { S3 } from "../utils/tigrisClient.js";
import { PutObjectCommand, DeleteObjectCommand, waitUntilObjectNotExists } from "@aws-sdk/client-s3";
import fs from "fs";
import util from "util";
import { pipeline } from "stream";
import path from "path";
import { cache } from "../utils/cache.js";

const BUCKET_NAME = process.env.BUCKET_NAME || "picture-uploads"
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE) || 1000000;
const isProduction = process.env.NODE_ENV === 'production'

export const profileController = {
	
	async validateUser(request, reply) {
		const { id } = request.params;
		try {
			const user = await profileService.validateUser(id);
			return reply.code(200).send({
				message: `User ${id} fetched successfully`,
				id: user.id,
			});
		} catch (err) {
			request.log.error(err);
			return handleError(err, reply, `Failed to fetch user ${id}`);
		}
	},
	async getUser(request, reply){
		const { id } = request.params;
		try {
			const user = await profileService.getUser(id);
			return reply.code(200).send({
				message: `User ${id} fetched successfully`,
				id: user.id,
				username: user.username,
				email: user.email,
				picture: user.picture,
				isOnline: user.isOnline,
				is2faEnabled: user.is2faEnabled,
			})
		} catch (err) {
			request.log.error(err);
			return handleError(err, reply, `Failed to fetch user ${id}`);
		}
	},
	async getUserList(request, reply){
		try {
			const users = await profileService.getUserList();
			return reply.code(200).send(users)
		} catch (err) {
			request.log.error(err);
			return handleError(err, reply, `Failed to fetch users`);
		}
	},
	async updateUsername(request, reply) {
		const { id } = request.params;
		const { newValue } = request.body;
		try {
			const user = await profileService.updateUsername(id, newValue);
			request.log.info(`User ${id}'s username updated to ${newValue}`);
			return reply.code(201).send({
				message: `User ${id}'s username updated successfully`,
				id: user.id,
				newUsername: user.username,
			});
		} catch (err) {
			request.log.error(`Failed to update user ${id}'s username: ${err.message}`);
			return handleError(err, reply, `Failed to update user ${id}'s username`);
		}
	},
	async getUserPicture(request, reply) {
		const { id } = request.params;
		try {
			const user = await profileService.getUser(id);
			// const cacheKey = user.picture;
			// const isCached = cache.get(cacheKey);
			// console.log("Cache", isCached)
			// if (isCached) {
			// 	return reply.code(200)
			// 		.header('Content-type', isCached.ContentType)
			// 		.header('Content-Length', isCached.buffer.length)
			// 		.header('Cache-Control', 'public, max-age=86400')
			// 		.send(isCached.buffer)
			// }
			if (isProduction) {
				const pic = await fetch(user.picture);
				if (!pic)
					throw new ErrorNotFound("Picture not found");
				const picBuffer = await pic.arrayBuffer();
				// cache.set(cacheKey, { picBuffer, ContentType: 'application/octet-stream'})
				return reply.code(200)
						.header('Content-type', 'application/octet-stream')
						.header('Content-Length', picBuffer.byteLength)
						.header('Cache-Control', 'public, max-age=86400')
						.send(Buffer.from(picBuffer))
			} else {
				const buffer = fs.readFileSync(`.${user.picture}`)
				return reply.code(200).send(buffer)
			}

		} catch (err) {
			request.log.error(`Failed to get user ${id}'s profile picture: ${err.message}`);
			return handleError(err, reply, `Failed to get user ${id}'s profile picture`);
		}
	},
	async updatePicture(request, reply) {
		const { id } = request.params;
		try {
			const data = await request.file();
			if (!data)
				throw new ErrorNotFound(`No file uploaded`);
			const fileExtension = path.extname(data.filename).toLowerCase();
			if (!['.jpg', '.jpeg', '.png'].includes(fileExtension))
				throw new ErrorBadRequest(`File should be jpg, jpeg or png`);
			const filename = `${id}${fileExtension}`;
			const pictureUrl = isProduction ? `https://${BUCKET_NAME}.fly.storage.tigris.dev/${filename}` : `/uploads/${filename}`;
			if (isProduction) {
				const buffer = await data.toBuffer();
				if (buffer > MAX_FILE_SIZE)
					throw new ErrorCustom("File size limit reached", 413);
				await S3.send(new PutObjectCommand({
					Bucket: BUCKET_NAME,
					Key: filename,
					Body: buffer,
					ContentType: data.mimetype,
					ContentLength: buffer.length,
	
				}));
			} else {
				const uploadDir = './uploads';
				const filepath = `${uploadDir}/${filename}`;
				const pump = util.promisify(pipeline);
				await pump(data.file, fs.createWriteStream(filepath));
			}
			const user = await profileService.updatePicture(id, pictureUrl);
			// cache.delete(user.picture);
			request.log.info(`User ${id}'s profile picture updated`);
			return reply.code(201).send({
				message: `User ${id}'s profile picture updated successfully`,
				id: user.id,
				newPicture: user.picture,
			});
		} catch (err) {
			request.log.error({ err }, "Failed to upload profile pic");
			return handleError(err, reply, `Failed to update user ${id}'s profile picture`);
		}
	},

	async updatePassword(request, reply) {
		const { id } = request.params;
		const { newValue } = request.body;
		try {
			const user = await profileService.updatePassword(id, newValue);
			request.log.info(`User ${id}'s password updated`);
			return reply.code(201).send({
				message: `User ${id}'s password updated successfully`,
				id: user.id,
			});
		} catch (err) {
			request.log.error(`Failed to update user ${id}'s password: ${err.message}`);
			request.log.error(err);
			return handleError(err, reply, `Failed to update user ${id}'s password`);
		}
	},

	async update2faStatus(request, reply) {
		const { id } = request.params;
		const { is2faEnabled } = request.body;
		if (typeof is2faEnabled !== 'boolean') {
			return reply.code(400).send({ message: 'is2faEnabled must be a boolean' });
		}
		try {
			const user = await profileService.update2faStatus(id, is2faEnabled);
			request.log.info(`User ${id}'s 2FA status updated to ${user.is2faEnabled}`);
			return reply.code(201).send({
				message: `User ${id}'s 2FA status updated successfully`,
				id: user.id,
				is2faEnabled: user.is2faEnabled,
			});
		}
		catch (err) {
			request.log.error(`Failed to update user ${id}'s 2FA status: ${err.message}`);
			request.log.error(err);
			return handleError(err, reply, `Failed to update user ${id}'s 2FA status`);
		}
	},


	async validatePassword(request, reply) {
		const { id, password } = request.body
		try {
			const user = await profileService.validatePassword(id, password);
			request.log.info(`User registered to play: ${user.username}, ID: ${user.id}`);
			reply.status(200).send({
				message: `User ${id} password successfully validated`,
				id: user.id,
				username: user.username,
			});  
		} catch (err) {
			request.log.error(`Error validating user password: ${err.message}`);
			request.log.error(err);
			return handleError(err, reply, `Failed to validate user ${id}'s password`);
		}
	},
	async getStats(request, reply) {
		const { id } = request.params;
		try {
			const user = await profileService.getStats(id);
			return reply.code(200).send({
				message: `User ${id}'s stats fetched successfully`,
				id: user.id,
				wins: user.wins,
				losses: user.losses,
				matchesPlayed: user.matchesPlayed,
			})
		} catch (err) {
			request.log.error(err);
			return handleError(err, reply, `Failed to fetch user ${id}'s stats`);
		}
	},
	async updateStats(request, reply) {
		const { id } = request.params;
		const { isWinner } = request.body;
		try {
			const user = await profileService.updateStats(parseInt(id), isWinner);
			return reply.code(201).send({
				message: `User ${id}'s stats updated successfully`,
				id: user.id,
				wins: user.wins,
				losses: user.losses,
				matchesPlayed: user.matchesPlayed,
			})
		} catch (err) {
			request.log.error(`Failed to fetch user ${id}'s stats: ${err.message}`);
			return handleError(err, reply, `Failed to update user ${id}'s stats`);
		}
	},
	async getMatchHistory(request, reply) {
		const { id } = request.params;
		try {
			const matchHistory = await profileService.getMatchHistory(id);	
			return reply.code(200).send(matchHistory)
		} catch (err) {
			request.log.error(`Failed to fetch user ${id}'s match history: ${err.message}`);
			return handleError(err, reply, `Failed to fetch user ${id}'s match history`);
		}
	},
	async deleteUser(request, reply) {
		const { id } = request.params;
		try {
			const user = await profileService.getUser(id);
			cache.delete(user.picture);
			await S3.send(new DeleteObjectCommand({
				Bucket: BUCKET_NAME,
				Key: user.picture,
			}))
			await waitUntilObjectNotExists(
				{ S3 },
				{
					Bucket: BUCKET_NAME,
					Key: user.picture,
				}
			);
			await profileService.deleteUser(id);
			request.log.info(`User ${id} deleted successfully`);
			return reply.code(204).send({ message: `User ${id} deleted successfully` });
		} catch (err) {
			request.log.error(`Failed to delete user ${id}: ${err.message}`);
			return handleError(err, reply, `Failed to delete user ${id}:  ${err.message}`);
		} 
	},
	async getFriendsList(request, reply) {
		const { id } = request.params;
		try {
			const friendList = await profileService.getFriendsList(id);
			if (friendList.length === 0) {
				return reply.code(200).send({
					message: `User ${id} has no friends... :(`,
					friendList: [],
				});
			}
			return reply.code(200).send({
				message: `User ${id} friends list fetched successfully`,
				friendList,
			});
		} catch (err) {
			request.log.error(`Failed to fetch user ${id}'s friend list: ${err.message}`);
			return handleError(err, reply, `Failed to fetch user ${id}'s friend list`);
		}
	},
	async addFriend(request, reply) {
		const { id } = request.params;
		const { friendUsername } = request.body;
		try {
			const friendId = await profileService.addFriend(id, friendUsername);
			request.log.info(`User ${id} added user ${friendUsername} as a friend`);
			return reply.code(201).send({ 
				message: `Friendship created between user ${id} and user ${friendUsername}`,
				friendUsername,
				friendId
			});
		} catch (err) {
			request.log.error(`Failed to add user ${friendUsername} to user ${id}'s friend list: ${err.message}`);
			return handleError(err, reply, `Failed to add friend to user ${id}'s friend list:`, err);
		}
	},
	async deleteFriend(request, reply) {
		const { id } = request.params;
		const { friendUsername } = request.body;
		try {
			const friendId = await profileService.deleteFriend(id, friendUsername);
			request.log.info(`User ${id} deleted user ${friendId} from their friend list`);
			return reply.code(201).send({ message: `User ${id} friendship with ${friendUsername} has ended permanently` })
		} catch (err) {
			request.log.error(`Failed to delete user ${friendUsername} from user ${id}'s friend list: ${err.message}`);
			return handleError(err, reply, `Failed to delete user ${id}'s friend ${friendUsername} friendship`);
		}
	}
}