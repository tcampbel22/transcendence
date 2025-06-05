import api from "../lib/api";
import { useEffect, useState } from "react";
import { UserProps } from "../types/types";

const useAllUsers = () => {
	const API_URL = import.meta.env.VITE_API_USER;
	const [allUsers, setAllUsers] = useState<UserProps[]>([]);
	const [error, setError] = useState<string>('');
	
	useEffect(() => {
		const getUsers = async () =>  {
			try { 
				const res = await api.get(`${API_URL}/user-list`, {withCredentials: true});
				setAllUsers(res.data);
			} catch (err) {
				console.error(err);
				setError("Failed to fetch users");
				setAllUsers([]);
			}

		}
		getUsers();
	}, []);
	return allUsers;
}

export default useAllUsers;