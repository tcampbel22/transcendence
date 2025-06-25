import React, { useState } from "react";
import Pong from "../components/game/Pong"
import { useLocation } from 'react-router-dom';



const OneVsOnePage: React.FC = () => {
	const [scores, setScores] = useState({ left: 0, right: 0 });
	const location = useLocation();
	const userInfo = location.state as { userId: number; username: string };

	return (
		<div className="flex flex-col items-center ">
		<h1 className="text-6xl text-beige font-bold my-4">1v1 Match</h1>
		<h2 className="text-xl text-beige font-bold">{userInfo.username} {scores.left} - {scores.right} Opponent</h2>
		<Pong onScoreChange={(left, right) => setScores({ left, right })} userInfo={userInfo} />
		</div>
	)
}

export default OneVsOnePage;
