import React, { useState, useEffect } from "react";
import { TitleCard } from "../utils/TitleCard";
import { useLocation } from "react-router-dom";
import { UserProps } from "../../types/types";
import  useAllUsers  from '../../hooks/useAllUsers'
import { Link } from "react-router-dom";
import { Header1 } from "../utils/Headers";
import { ListProps, ButtonProps, TournamentCardProps, PlayerProps } from "../../types/types";



const List: React.FC<ListProps> = ({ name, togglePlayers, buttonText }) => {
	const colour = buttonText === 'Add' ? 'amber-600' : 'red-500' 
	return ( 
	<li className="flex justify-between items-center px-7">
		<span>{name}</span> 
		<Button colour={colour} text={buttonText} togglePlayers={togglePlayers}/>
	</li>
	)
}

const Button: React.FC<ButtonProps> = ({ colour, text, togglePlayers } ) => {
	return (
		<button 
			onClick={() => togglePlayers && togglePlayers()}
			className={`bg-${colour} shadow-lg rounded-lg p-1 pl-3 pr-3 transform hover:scale-110`}>
			{text}
		</button>
	)
}
// Need to fix this, it needs to link to the tournament bracket page which will generate the bracket based on the players array
//  passed though as a state.
const StartTournament = ({ startTournament }: { startTournament: boolean }) => {
	if (!startTournament)
		return ;
	return (
		<div className="text-6xl px-9 p-10">
			<Link
					to="/play/tournament-bracket"
					// state={data}
					className="w-full h-full flex items-center justify-center backdrop-brightness-50 rounded-lg"
					>
				<button className="bg-amber-100 shadow-lg rounded-lg p-10 px-10 transform hover:scale-110">
					Start Tournament
				</button>
				</Link>
			
		</div>
	);
}


const PlayersCard = ({players}: {players: PlayerProps[]}) => {
	return (
		<div className="w-full max-w-md bg-beige-500 rounded-lg shadow-lg p-1 text-2xl pt-4 pb-4">
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


const FilterCard: React.FC<TournamentCardProps> = ({ data, players, togglePlayers, c_id }) => {
	if (data.length === 0)
		return <p className="w-full max-w-md bg-beige-500 rounded-lg shadow-lg p-1 text-2xl pt-4 pb-4">No players found</p>
	return (
		<div className="w-full max-w-md bg-beige-500 rounded-lg shadow-lg p-1 text-2xl pt-4 pb-4">
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
					return <List 
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


const PlayerFilter: React.FC<FilterProps> = ({ filter, handleFilter }) => {
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


const TournamentSetUp: React.FC = () => {
	const users = useAllUsers();
	const location = useLocation();
	const { tournamentType, userId, username } = location.state as { tournamentType: number, userId: number, username: string };
	const [filteredUsers, setFilteredUsers] = useState<UserProps[]>([]);
	const [players, setPlayers] = useState<PlayerProps[]>([{ username, id: userId }]); //Adds the current user immediately to the players
	const [filter, setFilter] = useState<string>('');
	

	useEffect(() => {
		console.log("Updated players:", players);
	}, [players]);
	
	
	useEffect(() => {
		const filtered = users.filter(user => {
			return user.username.toLowerCase().includes(filter.toLowerCase())
		})
		setFilteredUsers(filtered);
	}, [filter, users])


	const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		console.log(e.target.value);
		setFilter(e.target.value);
	}

	const togglePlayers = (id: number) => 
	{
		setPlayers(prevPlayers => {
		const isAdded = prevPlayers.some(player => player.id === id);
		if (isAdded) {
			return prevPlayers.filter(player => player.id !== id);
		} else {
			const user = users.find(user => user.id === id);
			if (user && prevPlayers.length < tournamentType) {
				return [...prevPlayers, user];
			}
			return prevPlayers;
			}
		});
	};
	return (
		<div>
			<TitleCard image={"/images/opponents.webp"}/>
			<PlayerFilter filter={filter} handleFilter={handleFilter}/>
			<div className="flex justify-center px-10 gap-20">
				<FilterCard 
					data={filteredUsers} 
					players={players} 
					togglePlayers={togglePlayers}
					c_id={userId}
					/>
				<PlayersCard players={players}/>
			</div>
			<StartTournament startTournament={players.length === tournamentType ? true : false}/>
		</div>
	)
}

export default TournamentSetUp