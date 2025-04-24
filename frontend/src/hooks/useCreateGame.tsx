import axios, { AxiosError } from "axios"
import { useState } from "react";

type id = {
    p1Id: number,
    p2Id: number
};

type GameId = {
    gameId: number,
    time: Date
};

//creates game lol
export const useCreateGame = async ({p1Id, p2Id} : id) => {
     // const API_URL = "https://localhost:4433"; //product
	const API_DEV_URL = "http://localhost:3001";
    const [gameId, setGameId] = useState<GameId | null>(null);
    
    const payload = {
        Player1Id: p1Id,
        Player2Id: p2Id
    };
    console.log("userId: ", p1Id);
    try {
        const res = await axios.post(`${API_DEV_URL}/api/create-game`, payload);
        if (res.status == 201)
            setGameId(res.data); 
    } catch (err) {
        const error = err as AxiosError;
        setGameId(null);
        console.log("failed to create a game", error);
        return {gameId: undefined}
    }
    return {gameId: gameId?.gameId};
}