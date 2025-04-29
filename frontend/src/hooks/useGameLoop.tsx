import React, { useEffect } from "react";

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 10;
const BOARD_WIDTH = 1000;
const BOARD_HEIGHT = 500;
const BALL_SPEED = 10;
const PADDLE_SIZE = 5;

type gameUtils = {
  gameOver: boolean,
    ballX: number,
    ballY: number,
    setBallX: React.Dispatch<React.SetStateAction<number>>,
    setBallY: React.Dispatch<React.SetStateAction<number>>,
    setLeftPaddleY: React.Dispatch<React.SetStateAction<number>>,
    setRightPaddleY: React.Dispatch<React.SetStateAction<number>>,
    ballSpeedX: React.RefObject<number>,
    ballSpeedY: React.RefObject<number>,
    updateLeftScore: (score: number) => void,
    updateRightScore: (score: number) => void,
    leftPaddleY: number,
    rightPaddleY: number,
    leftScore: number,
    rightScore: number
}

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
    rightScore
}: gameUtils) {
    //logic for the pong game. Same as it used to be, now it's just in ts code and this is called in the actual component.
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
      }, [gameOver, ballX, ballY]);
};