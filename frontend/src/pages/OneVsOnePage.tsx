import React, { useState } from "react";
import Pong from "../components/Pong"



const OneVsOnePage: React.FC = () => {
	const [scores, setScores] = useState({ left: 0, right: 0 });

	return (
		<div className="flex flex-col items-center">
		<h1 className="text-3xl font-bold my-4">1v1 Match</h1>
		<h2>Score: {scores.left} - {scores.right}</h2>
		<Pong onScoreChange={(left, right) => setScores({ left, right })} />
		</div>
	)
}

export default OneVsOnePage;
