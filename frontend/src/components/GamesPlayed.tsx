import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

type GameStatsInfo = {
	userId: number;
};

type Game = {
	matchId: number;
  	opponent: string;
  	result: string;
  	won: boolean;
  	played: string;
};

const GamesPlayed = ({userId}: GameStatsInfo) => {
	const API_URL = "https://localhost:4433";
	const [games, setGames] = useState<Game[]>([]);


	useEffect (() => {
		const getMatchHistory = async () => {
			try {
				// const history = await axios.get(`${API_URL}/games/user/${userId}`);
				const history = await axios.get(`${API_DEV_URL}/games/user/${userId}`);
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
				<p>Match</p>
				<p>Opponent</p>
				<p>Result</p>
				<p>Outcome</p>
				<p>Date</p>
  			</div>
	{games.map((game, index) => (
    <div
      key={index}
      className="grid grid-cols-5 border-b py-2 text-center text-black last:border-b-0"
    >
      <p>#{index + 1}</p>
      <p>{game.opponent}</p>
      <p>{game.result}</p>
      <p className={game.won ? 'text-green-600' : 'text-red-600'}>
        {game.won ? 'Win' : 'Loss'}
      </p>
      <p>{new Date(game.played).toLocaleDateString()}</p>
    </div>
  ))}
        </div>
    )
}

export default GamesPlayed;