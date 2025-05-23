import React, { useState, useEffect } from "react";
import { TitleCard } from "../utils/TitleCard";
import { useLocation } from "react-router-dom";
import { UserProps } from "../../types/types";
import  useAllUsers  from '../../hooks/useAllUsers'

type FilterProps = {
	filter: string,
	handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void
}

type CardProps = {
	data: UserProps[],
}

type ListProps = {
	name: string
}

type PlayerProps = {
	username: string,
	id: number,
	added: boolean
}

const List: React.FC<ListProps> = ({name}) => {
	return ( <p>{name}</p>)
}

const FilterCard: React.FC<CardProps> = ({data}) => {
	if (data.length === 0)
		return <p className="w-full max-w-md bg-amber-600 rounded-lg shadow-lg p-1">No players found</p>
	return (
		<div className="w-full max-w-md bg-amber-600 rounded-lg shadow-lg p-1">
			<ul className="space-y-2">
				{data.map(u => {
					return <List name={u.username}/>
				})}
			</ul>
		</div>
	)
}



const PlayerFilter: React.FC<FilterProps> = ({filter, handleFilter}) => {
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
	const [filteredUsers, setFilteredUsers] = useState<UserProps[]>([]);
	const [players, setPlayers] = useState<PlayerProps[]>([]);
	const [filter, setFilter] = useState<string>('');
	
	const location = useLocation();
	const { tournamentType } = location.state as { tournamentType: number };

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
// Need to add add player buttons to each user, then oonce they're added remove the button from that player
	const addPlayers = (player: UserProps) => {
		if (players.length === tournamentType)
			return 
		const newPlayer: PlayerProps = player;
		newPlayer.added = true;
		setPlayers(players.concat(newPlayer));
	} 
	return (
		<div>
			<TitleCard image={"/images/tournament-welcome.webp"}/>
			<PlayerFilter filter={filter} handleFilter={handleFilter}/>
			<div className="flex justify-center px-4">
				<FilterCard data={filteredUsers}/>
			</div>

		</div>
	)
}

export default TournamentSetUp