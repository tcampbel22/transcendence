import React, { useState } from "react";
import Pong from "../components/game/Pong"
import { useLocation } from 'react-router-dom';



const OneVsOnePage: React.FC = () => {
	const [scores, setScores] = useState({ left: 0, right: 0 });
	const location = useLocation();
	const userInfo = location.state as { userId: number; username: string };

	return (
		<div className="flex flex-col items-center">
		<h1 className="text-3xl font-bold my-4">1v1 Match</h1>
		<h2>Score: {scores.left} - {scores.right}</h2>
		<Pong onScoreChange={(left, right) => setScores({ left, right })} userInfo={userInfo} />
		</div>
	)
}

export default OneVsOnePage;
