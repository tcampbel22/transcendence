import React, { useEffect } from "react";

const PADDLE_HEIGHT = 100;
const BOARD_HEIGHT = 500;
const PADDLE_SPEED = 10;

type ControlKeys = 'ArrowUp' | 'ArrowDown' | 'w' | 's';

type PaddleProps = {
    setLeftPaddleY: React.Dispatch<React.SetStateAction<number>>;
    setRightPaddleY: React.Dispatch<React.SetStateAction<number>>;
    keysPressed: React.RefObject<{[key: string]: boolean}>;
}

export function usePaddles ({
    setLeftPaddleY,
    setRightPaddleY,
    keysPressed
}: PaddleProps) {
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
}