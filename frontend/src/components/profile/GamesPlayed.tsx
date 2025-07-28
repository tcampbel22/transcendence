import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import api from "../../lib/api";

type GameStatsInfo = {
	userId: number;
};

type Game = {
	gameId: number;
  	opponentName: string;
  	score: string;
  	result: string;
  	played: string;
	date: string;
};

const GamesPlayed = ({userId}: GameStatsInfo) => {
	const API_URL = import.meta.env.VITE_API_USER;
	const [games, setGames] = useState<Game[]>([]);

	useEffect (() => {
		const getMatchHistory = async () => {
			try {
				const history = await api.get(`${API_URL}/${userId}/match-history`);
				setGames(history.data);
			} catch (err) {
				const error = err as AxiosError;
				console.log(error.response?.data || "error fetching match history")
			}
		}
		getMatchHistory();
	},[userId]);

    return (
		<div className="rounded border h-full w-full overflow-y-auto">
            <h1 className="text-amber-200 text-center font-bold text-2xl mb-2 pt-4">Match History</h1>
			<div className="grid grid-cols-5 font-semibold border-b pb-2 mb-2 text-amber-200 text-center m-4">
				<p>Match ID</p>
				<p>Opponent</p>
				<p>Result</p>
				<p>Outcome</p>
				<p>Date</p>
  			</div>
			  	{games.length > 0 ? (
					  games.map((game, index) => (
						  <div
						  key={index}
					className="grid grid-cols-5 border-b py-2 text-center text-amber-200 last:border-b-0"
					>
					<p>#{game.gameId}</p>
					<p>{game.opponentName}</p>
					<p>{game.score}</p>
					<p className={game.result.trim() === 'Winner' ? 'text-indigo-400' : 'text-red-400'}>
						{game.result}
					</p>
					<p>{new Date(game.date).toLocaleDateString()}</p>
				</div>
				))
			) : (
				<div className="text-center text-2xl text-gray-500 py-4">
					{"No match history found"}
				</div>
			)}
        </div>
    )
}

export default GamesPlayed;