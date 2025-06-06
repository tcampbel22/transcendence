import { useEffect, useState } from "react";
import api from "../lib/api";
import { AxiosError } from "axios";

type Friends = {
    id: number,
    username: string,
    picture: string | null,
    status: boolean
}

export const useFriendslist = (userId : number) => {
    const API_URL = import.meta.env.VITE_API_USER;
    const [friendsList, setFriendsList] = useState<Friends[] | null>(null);
	const [refetch, setRefetch] = useState(false);

    useEffect (() => {
            const getFriendsList = async () => {
                try {
                    const res = await api.get(`${API_URL}/${userId}/friends`, {withCredentials: true}); //get friends list
                    setFriendsList(res.data.friendList || []); //set it for usage in the dropdown list
                } catch (err) {
                    const error = err as AxiosError;
                    console.error("Error fetching friends:", error);
                    setFriendsList([]);
                }
            }
            getFriendsList();
        }, [userId, refetch]);

		const reFetch = async () => {
			setRefetch(prev => !prev)
		}

		
    return { friendsList, reFetch };
};