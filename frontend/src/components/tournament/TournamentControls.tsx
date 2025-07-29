import React from "react";

export type StartTournamentGameProps = {
	p1UserId: number | "TBD";
	p2UserId: number | "TBD";
	stage: string;
	matchIndex?: number;
	onStart?: () => void;
	onClose?: () => void;
}

export const StartTournamentGame:React.FC<StartTournamentGameProps> = ({ 
	p1UserId, p2UserId, stage, matchIndex, onStart, onClose }) => {
	return (
		<div className="fixed inset-0 flex flex-col gap-4 items-center justify-center bg-gray-900 opacity-95">
			<button onClick={onStart} className="border rounded p-6 text-2xl hover:bg-amber-200 hover:text-gray-900">Start Game</button>
			<button onClick={onClose} className="border rounded p-6 text-xl hover:bg-amber-200 hover:text-gray-900">Back</button>
		</div>
	)
}