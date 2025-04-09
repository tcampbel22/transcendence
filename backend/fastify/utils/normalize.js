
//read that helps with duplication issues and keeps unexpected behaviour away

export function normalizeRegisterInput(body) {
	return {
	  username: body.username.trim(),
	  email: body.email.trim().toLowerCase(),
	  password: body.password
	};
}