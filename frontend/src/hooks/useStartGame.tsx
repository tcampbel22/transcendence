import { useEffect } from "react";
import api from "../lib/api";
import { PlayerProps } from "../types/types";

type StartGameProps = {
  isGameStarted: boolean;
  userId: number;
  opponent: PlayerProps | undefined;
  setGameId: (gameId: number) => void;
};

export const useStartGame = ({ isGameStarted, userId, opponent, setGameId }: StartGameProps) => {
	useEffect(() => {
		if (isGameStarted && opponent) {
			const startGame = async () => {
			try {
				const API_URL = import.meta.env.VITE_API_GAME;
				const response = await api.post(
            `${API_URL}/create-game`,
            {
              player1Id: userId,
              player2Id: opponent?.id,
            },
            {
              withCredentials: true,
            }
          );
          setGameId(response.data.gameId);
		  console.log("game started")
        } catch (error: any) {
			console.error('Axios error response data:', error.response?.data);
			console.error('Axios error response status:', error.response?.status);
			console.error('Axios error request config:', error.config);
			console.error("Failed to start the game:", error);
        }
      };

      startGame();
    }
  }, [isGameStarted, userId, opponent?.id]);
};
