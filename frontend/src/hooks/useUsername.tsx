import api from "../lib/api";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";


type Profile = {
    id: number,
    username: string,
    email: string,
    picture: string | boolean
}

export const useUsername = (userId : number) => {
   const API_URL = import.meta.env.VITE_API_USER;
    const [Profile, setProfile] = useState<Profile | null>(null);

    useEffect (() => {
        const getName = async () => {
            try {
                const res = await api.get(`${API_URL}/${userId}`);
                setProfile(res.data);
            } catch (err) {
                const error = err as AxiosError;
                console.log("error fetching player: ", error);
                setProfile(null);
            };
        }
        getName();
    }, [userId])

    return {username: Profile?.username};
};