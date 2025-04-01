import React, { useEffect, useState, useRef } from 'react';

type PongProps = {
  setLeftScore: React.Dispatch<React.SetStateAction<number>>;
  setRightScore: React.Dispatch<React.SetStateAction<number>>;
};

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 10;
const BOARD_WIDTH = 1000;
const BOARD_HEIGHT = 500;
const PADDLE_SPEED = 10;
const BALL_SPEED = 10;
const PADDLE_SIZE = 5;

const Pong: React.FC<PongProps> = ({ setLeftScore, setRightScore }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [leftPaddleY, setLeftPaddleY] = useState(BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [rightPaddleY, setRightPaddleY] = useState(BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [ballX, setBallX] = useState(BOARD_WIDTH / 2);
  const [ballY, setBallY] = useState(BOARD_HEIGHT / 2);
  const [leftScore, setLeftScoreState] = useState(0);
  const [rightScore, setRightScoreState] = useState(0);

  const ballSpeedX = useRef<number>(BALL_SPEED);
  const ballSpeedY = useRef<number>(0);
  const keysPressed = useRef<{ [key: string]: boolean }>({ ArrowUp: false, ArrowDown: false, w: false, s: false });

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

  useEffect(() => {
    const gameLoop = setInterval(updateGame, 1000 / 60);
    return () => clearInterval(gameLoop);
  }, [ballX, ballY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) 
        return;
    const ctx = canvas.getContext('2d');
    if (!ctx)
      return;

    ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, BOARD_WIDTH, PADDLE_SIZE);
    ctx.fillRect(0, BOARD_HEIGHT - PADDLE_SIZE, BOARD_WIDTH, PADDLE_SIZE);
    ctx.fillStyle = 'black';
    ctx.fillRect(ballX, ballY, BALL_SIZE, BALL_SIZE);
    ctx.fillStyle = 'yellow';
    ctx.fillRect(0, leftPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillStyle = 'blue';
    ctx.fillRect(BOARD_WIDTH - PADDLE_WIDTH, rightPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);
  }, [ballX, ballY, leftPaddleY, rightPaddleY]);

  return (
    <div>
      <canvas ref={canvasRef} width={BOARD_WIDTH} height={BOARD_HEIGHT} />
    </div>
  );
};

export default Pong;
