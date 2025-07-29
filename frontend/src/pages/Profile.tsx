import React, { useState, useEffect } from "react";
import { WinsLosses } from "../components/profile/WinsLosses";
import api from "../lib/api";
import Avatar from "../components/profile/Avatar";
import GamesPlayed from "../components/profile/GamesPlayed";
import {userIdFromState} from "../hooks/userIdFromState"


const Profile = () => {
	const userId = userIdFromState() as number;
	const [is2faEnabled, setIs2faEnabled] = useState (false);
	const API_URL = import.meta.env.VITE_API_USER;
	const [victories, setVictories] = useState(0);
	const [losses, setLoses] = useState(0);
	const [gamesPlayed, setGames] = useState(0);

	useEffect (() => {
		const getUserData = async () => {
			try {
				const userData = await api.get(`${API_URL}/${userId}`, { withCredentials: true });
				setIs2faEnabled(userData.data.is2faEnabled);
				const gameData = await api.get(`${API_URL}/${userId}/stats`, { withCredentials: true });
				setVictories(gameData.data.wins) //these are the actual ones for the game testing purposes commented out
				setLoses(gameData.data.losses)
				setGames(gameData.data.wins + gameData.data.losses)
			} catch (error) {
				console.error('error getting data:', error)
			}
		}
		getUserData()
	}, [userId])

	//avatar component for the profile picture, not sure if this is the place to extract user info and send it to the component or just user id there
	return (
			<div className="grid grid-cols-4 grid-rows-3 gap-4 p-4 h-full overflow-x-auto">
				<div className="col-span-1 row-span-3 " style={{ gridTemplateRows: "1fr 2fr 2fr" }}>
					<Avatar userId={userId} is2faEnabled={is2faEnabled} />
				</div>

				<div className="col-span-1 row-span-1">
					<WinsLosses value={victories} text="Wins" percent={false}/>
				</div>

				<div className="col-span-1 row-span-1">
					<WinsLosses value={losses} text="Losses" percent={false}/>
				</div>
				
				<div className="col-span-1 row-span-1">
					<WinsLosses value={Number.isNaN(victories / gamesPlayed) ? 0 : victories / gamesPlayed * 100 } text="Win Percentage" percent={true}/>
				</div>


				<div className="col-span-3 row-span-2">
					<GamesPlayed userId={userId} />
				</div>
			</div>
	)
}

export default Profile