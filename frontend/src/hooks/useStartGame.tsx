import { useEffect } from "react";
import axios from "axios";

type StartGameProps = {
  isGameStarted: boolean;
  userId: number;
  opponentUserId: number;
  setGameId: (gameId: number) => void;
};

export const useStartGame = ({ isGameStarted, userId, opponentUserId, setGameId }: StartGameProps) => {
  useEffect(() => {
    if (isGameStarted) {
      const startGame = async () => {
        try {
          const API_URL = import.meta.env.VITE_API_GAME;
          const response = await axios.post(`${API_URL}/create-game`, {
            player1Id: userId,
            player2Id: opponentUserId,
          });
          console.log("Game started successfully:", response.data);
          setGameId(response.data.gameId); 
        } catch (error) {
          console.error("Failed to start the game:", error);
        }
      };

      startGame();
    }
  }, [isGameStarted, userId, opponentUserId]);
};
