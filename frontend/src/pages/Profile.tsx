import React, { useState, useEffect } from "react";
import Wins from "../components/profile/Wins";
import Losses from "../components/profile/Losses";
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

	useEffect (() => {
		const getUserData = async () => {
			try {
				const userData = await api.get(`${API_URL}/${userId}`, { withCredentials: true });
				setIs2faEnabled(userData.data.is2faEnabled);
				const gameData = await api.get(`${API_URL}/${userId}/stats`, { withCredentials: true });
				setVictories(gameData.data.wins) //these are the actual ones for the game testing purposes commented out
				setLoses(gameData.data.losses)
				//setIs2faEnabled(gameData.data.is2faEnabled);
			} catch (error) {
				console.error('error getting data:', error)
			}
		}
		getUserData()
	}, [userId])


	//avatar component for the profile picture, not sure if this is the place to extract user info and send it to the component or just user id there
	return (
		<div className="grid grid-cols-3 gap-4 p-6">
			<Avatar userId={userId} is2faEnabled={is2faEnabled} />
			<GamesPlayed userId={userId}/>
			<Wins victories={victories} />
			<Losses losses={losses} />
		</div>
	)
}

export default Profile