import React from "react";
import { Link } from "react-router-dom";
import { Header1 } from "../utils/Headers";
import { ListProps, TournamentCardProps, PlayerProps, FilterProps } from "../../types/types";



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

// Need to fix this, it needs to link to the tournament bracket page which will generate the bracket based on the players array
//  passed though as a state.
// export const StartTournament = ({ startTournament }: { startTournament: boolean }) => {
// 	if (!startTournament)
// 		return ;
// 	return (
// 		<div className="text-6xl px-9 p-10">
// 			<Link
// 					to="/play/tournament-bracket"
// 					// state={data}
// 					className="w-full h-full flex items-center justify-center backdrop-brightness-50 rounded-lg"
// 					>
// 				<button className="bg-amber-100 shadow-lg rounded-lg p-10 px-10 transform hover:scale-110">
// 					Start Tournament
// 				</button>
// 				</Link>

// 		</div>
// 	);
// }


export const PlayersCard = ({players}: {players: PlayerProps[]}) => {
	return (
		<div className="w-full max-w-md bg-beige rounded-lg shadow-lg p-1 text-2xl pt-4 pb-4">
			<div className="mb-6 text-3xl">
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


export const FilterCard: React.FC<TournamentCardProps> = ({ data, players, togglePlayers, c_id }) => {
	if (data.length === 0)
		return <p className="w-full max-w-md bg-beige rounded-lg shadow-lg p-1 text-2xl pt-4 pb-4">No players found</p>
	return (
		<div className="w-full max-w-md bg-beige rounded-lg shadow-lg p-1 text-2xl pt-4 pb-4">
			<div className="mb-6 text-3xl">
				<Header1 text="Choose Players"/>
			</div>
			<ul className="space-y-2 max-h-100 overflow-y-auto pr-2">
				{data
					.filter(u => u.id !== c_id)
					.map(u => {
					const isAdded = players.some(user => ( user.id === u.id));
					const buttonText = isAdded ? 'Remove' : 'Add';
					const handleUserClick = () => {
						if (togglePlayers)
							togglePlayers(u.id);
					}
					return <PlayerList
						key={u.id}
						name={u.username}
						togglePlayers={handleUserClick}
						buttonText={buttonText}
						username={players[0].username}
					/>
				})}
			</ul>
		</div>
	)
}


export const PlayerFilter: React.FC<FilterProps> = ({ filter, handleFilter }) => {
	return (
		<div className="mb-20">
			<label htmlFor="name"></label>
				<input
					value={filter}
					onChange={handleFilter}
					type="text"
					placeholder="Enter player name"
					className="w-full max-w-xl px-5 py-6 text-2xl rounded-2xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-900">
				</input>
		</div>
	)
}
