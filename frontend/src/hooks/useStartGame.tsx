import { useEffect } from "react";
import axios from "axios";
import api from "../lib/api";
import { PlayerProps } from "../types/types";

type StartGameProps = {
  isGameStarted: boolean;
  userId: number;
  opponent?: PlayerProps;
  setGameId: (gameId: number) => void;
};

export const useStartGame = ({ isGameStarted, userId, opponent, setGameId }: StartGameProps) => {
  useEffect(() => {
    if (isGameStarted) {
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
        } catch (error) {
          console.error("Failed to start the game:", error);
        }
      };

      startGame();
    }
  }, [isGameStarted, userId, opponent?.id]);
};
