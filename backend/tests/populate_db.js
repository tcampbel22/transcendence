
import { registerService } from "../user_service/api/services/register.service.js";

//Moodify user_amount if you want to increase db size
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
	console.log(`${user_amount} users created in db`)
};