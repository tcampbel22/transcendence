import { useEffect, useRef } from "react";

const BOARD_WIDTH = 1000;
const BOARD_HEIGHT = 500;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 10;
const radius = 8;
const PADDLE_OFFSET = 5;

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
		ctx.fillStyle = '#f5f5dc';
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
		ctx.fillStyle = 'black';
		ctx.beginPath();
		ctx.arc(ballX + BALL_SIZE/2, ballY + BALL_SIZE/2, BALL_SIZE/2, 0, Math.PI * 2);
		ctx.fill();
		ctx.fill();
		ctx.beginPath();
		ctx.fillStyle = 'blue';
		(ctx as any).roundRect(5, leftPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, radius);
		ctx.fill();
		const rightX = BOARD_WIDTH - PADDLE_WIDTH - PADDLE_OFFSET;
		ctx.beginPath();
		ctx.fillStyle = 'brown';
    	(ctx as any).roundRect(rightX, rightPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, radius);
		ctx.fill();
	}, [ballX, ballY, leftPaddleY, rightPaddleY]);

	return (
			<canvas ref={canvasRef} width={BOARD_WIDTH} height={BOARD_HEIGHT} className="rounded shadow-lg border-2 border-black"/>
	);
}

export default GameCanvas;