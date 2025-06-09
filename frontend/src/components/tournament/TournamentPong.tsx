// import React from "react";
// import { useState, useRef } from "react";
// import { useGameLoop } from '../../hooks/useGameLoop'
// import { usePaddles } from '../../hooks/usePaddles';
// import { useKeyPress } from '../../hooks/useKeyPress';
// import { useStartGame } from "../../hooks/useStartGame";
// import { useUsername } from "../../hooks/useUsername";
// import GameCanvas from "../game/GameCanvas";
// import TournamentGameEnd from "./TournamentGameEnd";
// import TournamentControls from "./TournamentControls";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useTournamentBracket } from "../../hooks/useTournamentBracket";


// const PADDLE_HEIGHT = 100;
// const BOARD_WIDTH = 1000;
// const BOARD_HEIGHT = 500;
// const BALL_SPEED = 10;
// const WINNING_SCORE = 1;

// type TournamentProps = {
//   onScoreChange?: (leftScore: number, rightScore: number) => void;
//   onGameEnd?: (winner: string) => void;
//   p1UserId: number;
//   p2UserId: number;
//   winningScore?: number;
//   stage: "round1" | "semifinal" | "final";
//   matchIndex?: number;
// };

// const TournamentPong: React.FC<TournamentProps> = ({onScoreChange, onGameEnd, p1UserId, p2UserId, winningScore = WINNING_SCORE, stage, matchIndex,}) => {
// 	  const navigate = useNavigate();
// 	  const players = [p1UserId, p2UserId]; // dummy for the hook
// 	  const [, updateMatchResult] = useTournamentBracket(players);  
// 	  const opponentUserId = p2UserId;
// 	  const p1username = useUsername(p1UserId);
// 	  const player1 = "left Player";
// 	  const player2 = "right Player";
// 	  const [leftPaddleY, setLeftPaddleY] = useState(BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2);
// 	  const [rightPaddleY, setRightPaddleY] = useState(BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2);
// 	  const [ballX, setBallX] = useState(BOARD_WIDTH / 2);
// 	  const [ballY, setBallY] = useState(BOARD_HEIGHT / 2);
// 	  const [gameOver, setGameOver] = useState(false);
// 	  const [winner, setWinner] = useState<'left' | 'right' | null>(null);
// 	  const [leftScore, setLeftScore] = useState(0);
// 	  const [rightScore, setRightScore] = useState(0);
// 	  const ballSpeedX = useRef<number>(BALL_SPEED);
// 	  const ballSpeedY = useRef<number>(0);
// 	  const keysPressed = useKeyPress();
// 	  const [isGameStarted, setIsGameStarted] = useState(false);
// 	  const [gameId, setGameId] = useState<number | null>(null);
// 	  const user = { userId: p1UserId, username: p1username };
	
// 	  const updateLeftScore = (newScore: number) => {
// 		setLeftScore(newScore);
// 		onScoreChange?.(newScore, rightScore);
// 		if (newScore >= winningScore) {
//   			setGameOver(true);
//   			setWinner('left');
// 			const winnerId = p1UserId;
// 			updateMatchResult(stage, matchIndex ?? 0, winnerId);

//   			setTimeout(() => navigate("/play/tournament-bracket"), 2000);
// 		}
// 	  };

// 	  const updateRightScore = (newScore: number) => {
// 		setRightScore(newScore);
// 		onScoreChange?.(leftScore, newScore);
// 		if (newScore >= (winningScore || WINNING_SCORE)) {
// 		  setGameOver(true);
// 		  setWinner('right');
// 		  onGameEnd?.(player2); // Notify tournament system who won
// 		  const winnerId = p1UserId;
// 		  updateMatchResult(stage, matchIndex ?? 0, winnerId);
// 		  setTimeout(() => navigate("/play/tournament-bracket"), 2000);
// 		}
// 	  };
	
// 	  const resetGame = () => {
// 		setGameOver(false);
// 		setWinner(null);
// 		setLeftScore(0);
// 		setRightScore(0);
// 		setLeftPaddleY(BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2);
// 		setRightPaddleY(BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2);
// 		onScoreChange?.(0, 0);
// 		setBallX(BOARD_WIDTH / 2);
// 		setBallY(BOARD_HEIGHT / 2);
// 		ballSpeedX.current = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
// 		ballSpeedY.current = 0;
// 	  };
	
// 	  usePaddles({setLeftPaddleY, setRightPaddleY, keysPressed});
	
