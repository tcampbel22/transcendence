import React, { useEffect, useRef } from "react";

const BOARD_WIDTH = 1000;
const BOARD_HEIGHT = 500;
const BOARD_MIDDLE = BOARD_HEIGHT / 2;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 20;
const radius = 14;
const PADDLE_OFFSET = 5;


type GameCanvasProps = {
  ballX: number;
  ballY: number;
  leftPaddleY: number;
  rightPaddleY: number;
  p1score: number;
  p2score: number;
  player1?: string;
  player2?: string;
};

const GameCanvas:React.FC<GameCanvasProps> = ({
  ballX,
  ballY,
  leftPaddleY,
  rightPaddleY,
  p1score,
  p2score,
  player1,
  player2
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

	ctx.setLineDash([50, 15])
	ctx.strokeStyle = "#ffe4a1"
	ctx.lineWidth = 10

	ctx.globalAlpha = 0.5;
	ctx.font = "50px mono";
	ctx.textAlign = 'center'
	ctx.textBaseline = 'bottom';
	ctx.fillStyle = "#ffe4a1";
	ctx.fillText(`${player1}`, BOARD_WIDTH / 4, BOARD_MIDDLE / 4);
	
	ctx.font = "180px mono";
	ctx.textAlign = 'center'
	ctx.textBaseline = 'bottom';
	ctx.fillStyle = "#ffe4a1";
	ctx.fillText(`${p1score}`, BOARD_WIDTH / 4, BOARD_MIDDLE); 
	
	ctx.font = "180px mono"; 
	ctx.textAlign = 'center'
	ctx.textBaseline = 'bottom';
	ctx.fillStyle = "#ffe4a1";
	ctx.fillText(`${p2score}`, 3 *(BOARD_WIDTH / 4), BOARD_MIDDLE);  

	ctx.font = "50px mono";
	ctx.textAlign = 'center'
	ctx.textBaseline = 'bottom';
	ctx.fillStyle = "#ffe4a1";
	ctx.fillText(`${player2}`, 3 *(BOARD_WIDTH / 4), BOARD_MIDDLE / 4);
	ctx.globalAlpha = 1;

	ctx.beginPath()
	ctx.moveTo(500,500)
	ctx.lineTo(500, 0)
	ctx.stroke()

    ctx.beginPath();
    ctx.arc(
      ballX + BALL_SIZE / 2,
      ballY + BALL_SIZE / 2,
      BALL_SIZE / 2,
      0,
      Math.PI * 2
    );
	//Ball
    ctx.fillStyle = "#ffe4a1";
    ctx.fill();
    ctx.restore();
	//Left Paddle
    ctx.beginPath();
    ctx.fillStyle = "#ffe4a1";
    (ctx as any).rect(5, leftPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, radius);
    ctx.fill();
    ctx.restore();
	//Rigth paddle
    ctx.beginPath();
    const rightX = BOARD_WIDTH - PADDLE_WIDTH - PADDLE_OFFSET;
    ctx.fillStyle = "#ffe4a1";
    (ctx as any).rect(
      rightX,
      rightPaddleY,
      PADDLE_WIDTH,
      PADDLE_HEIGHT,
      radius
    );
    ctx.fill();
    ctx.restore();
  }, [ballX, ballY, leftPaddleY, rightPaddleY]);



  return (
    <canvas
      ref={canvasRef}
      width={BOARD_WIDTH}
      height={BOARD_HEIGHT}
      className="shadow-xl border-10"
    />
  );
};

export default GameCanvas;