import { useState } from "react";

type TournamentControlProps = {
	p1UserId: number;
	p2UserId: number;
	resetGame: () => void;
	setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

const TournamentControls = ({p1UserId, p2UserId, resetGame, setIsGameStarted}: TournamentControlProps) => {

	const handleClick = () => {
		setIsGameStarted(true);
		resetGame();
	}

	return (
		<div className="mb-4">
			<button onClick={handleClick} className="px-4 py-2 bg-beige text-white rounded">
				Start Game
			</button>
		</div>
	)
}

export default TournamentControls;