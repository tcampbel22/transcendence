import React, { useEffect, useState, useRef } from 'react';

type PongProps = {
  onScoreChange?: (leftScore: number, rightScore: number) => void;
  onGameEnd?: (winner: string) => void;  // Add this for tournament progression
  player1?: string;                      // Add player names
  player2?: string;
  winningScore?: number;                 // Make winning score configurable
};

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 10;
const BOARD_WIDTH = 1000;
const BOARD_HEIGHT = 500;
const PADDLE_SPEED = 10;
const BALL_SPEED = 10;
const PADDLE_SIZE = 5;
const WINNING_SCORE = 1;

const Pong: React.FC<PongProps> = ({ 
  onScoreChange, 
  onGameEnd,
  player1 = "Left Player", 
  player2 = "Right Player",
  winningScore = WINNING_SCORE 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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
  const keysPressed = useRef<{ [key: string]: boolean }>({ ArrowUp: false, ArrowDown: false, w: false, s: false });

  const updateLeftScore = (newScore: number) => {
    setLeftScore(newScore);
    onScoreChange?.(newScore, rightScore);
    if (newScore >= (winningScore || WINNING_SCORE)) {
      setGameOver(true);
      setWinner('left');
      onGameEnd?.(player1); // Notify tournament system who won
    }
  };

  const updateRightScore = (newScore: number) => {
    setRightScore(newScore);
    onScoreChange?.(leftScore, newScore);
    if (newScore >= (winningScore || WINNING_SCORE)) {
      setGameOver(true);
      setWinner('right');
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key in keysPressed.current) {
        keysPressed.current[event.key] = true;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key in keysPressed.current) {
        keysPressed.current[event.key] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const movePaddles = () => {
      setLeftPaddleY((prev) =>
        Math.max(0, Math.min(BOARD_HEIGHT - PADDLE_HEIGHT, prev + (keysPressed.current.s ? PADDLE_SPEED : 0) - (keysPressed.current.w ? PADDLE_SPEED : 0)))
      );
      setRightPaddleY((prev) =>
        Math.max(0, Math.min(BOARD_HEIGHT - PADDLE_HEIGHT, prev + (keysPressed.current.ArrowDown ? PADDLE_SPEED : 0) - (keysPressed.current.ArrowUp ? PADDLE_SPEED : 0)))
      );
    };

    const paddleInterval = setInterval(movePaddles, 1000 / 60);

    return () => clearInterval(paddleInterval);
  }, []);

  useEffect(() => {
    if (gameOver) return;
    // Move updateGame inside so it always has fresh state
    const updateGame = () => {
      let newBallX = ballX + ballSpeedX.current;
      let newBallY = ballY + ballSpeedY.current;
  
      if (newBallY <= 0 || newBallY + BALL_SIZE >= BOARD_HEIGHT) {
        ballSpeedY.current *= -1;
      }
  
      if (newBallX <= PADDLE_WIDTH && newBallY + BALL_SIZE >= leftPaddleY && newBallY <= leftPaddleY + PADDLE_HEIGHT) {
        ballSpeedX.current *= -1;
        const impact = (newBallY - leftPaddleY) / PADDLE_HEIGHT - 0.5;
        ballSpeedY.current = BALL_SPEED * impact * 1.5;
      }
  
      if (newBallX >= BOARD_WIDTH - PADDLE_WIDTH - BALL_SIZE && newBallY + BALL_SIZE >= rightPaddleY && newBallY <= rightPaddleY + PADDLE_HEIGHT) {
        ballSpeedX.current *= -1;
        const impact = (newBallY - rightPaddleY) / PADDLE_HEIGHT - 0.5;
        ballSpeedY.current = BALL_SPEED * impact * 1.5;
      }
  
      if (newBallX <= 0 || newBallX >= BOARD_WIDTH - BALL_SIZE) {
          if (newBallX <= 0) {  
              setRightScore((score) => {
                  const newScore = score + 1;
                  if (newScore > 5) {
                      setLeftScore(0);
                      return 0;
                  }
                  return newScore;
              });
          } 
          else if (newBallX >= BOARD_WIDTH - BALL_SIZE) {  
              setLeftScore((score) => {
                  const newScore = score + 1;
                  if (newScore > 5) {
                      setRightScore(0);
                      return 0;
                  }
                  return newScore;
              });
          }
          if (newBallX <= 0) {
            updateRightScore(rightScore + 1);
          } else {
            updateLeftScore(leftScore + 1);
          }
          if (newBallX >= BOARD_WIDTH / 2)
              setBallX(BOARD_WIDTH - PADDLE_WIDTH - PADDLE_SIZE);
          else
              setBallX(0 + PADDLE_WIDTH + PADDLE_SIZE);
          setBallY(BOARD_HEIGHT / 2);
          ballSpeedX.current = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
          ballSpeedY.current = 0;
          setLeftPaddleY(BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2);
          setRightPaddleY(BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2);
          return ;
      }
      setBallX(newBallX);
      setBallY(newBallY);
    };
    
    const gameLoop = setInterval(updateGame, 1000 / 60);
    return () => clearInterval(gameLoop);
  }, [gameOver, ballX, ballY, leftScore, rightScore]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
	ctx.fillStyle = 'black';
  	ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
	ctx.strokeStyle = '#39FF14';
	ctx.lineWidth = 4;
	ctx.strokeRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
	ctx.setLineDash([5, 15]);
	ctx.beginPath();
	ctx.moveTo(BOARD_WIDTH / 2, 0);
	ctx.lineTo(BOARD_WIDTH / 2, BOARD_HEIGHT);
	ctx.stroke();
	ctx.setLineDash([]);
    ctx.fillStyle = '#39FF14';
	ctx.beginPath();
	ctx.arc(ballX + BALL_SIZE/2, ballY + BALL_SIZE/2, BALL_SIZE/2, 0, Math.PI * 2);
	ctx.fill();
    ctx.fillStyle = '#FFFF00';
    ctx.fillRect(0, leftPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillStyle = '#BC13FE';
    ctx.fillRect(BOARD_WIDTH - PADDLE_WIDTH, rightPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);
  }, [ballX, ballY, leftPaddleY, rightPaddleY]);

  return (
	<div className="bg-black flex items-center justify-center p-4">
    <div className="relative">
      <canvas ref={canvasRef} width={BOARD_WIDTH} height={BOARD_HEIGHT} />
	  {gameOver && (
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
    )}
    </div>
   </div>
  );
};

export default Pong;
