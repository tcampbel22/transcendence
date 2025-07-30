import React, { useState, useEffect } from "react";
import { TitleCard } from "../utils/TitleCard";
import { useLocation } from "react-router-dom";
import { UserProps, PlayerProps } from "../../types/types";
import  useAllUsers  from '../../hooks/useAllUsers'
import { PlayerFilter, FilterCard, PlayersCard, StartTournament } from "./TournamentUtils"


const TournamentSetUp: React.FC = () => {
	const users = useAllUsers();
	const location = useLocation();
	const { tournamentType, userId, username } = location.state as { tournamentType: number, userId: number, username: string };
	const [filteredUsers, setFilteredUsers] = useState<UserProps[]>([]);
	const [players, setPlayers] = useState<PlayerProps[]>([{ username, id: userId }]); //Adds the current user immediately to the players
	const [filter, setFilter] = useState<string>('');


	useEffect(() => {
	}, [players]);

	useEffect(() => {
		const filtered = users.filter(user => {
			return user.username.toLowerCase().includes(filter.toLowerCase())
		})
		setFilteredUsers(filtered);
	}, [filter, users])


	const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
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
		<div className="flex flex-col items-center w-full h-full">
			<TitleCard link={true} />
			<PlayerFilter filter={filter} handleFilter={handleFilter}/>
			<div className="flex justify-center min-w-4xl  gap-5 my-10 overflow-y-scroll">
				<FilterCard
					data={filteredUsers}
					players={players}
					togglePlayers={togglePlayers}
					c_id={userId}
					/>
				<PlayersCard players={players}/>
			</div>
			{players.length === tournamentType && 
				<StartTournament  players={players} setPlayers={setPlayers}/>
			}
				</div>
	)
}

export default TournamentSetUp
