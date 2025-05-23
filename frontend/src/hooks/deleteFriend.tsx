import axios from "axios";

export const deleteFriend = async ( userId : number, friendUsername : string) => {
	const API_URL = import.meta.env.VITE_API_USER;

	try {
		await axios.delete(`${API_URL}/${userId}/delete-friend`, {
			headers: { 'Content-Type': 'application/json' },
			data: {friendUsername: friendUsername }
		  });
	} catch (error) {
		console.log(error);
	}
};
