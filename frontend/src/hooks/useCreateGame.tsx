import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react";

type id = {
    p1Id: number,
    p2Id: number
};

type GameId = {
    gameId: number,
    time: Date
};

//creates game lol
export const useCreateGame = ({p1Id, p2Id} : id) => {
     const API_URL = import.meta.env.VITE_API_GAME;
    const [gameId, setGameId] = useState<GameId | null>(null);
    
    const payload = {
        player1Id: p1Id,
        Player2Id: p2Id
    };
    useEffect (() => {
        const createGame = async () => {
            try {
                const res = await axios.post(`${API_URL}/create-game`, payload);
                if (res.status == 201)
                    setGameId(res.data); 
            } catch (err) {
                // const error = err as AxiosError;
                setGameId(null);
                console.log("failed to create a game", err);
                return {gameId: undefined}
            }
        }
        createGame()
    }, [p1Id])
    
    return {gameId: gameId?.gameId};
}