// 	  useGameLoop({
// 		  gameOver,
// 		  ballX,
// 		  ballY,
// 		  setBallX,
// 		  setBallY,
// 		  setLeftPaddleY,
// 		  setRightPaddleY,
// 		  ballSpeedX,
// 		  ballSpeedY,
// 		  updateLeftScore,
// 		  updateRightScore,
// 		  leftPaddleY,
// 		  rightPaddleY,
// 		  leftScore,
// 		  rightScore
// 		});
	
// 	  useStartGame({
// 		isGameStarted,
// 		userId: p1UserId,
// 		opponentUserId,
// 		setGameId
// 	  });


// 	return (
// 		<div className="bg-blacks flex items-center justify-center p-4 rounded">
// 			<div className="relative">
// 			{isGameStarted && <GameCanvas ballX={ballX}
// 	   					ballY={ballY} 
// 						leftPaddleY={leftPaddleY} 
// 						rightPaddleY={rightPaddleY}/>
// 			}
// 			{!isGameStarted && <TournamentControls
// 				resetGame={resetGame}
// 				setIsGameStarted={setIsGameStarted}
// 			/>
// 			}
// 			{gameOver && isGameStarted && <TournamentGameEnd  user={user}
// 													opponentUserId={opponentUserId}
// 													winner={winner}
// 													p1score={leftScore}
// 													p2score={rightScore}
// 													gameId={gameId}
//                                   />
//     };
// 			</div>
// 		</div>
// 	)
// }

// export default TournamentPong;

// TournamentPong.tsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGameLoop } from '../../hooks/useGameLoop';
import { usePaddles } from '../../hooks/usePaddles';
import { useKeyPress } from '../../hooks/useKeyPress';
import { useStartGame } from "../../hooks/useStartGame";
import { useUsername } from "../../hooks/useUsername";
import { useTournamentBracket } from "../../hooks/useTournamentBracket";
import GameCanvas from "../game/GameCanvas";
import TournamentGameEnd from "./TournamentGameEnd";
import TournamentControls from "./TournamentControls";

const PADDLE_HEIGHT = 100;
const BOARD_WIDTH = 1000;
const BOARD_HEIGHT = 500;
const BALL_SPEED = 10;
const WINNING_SCORE = 1;

type TournamentProps = {
  onScoreChange?: (leftScore: number, rightScore: number) => void;
  onGameEnd?: (winner: string) => void;
  p1UserId: number;
  p2UserId: number;
  winningScore?: number;
  stage: "round1" | "semifinal" | "final";
  matchIndex?: number;
};

const TournamentPong: React.FC<TournamentProps> = ({
  onScoreChange,
  onGameEnd,
  p1UserId,
  p2UserId,
  winningScore = WINNING_SCORE,
  stage,
  matchIndex
}) => {
  const navigate = useNavigate();
  const players = [p1UserId, p2UserId];
  const [, updateMatchResult] = useTournamentBracket(players);

  const opponentUserId = p2UserId;
  const p1username = useUsername(p1UserId);
  const player1 = "left Player";
  const player2 = "right Player";

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

  const user = { userId: p1UserId, username: p1username };

  const updateLeftScore = (newScore: number) => {
    setLeftScore(newScore);
    onScoreChange?.(newScore, rightScore);
    if (newScore >= winningScore) {
      setGameOver(true);
      setWinner('left');
      updateMatchResult(stage, matchIndex ?? 0, p1UserId);
      onGameEnd?.(player1);
    }
  };

  const updateRightScore = (newScore: number) => {
    setRightScore(newScore);
    onScoreChange?.(leftScore, newScore);
    if (newScore >= winningScore) {
      setGameOver(true);
      setWinner('right');
      updateMatchResult(stage, matchIndex ?? 0, p2UserId);
      onGameEnd?.(player2);
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

  usePaddles({ setLeftPaddleY, setRightPaddleY, keysPressed });

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
    userId: p1UserId,
    opponentUserId,
    setGameId
  });

  return (
    <div className="bg-blacks flex items-center justify-center p-4 rounded">
      <div className="relative">
        {isGameStarted && (
          <GameCanvas
            ballX={ballX}
            ballY={ballY}
            leftPaddleY={leftPaddleY}
            rightPaddleY={rightPaddleY}
          />
        )}
        {!isGameStarted && (
          <TournamentControls resetGame={resetGame} setIsGameStarted={setIsGameStarted} />
        )}
        {gameOver && isGameStarted && (
          <TournamentGameEnd
            user={user}
            opponentUserId={opponentUserId}
            winner={winner}
            p1score={leftScore}
            p2score={rightScore}
            gameId={gameId}
			stage={stage}
          />
        )}
      </div>
    </div>
  );
};

export default TournamentPong;