import React, { useEffect, useRef } from "react";

// const BOARD_WIDTH = 1000;
// const BOARD_HEIGHT = 500;
// const PADDLE_WIDTH = 10;
// const PADDLE_HEIGHT = 100;
// const BALL_SIZE = 10;
// const radius = 8;
// const PADDLE_OFFSET = 5;

const BOARD_WIDTH = 1000;
const BOARD_HEIGHT = 500;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 14;
const radius = 14;
const PADDLE_OFFSET = 5;


type GameCanvasProps = {
  ballX: number;
  ballY: number;
  leftPaddleY: number;
  rightPaddleY: number;
};

const GameCanvas = ({
  ballX,
  ballY,
  leftPaddleY,
  rightPaddleY,
}: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear and background - smooth brown/gold-to-tan gradient
    ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    const bgGrad = ctx.createLinearGradient(0, 0, 0, BOARD_HEIGHT);
    bgGrad.addColorStop(0, "#392613");    // Deep dark brown
    bgGrad.addColorStop(0.4, "#7D512B");  // Mid warm brown
    bgGrad.addColorStop(0.85, "#C69C6D"); // Sand/tan
    bgGrad.addColorStop(1, "#F3E3CE");    // Light parchment
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

    // Kungfu dojo border - dark brown + gold glow
    ctx.save();
    ctx.strokeStyle = "#372500";
    ctx.shadowColor = "#FFD70088";
    ctx.shadowBlur = 18;
    ctx.lineWidth = 6;
    ctx.strokeRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    ctx.restore();

    // Glowing net - dash of gold/yellow/orange
    ctx.setLineDash([0, 25]);
    ctx.strokeStyle = "#FFB347";
    ctx.shadowColor = "#FFD700";
    ctx.shadowBlur = 10;
    ctx.lineWidth = 4;
    for (let y = 0; y < BOARD_HEIGHT; y += 30) {
      ctx.beginPath();
      ctx.moveTo(BOARD_WIDTH / 2, y);
      ctx.lineTo(BOARD_WIDTH / 2, y + 16);
      ctx.stroke();
    }
    ctx.restore();

    // Ball with faint gold/off-white glow
    ctx.beginPath();
    ctx.arc(
      ballX + BALL_SIZE / 2,
      ballY + BALL_SIZE / 2,
      BALL_SIZE / 2,
      0,
      Math.PI * 2
    );
    const ballGrad = ctx.createRadialGradient(
      ballX + BALL_SIZE / 2,
      ballY + BALL_SIZE / 2,
      0,
      ballX + BALL_SIZE / 2,
      ballY + BALL_SIZE / 2,
      BALL_SIZE / 2 + 4
    );
    ballGrad.addColorStop(0, "#fffbe6");         // off-white
    ballGrad.addColorStop(0.45, "#ffe4a1");      // light gold
    ballGrad.addColorStop(1, "#ffbb0066");       // soft gold/orange edge
    ctx.fillStyle = ballGrad;
    ctx.shadowColor = "#FFD700";
    ctx.shadowBlur = 22;
    ctx.fill();
    ctx.restore();

    // Left paddle - reddish/dark brown to deep brown, subtle glow
    ctx.beginPath();
    const leftGrad = ctx.createLinearGradient(5, leftPaddleY, 5, leftPaddleY + PADDLE_HEIGHT);
    leftGrad.addColorStop(0, "#943100");
    leftGrad.addColorStop(1, "#372500");
    ctx.fillStyle = leftGrad;
    ctx.shadowColor = "#e38400af";
    ctx.shadowBlur = 10;
    (ctx as any).roundRect(5, leftPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, radius);
    ctx.fill();
    ctx.restore();

    // Right paddle - dark brown to gold, subtle glow
    ctx.beginPath();
    const rightX = BOARD_WIDTH - PADDLE_WIDTH - PADDLE_OFFSET;
    const rightGrad = ctx.createLinearGradient(
      rightX,
      rightPaddleY,
      rightX,
      rightPaddleY + PADDLE_HEIGHT
    );
    rightGrad.addColorStop(0, "#372500");
    rightGrad.addColorStop(1, "#FFD700");
    ctx.fillStyle = rightGrad;
    ctx.shadowColor = "#ffd70088";
    ctx.shadowBlur = 11;
    (ctx as any).roundRect(
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
      className="rounded-2xl shadow-2xl border-0"
      style={{ background: "transparent" }}
    />
  );
};
// const GameCanvas = ({ballX, ballY, leftPaddleY, rightPaddleY}: GameCanvasProps) => {
// 	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	
	
// 	useEffect(() => {
// 		const canvas = canvasRef.current
// 		if (!canvas)
// 			return;
// 		const ctx = canvas.getContext('2d');
// 		if (!ctx)
// 			return;

// 		ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
// 		ctx.fillStyle = '#f5f5dc';
// 		ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
// 		ctx.strokeStyle = '#39FF14';
// 		ctx.lineWidth = 4;
// 		ctx.strokeRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
// 		ctx.setLineDash([5, 15]);
// 		ctx.beginPath();
// 		ctx.moveTo(BOARD_WIDTH/2, 0);
// 		ctx.lineTo(BOARD_WIDTH / 2, BOARD_HEIGHT);
// 		ctx.stroke();
// 		ctx.setLineDash([]);
// 		ctx.fillStyle = 'black';
// 		ctx.beginPath();
// 		ctx.arc(ballX + BALL_SIZE/2, ballY + BALL_SIZE/2, BALL_SIZE/2, 0, Math.PI * 2);
// 		ctx.fill();
// 		ctx.fill();
// 		ctx.beginPath();
// 		ctx.fillStyle = 'blue';
// 		(ctx as any).roundRect(5, leftPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, radius);
// 		ctx.fill();
// 		const rightX = BOARD_WIDTH - PADDLE_WIDTH - PADDLE_OFFSET;
// 		ctx.beginPath();
// 		ctx.fillStyle = 'brown';
//     	(ctx as any).roundRect(rightX, rightPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, radius);
// 		ctx.fill();
// 	}, [ballX, ballY, leftPaddleY, rightPaddleY]);

// 	return (
// 			<canvas ref={canvasRef} width={BOARD_WIDTH} height={BOARD_HEIGHT} className="rounded shadow-lg border-2 border-black"/>
// 	);
// }

export default GameCanvas;