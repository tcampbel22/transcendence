import { useEffect, useRef } from "react";

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 10;
const BOARD_WIDTH = 1000;
const BOARD_HEIGHT = 500;
const BALL_SPEED = 10;


type GameUtils = {
  gameOver: boolean;
  ballX: number;
  ballY: number;
  setBallX: React.Dispatch<React.SetStateAction<number>>;
  setBallY: React.Dispatch<React.SetStateAction<number>>;
  setLeftPaddleY: React.Dispatch<React.SetStateAction<number>>;
  setRightPaddleY: React.Dispatch<React.SetStateAction<number>>;
  ballSpeedX: React.RefObject<number>;
  ballSpeedY: React.RefObject<number>;
  updateLeftScore: (score: number) => void;
  updateRightScore: (score: number) => void;
  leftPaddleY: number;
  rightPaddleY: number;
  leftScore: number;
  rightScore: number;
  leftScoreRef: React.RefObject<number>;
  rightScoreRef: React.RefObject<number>;
};

export function useGameLoop({
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
  rightScore,
  leftScoreRef,
  rightScoreRef
}: GameUtils) {
  const scoredRef = useRef(false);
  const animationFrameId = useRef<number | null>(null);

  // Refs to track latest values
  const ballXRef = useRef(ballX);
  const ballYRef = useRef(ballY);


  useEffect(() => {
    ballXRef.current = ballX;
    ballYRef.current = ballY;
    leftScoreRef.current = leftScore;
    rightScoreRef.current = rightScore;
  }, [ballX, ballY, leftScore, rightScore]);

  useEffect(() => {
    if (gameOver) return;

    const updateGame = () => {
      let newBallX = ballXRef.current + ballSpeedX.current;
      let newBallY = ballYRef.current + ballSpeedY.current;

      // Bounce off top/bottom
      if (newBallY <= 0 || newBallY + BALL_SIZE >= BOARD_HEIGHT) {
        ballSpeedY.current *= -1;
      }

      // Collision with left paddle
      if (
        newBallX <= PADDLE_WIDTH &&
        newBallY + BALL_SIZE >= leftPaddleY &&
        newBallY <= leftPaddleY + PADDLE_HEIGHT
      ) {
        ballSpeedX.current *= -1;
        const impact = (newBallY - leftPaddleY) / PADDLE_HEIGHT - 0.5;
        ballSpeedY.current = BALL_SPEED * impact * 1.5;
        scoredRef.current = false;
      }

      // Collision with right paddle
      if (
        newBallX >= BOARD_WIDTH - PADDLE_WIDTH - BALL_SIZE &&
        newBallY + BALL_SIZE >= rightPaddleY &&
        newBallY <= rightPaddleY + PADDLE_HEIGHT
      ) {
        ballSpeedX.current *= -1;
        const impact = (newBallY - rightPaddleY) / PADDLE_HEIGHT - 0.5;
        ballSpeedY.current = BALL_SPEED * impact * 1.5;
        scoredRef.current = false;
      }

      // Scoring
      if (!scoredRef.current && (newBallX <= 0 || newBallX >= BOARD_WIDTH - BALL_SIZE)) {
        scoredRef.current = true; // Prevent further scoring in this frame

        if (newBallX <= 0) {
          const newScore = rightScoreRef.current + 1;
          rightScoreRef.current = newScore;
          updateRightScore(newScore);
        } else {
          const newScore = leftScoreRef.current + 1;
          leftScoreRef.current = newScore;
          updateLeftScore(newScore);
        }

        // Reset ball position and speed immediately
        ballXRef.current = BOARD_WIDTH / 2;
        ballYRef.current = BOARD_HEIGHT / 2;
        setBallX(ballXRef.current);
        setBallY(ballYRef.current);

        ballSpeedX.current = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
        ballSpeedY.current = 0;

        const centerY = BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2;
        setLeftPaddleY(centerY);
        setRightPaddleY(centerY);

        // Reset `scoredRef` after a short delay to allow the ball to move out of the scoring zone
        setTimeout(() => {
          scoredRef.current = false;
        }, 100); // Adjust the delay as needed
      } else {
        // Continue moving ball
        ballXRef.current = newBallX;
        ballYRef.current = newBallY;
        setBallX(newBallX);
        setBallY(newBallY);
      }

      animationFrameId.current = requestAnimationFrame(updateGame);
    };

    animationFrameId.current = requestAnimationFrame(updateGame);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameOver, leftPaddleY, rightPaddleY, setBallX, setBallY]);
}
