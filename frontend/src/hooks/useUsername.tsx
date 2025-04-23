import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

type userIdProp = number;

type Profile = {
    id: number,
    username: string,
    email: string,
    picture: string | boolean
}

export const useUsername = (UserId : userIdProp) => {
   // const API_URL = "https://localhost:4433";
	const API_DEV_URL = "http://localhost:3002";
    const [Profile, setProfile] = useState<Profile | null>(null);

    useEffect (() => {
        const getName = async () => {
            try {
                const res = await axios.get(`${API_DEV_URL}/api/${UserId}`);
                setProfile(res.data);
            } catch (err) {
                const error = err as AxiosError;
                setProfile(null);
            };
        }
        getName();
    }, [UserId])

    return {username: Profile?.username};
};