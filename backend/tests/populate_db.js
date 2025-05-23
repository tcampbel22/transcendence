import { prisma } from "../user_service/database/db.js";
import { registerService } from "../user_service/api/services/register.service.js";

//Modify user_amount if you want to increase db size
const user_amount = 10
const user_name = 'user'
const user_email_suffix = '@test.com'
const user_pw = 'Kissa123'


//Users will have the usernames according to the iterator eg user0, user1 etc
//Note this populates db with default profile picture users, adding a profile pic will be tested later
export async function populate_users() {
	for (let i = 0; i < user_amount; i++) {
		const unq_un = `${user_name}${(i + 1).toString()}`
		const userData = {
			"username": unq_un,
			"email": unq_un + user_email_suffix,
			"password": user_pw
		}
		try {
			await registerService.registerUser(userData);
		} catch (err) {
			console.log("Could not create users in db:", err.message);
			return err
		}
	}
};

export async function add_user(username) {
	return await prisma.$transaction(async (tx) => {
		const user = await tx.user.create({
			data: {
				username: username, 
				email: `${username}@gmail.com`,
				password: "kissa"
		}});
		await tx.userStats.create({
			data: {
				userId: user.id,
				wins: 0,
				losses: 0,
				matchesPlayed: 0,
			}
		});
		return user.id;
	});
}