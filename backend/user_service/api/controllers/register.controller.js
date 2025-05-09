import { registerService } from "../services/register.service.js";
import { normalize } from "../utils/normalize.js";
import { checkForExistingUser } from "../utils/checkForExisting.js";
import { prisma } from "../../database/db.js";
import logger from "@eleekku/logger";
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import util from 'util';

export const registerController = {

	async registerUser(request, reply) {
		try {
			// const contentType = request.headers['content-type'] || '';
			// let userData;
			// let pictureUrl = '/uploads/default.png'; // Default image URL
			
			// if (contentType.includes('multipart/form-data')) {
			// 	// Handle file upload case
			// 	const data = await request.file();
			// 	if (!data)
			// 		throw new ErrorNotFound(`No file uploaded`);
				
			// 	userData = {};
			// 	for await (const field of data.fields) {
			// 		userData[field.fieldname] = field.value;
			// 		console.log(`Field in pic: ${field}`);
			// 	}
			// 	if (!userData)
			// 		throw new ErrorUnAuthorized(`File is corrupted`);
			// 	// Process uploaded image if provided
			// 	if (data.file) {
			// 	const fileExtension = path.extname(data.filename).toLowerCase();
			// 	if (!['.jpg', '.jpeg', '.png'].includes(fileExtension)) {
			// 		throw new ErrorUnAuthorized(`File should be jpg, jpeg or png`);
			// 	}
				
			// 	const filename = `user_new_${Date.now()}${fileExtension}`;
			// 	const uploadDir = process.env.NODE_ENV === 'dev' ? './uploads' : '/app/uploads';
			// 	const filepath = `${uploadDir}/${filename}`;
			// 	pictureUrl = `/uploads/${filename}`;
				
			// 	const pump = util.promisify(pipeline);
			// 	await pump(data.file, fs.createWriteStream(filepath));
			// 	}
			// } else {
			// 	userData = request.body;
			// 	pictureUrl = userData.picture || pictureUrl;
			// }

			const { username, email, password } = request.body;
			if (password.toLowerCase().includes(username.toLowerCase())) {
				logger.info(`User registration failed: ${username} tried to use username in password`);
				return reply.code(400).send({ message: "Password cannot contain username or vice versa" });
			}
			const existingUser = await checkForExistingUser(prisma, username);
			if (existingUser) {
				logger.info(`User registration failed: ${username} already exists`);
				return reply.code(409).send({ 
					message: "Username or email already taken",
					id: existingUser.id
				 });
			}
			const picture = '/uploads/default.png';
			const user = await registerService.registerUser({ username, email, password, picture });
			logger.info(`User registered: ${user.username}, ID: ${user.id}`);
			reply.code(201).send({
				message: "User registered successfully",
				id: user.id,
				username: user.username, 
				email: user.email,
				picture
			});
		} catch (err) {
			logger.error(`Error registering user: ${err.message}`);
			request.log.error(err);
			return reply.code(500).send({ message: "Internal server error" });
		}
	}
}