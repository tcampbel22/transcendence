import React, { useState } from "react";
import Pong from "../components/game/Pong"
import { useLocation } from 'react-router-dom';
import { TitleCard } from "../components/utils/TitleCard";


const OneVsOnePage: React.FC = () => {
	const [scores, setScores] = useState({ left: 0, right: 0 });
	const location = useLocation();
	const userInfo = location.state as { userId: number; username: string };
	const user = {
		username: userInfo.username,
		id: userInfo.userId
	}
	return (
		<div className="flex flex-col items-center justify-center max-w-screen">
			<TitleCard image="/images/pong.webp"/>
			{/* <h2 className="text-2xl text-amber-200 font-bold">{userInfo.username} {scores.left} - {scores.right} Opponent</h2> */}
			<div className="text-amber-200">
				<Pong onScoreChange={(left, right) => setScores({ left, right })} userInfo={user} />
			</div>
		</div>
	)
}

export default OneVsOnePage;
