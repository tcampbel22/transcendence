import React from "react";
import { Link } from "react-router-dom";
import { Header1 } from "../utils/Headers";
import { ListProps, TournamentCardProps, PlayerProps, FilterProps, ButtonProps } from "../../types/types";



export const PlayerList: React.FC<ListProps> = ({ name, togglePlayers, buttonText }) => {
	const colour = buttonText === 'Add' ? 'amber-600' : 'red-500'
	return (
	<li className="flex justify-between items-center px-7">
		<span>{name}</span>
		<button
			onClick={() => togglePlayers && togglePlayers()}
			className={`bg-${colour} shadow-lg rounded-lg p-1 pl-3 pr-3 transform hover:scale-110`}>
			{buttonText}
		</button>
	</li>
	)
}


const List: React.FC<ListProps> = ({ name, togglePlayers, buttonText }) => {
	
	return (
	<li className="flex justify-between items-center px-7">
		<span>{name}</span>
		<Button colour="" text={buttonText} togglePlayers={togglePlayers}/>
	</li>
	)
}

const Button: React.FC<ButtonProps> = ({ colour, text, togglePlayers } ) => {
	return (
		<button
			onClick={() => togglePlayers && togglePlayers()}
			className={`${colour} rounded px-3 py-1 border hover:text-gray-900 hover:bg-amber-200`}>
			{text}
		</button>
	)
}

function shuffleArray(array: PlayerProps[]): number[] {
	const arr = [...array];
	for (let i = arr.length - 1; i > 0; i--) {
	  const j = Math.floor(Math.random() * (i + 1));
	  [arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr.map(player => player.id);
}

const StartTournament = ({ players, setPlayers }: { players: PlayerProps[], setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>> }) => {

	const shuffledPlayerIds = shuffleArray(players);
	localStorage.removeItem("tournament_bracket");
	return (
		<div className="fixed inset-0 flex flex-col justify-center bg-gray-900 opacity-95 items-center text-6xl">
			<Link
				to="/play/tournament-bracket"
				state={{ shuffledPlayerIds }}
			>
				<div>
					<button className="border m-1 p-6 rounded hover:bg-amber-200 hover:text-gray-900">
						Start Tournament
					</button>
				</div>
			</Link>
			<button 
				className="border rounded text-2xl m-1 p-2 hover:bg-amber-200 hover:text-gray-900" 
				onClick={() => setPlayers([players[0]])}>
					Back
			</button>
		</div>
	);
};


const PlayersCard = ({players}: {players: PlayerProps[]}) => {
	return (
		<div className="w-full max-w-md border rounded p-1 text-center text-2xl pt-4 pb-4 overflow-y-scroll">
			<div className="mb-6 text-3xl text-center">
				<Header1 text="Selected Players"/>
			</div>
			<ul className="mb-4">
				{players.map(p => {
					return <li key={p.id}>{p.username}</li>
				})}
			</ul>
		</div>
	)
}


const FilterCard: React.FC<TournamentCardProps> = ({ data, players, togglePlayers, c_id }) => {
	if (data.length === 0)
		return <p className="flex justify-center items-center w-full border max-w-md rounded text-2xl">No players found</p>
	return (
		<div className="w-full max-h-md border rounded p-1 text-2xl pt-4 pb-4 overflow-y-scroll">
			<div className="mb-6 text-center">
				<Header1 text="Choose Players"/>
			</div>
			<ul className="space-y-2 max-h-100">
				{data
					.filter(u => u.id !== c_id)
					.map(u => {
					const isAdded = players.some(user => ( user.id === u.id));
					const buttonText = isAdded ? 'Remove' : 'Add';
					const handleUserClick = () => {
						if (togglePlayers)
							togglePlayers(u.id);
					}
					return <List
						key={u.id}
						name={u.username}
						togglePlayers={handleUserClick}
						buttonText={buttonText}
					/>
				})}
			</ul>
		</div>
	)
}


const PlayerFilter: React.FC<FilterProps> = ({ filter, handleFilter }) => {
	return (
		<div className="flex flex-col justify-center items-center gap-2">
			
			<Header1 text="Search players"/>
			<label htmlFor="name"></label>
				<input
					value={filter}
					onChange={handleFilter}
					type="text"
					placeholder="enter player name..."
					className="min-w-lg px-5 py-6 text-2xl rounded border">
				</input>
		</div>
	)
}

export { PlayerFilter, FilterCard, PlayersCard, StartTournament, }