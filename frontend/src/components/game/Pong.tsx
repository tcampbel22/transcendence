import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import GameCanvas  from "./GameCanvas"
import GameControls from "./GameControls"
import { useGameLoop } from '../../hooks/useGameLoop'
import { usePaddles } from '../../hooks/usePaddles';
import { useKeyPress } from '../../hooks/useKeyPress';
import GameEnd from './GameEnd';
import { useStartGame } from "../../hooks/useStartGame";

type userObj = {
  userId: number;
  username: string;
};

type PongProps = {
  onScoreChange?: (leftScore: number, rightScore: number) => void;
  onGameEnd?: (winner: string) => void;  // Add this for tournament progression
  player1?: string;                      // Add player names
  player2?: string;
  winningScore?: number; // Make winning score configurable
  userInfo: userObj;               
};

const PADDLE_HEIGHT = 100;
const BOARD_WIDTH = 1000;
const BOARD_HEIGHT = 500;
const BALL_SPEED = 10;
const WINNING_SCORE = 1;

const Pong: React.FC<PongProps> = ({
  onScoreChange, 
  onGameEnd,
  player1 = "Left Player", 
  player2 = "Right Player",
  winningScore = WINNING_SCORE,
  userInfo 
}) => {
  const [opponentUserId, setOpponentUserId] = useState(0);
  const [leftPaddleY, setLeftPaddleY] = useState(BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [rightPaddleY, setRightPaddleY] = useState(BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [ballX, setBallX] = useState(BOARD_WIDTH / 2);
  const [ballY, setBallY] = useState(BOARD_HEIGHT / 2);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'left' | 'right' | null>(null);
  const [loser, setLoser] = useState<'left' | 'right' | null>(null);
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const ballSpeedX = useRef<number>(BALL_SPEED);
  const ballSpeedY = useRef<number>(0);
  const keysPressed = useKeyPress();
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameId, setGameId] = useState<number | null>(null);

  const updateLeftScore = (newScore: number) => {
    setLeftScore(newScore);
    onScoreChange?.(newScore, rightScore);
    if (newScore >= (winningScore || WINNING_SCORE)) {
      setGameOver(true);
      setWinner('left');
	  setLoser('right');
      onGameEnd?.(player1); // Notify tournament system who won
    }
  };

  const updateRightScore = (newScore: number) => {
    setRightScore(newScore);
    onScoreChange?.(leftScore, newScore);
    if (newScore >= (winningScore || WINNING_SCORE)) {
      setGameOver(true);
      setWinner('right');
	  setLoser('left');
      onGameEnd?.(player2); // Notify tournament system who won
    }
  };

  const resetGame = () => {
    setGameOver(false);
    setWinner(null);
    setLeftScore(0);
    setRightScore(0);
    setLeftPaddleY(BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2);
    setRightPaddleY(BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2);
    onScoreChange?.(0, 0);
    setBallX(BOARD_WIDTH / 2);
    setBallY(BOARD_HEIGHT / 2);
    ballSpeedX.current = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
    ballSpeedY.current = 0;
  };

  usePaddles({setLeftPaddleY, setRightPaddleY, keysPressed});

  useGameLoop({
      gameOver,
      ballX,
      ballY,
      setBallX,
      setBallY,
      setLeftPaddleY,
      setRightPaddleY,
      ballSpeedX,
      ballSpeedY,
      updateLeftScore,
      updateRightScore,
      leftPaddleY,
      rightPaddleY,
      leftScore,
      rightScore
    });

  useStartGame({
    isGameStarted,
    userId: userInfo.userId,
    opponentUserId,
    setGameId
  });

  return (
	<div className="bg-blacks flex items-center justify-center p-4 rounded">
    <div className="relative">
	{isGameStarted && <GameCanvas 	ballX={ballX}
	   				ballY={ballY} 
					leftPaddleY={leftPaddleY} 
					rightPaddleY={rightPaddleY}
		/>
	}
    {!isGameStarted && <GameControls  userId={userInfo.userId} 
                                      resetGame={resetGame} 
                                      setIsGameStarted={setIsGameStarted}
                                      setOpponentUserId={setOpponentUserId}
                      />
    };
    {gameOver && isGameStarted && <GameEnd  user={userInfo}
                                            opponentUserId={opponentUserId}
                                            winner={winner}
											loser={loser}
                                            p1score={leftScore}
                                            p2score={rightScore}
                                            gameId={gameId}
                                  />
    };
	  {/* {gameOver ? (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
        <div className="bg-white p-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">
            {winner === 'left' ? player1 : player2} Wins!
          </h2>
          <button 
            onClick={resetGame}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Play Again
          </button>
        </div>
      </div>
    ) : <GameControls userId={userId} resetGame={resetGame} setIsStarted={setIsStarted}/> } */}
    </div>
   </div>
  );
};

export default Pong;
