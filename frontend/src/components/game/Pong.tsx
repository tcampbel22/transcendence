import React, { useEffect, useState, useRef } from 'react';
import GameCanvas  from "./GameCanvas"
import GameControls from "./GameControls"
import { useGameLoop } from '../../hooks/useGameLoop'
import { usePaddles } from '../../hooks/usePaddles';
import { useKeyPress } from '../../hooks/useKeyPress';
import GameEnd from './GameEnd';
import { useStartGame } from "../../hooks/useStartGame";
import { PlayerProps } from '../../types/types';

type PongProps = {
  onScoreChange?: (leftScore: number, rightScore: number) => void;
  player1?: string;
  player2?: string;
  userInfo: PlayerProps;               
};

const PADDLE_HEIGHT = 100;
const BOARD_WIDTH = 1000;
const BOARD_HEIGHT = 500;
const BALL_SPEED = 10;
const WINNING_SCORE = 5;

const Pong: React.FC<PongProps> = ({
  onScoreChange, 
  userInfo 
}) => {
  const [opponent, setOpponent] = useState<PlayerProps>()
  const [leftPaddleY, setLeftPaddleY] = useState(BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [rightPaddleY, setRightPaddleY] = useState(BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [ballX, setBallX] = useState(BOARD_WIDTH / 2);
  const [ballY, setBallY] = useState(BOARD_HEIGHT / 2);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'left' | 'right' | null>(null);
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
    if (newScore >= (WINNING_SCORE)) {
      setGameOver(true);
      setWinner('left');
    }
  };

  const updateRightScore = (newScore: number) => {
    setRightScore(newScore);
    onScoreChange?.(leftScore, newScore);
    if (newScore >= (WINNING_SCORE)) {
      setGameOver(true);
      setWinner('right');
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
    userId: userInfo.id,
	opponent,
    setGameId
  });
  return (
	<div className="flex items-center justify-center">
    	<div className="relative">
			{!isGameStarted && <GameControls  userId={userInfo.id} 
				resetGame={resetGame} 
				setIsGameStarted={setIsGameStarted}
				setOpponent={setOpponent}
				/>}
			{isGameStarted && <GameCanvas 	ballX={ballX}
							ballY={ballY} 
							leftPaddleY={leftPaddleY} 
							rightPaddleY={rightPaddleY}
							p1score={leftScore}
							p2score={rightScore}
							player1={userInfo.username}
							player2={opponent?.username}
							
							/>}
			{gameOver && isGameStarted && <GameEnd  user={userInfo}
													opponentUserId={opponent?.id}
													winner={winner}
													p1score={leftScore}
													p2score={rightScore}
													gameId={gameId}
													/>}
		</div>
   </div>
  );
};

export default Pong;
