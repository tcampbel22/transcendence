import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

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
				const history = await axios.get(`${API_URL}/${userId}/match-history`);
				setGames(history.data);
			} catch (err) {
				const error = err as AxiosError;
				console.log(error.response?.data || "error fetching match history")
			}
		}
		getMatchHistory();
	},[userId]);


    return (
        <div className="bg-beige col-span-2 rounded border border-white shadow-md">
            <h1 className="text-black font-bold text-xl">Match History</h1>
			<div className="grid grid-cols-5 font-semibold border-b pb-2 mb-2 text-black m-4">
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
      className="grid grid-cols-5 border-b py-2 text-center text-black last:border-b-0"
    >
      <p>#{game.gameId}</p>
      <p>{game.opponentName}</p>
      <p>{game.score}</p>
	    <p className={game.result.trim() === 'Winner' ? 'text-green-600' : 'text-red-600'}>
      {game.result}
	    </p>
      <p>{new Date(game.date).toLocaleDateString()}</p>
    </div>
  ))
) : (
  <div className="text-center text-gray-500 py-4">
    {"No match history found"}
  </div>
)}
        </div>
    )
}

export default GamesPlayed;