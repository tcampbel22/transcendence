import { useEffect, useRef } from "react";

const BOARD_WIDTH = 1000;
const BOARD_HEIGHT = 500;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 10;

type GameCanvasProps = {
	ballX: number;
	ballY: number;
	leftPaddleY: number;
	rightPaddleY: number;
};

const GameCanvas = ({ballX, ballY, leftPaddleY, rightPaddleY}: GameCanvasProps) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	
	
	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas)
			return;
		const ctx = canvas.getContext('2d');
		if (!ctx)
			return;

		ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
		ctx.strokeStyle = '#39FF14';
		ctx.lineWidth = 4;
		ctx.strokeRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
		ctx.setLineDash([5, 15]);
		ctx.beginPath();
		ctx.moveTo(BOARD_WIDTH/2, 0);
		ctx.lineTo(BOARD_WIDTH / 2, BOARD_HEIGHT);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.fillStyle = '#39FF14';
		ctx.beginPath();
		ctx.arc(ballX + BALL_SIZE/2, ballY + BALL_SIZE/2, BALL_SIZE/2, 0, Math.PI * 2);
		ctx.fill();
		ctx.fill();
		ctx.fillStyle = '#FFFF00';
		ctx.fillRect(0, leftPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);
		ctx.fillStyle = '#BC13FE';
    	ctx.fillRect(BOARD_WIDTH - PADDLE_WIDTH, rightPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);
	}, [ballX, ballY, leftPaddleY, rightPaddleY]);

	return ( 
		<canvas ref={canvasRef} width={BOARD_WIDTH} height={BOARD_HEIGHT} />
	);
}

export default GameCanvas;