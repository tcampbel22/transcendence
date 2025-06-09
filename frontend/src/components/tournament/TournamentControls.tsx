import { useState } from "react";

type TournamentControlProps = {
	resetGame: () => void;
	setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

const TournamentControls = ({resetGame, setIsGameStarted}: TournamentControlProps) => {

	const handleClick = () => {
		setIsGameStarted(true);
		resetGame();
	}

	return (
		<div className="mb-4">
			<button onClick={handleClick} className="bg-beige shadow-lg rounded-lg p-10 px-10 transform hover:scale-110">
				Start Game
			</button>
		</div>
	)
}

export default TournamentControls;