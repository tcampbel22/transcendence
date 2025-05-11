import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

type Friends = {
    id: number,
    username: string,
    picture: string | null,
    status: "online" | "offline"
}

export const useFriendslist = (userId : number) => {
    const API_URL = import.meta.env.VITE_API_USER;
    const [friendsList, setFriendsList] = useState<Friends[] | null>(null);

    useEffect (() => {
            const getFriendsList = async () => {
                try {
                    const res = await axios.get(`${API_URL}/${userId}/friends`, {withCredentials: true}); //get friends list
                    setFriendsList(res.data.friendList || []); //set it for usage in the dropdown list
                    // setFriendsList(mockFriends);
    
                } catch (err) {
                    const error = err as AxiosError;
                    console.error("Error fetching friends:", error);
                    setFriendsList([{ id: 1, username: "No Friends", picture: null, status: "offline" }]);
                }
            }
            getFriendsList();
        }, [userId]);

    return friendsList;
};