import React, { useState, useEffect } from "react";
import Wins from "../components/Wins";
import Losses from "../components/Losses";
import axios from "axios";
import ProfileBlock from "../components/ProfileBlock";
import Avatar from "../components/Avatar";


const Profile = () => {
	const userId = 123
	const [victories, setVictories] = useState(0)
	const [losses, setLoses] = useState(0)

	useEffect (() => {
		const getUserData = async () => {
			try {
				// const gameData = await axios.get('/api/user/userId/user_stats')
				// setVictories(gameData.data.wins) //these are the actual ones for the game testing purposes commented out
				// setLoses(gameData.data.losses)
				setVictories(5)
				setLoses(2)
			} catch (error) {
				console.error('error getting data:', error)
			}
		}
		getUserData()
	}, [userId])


	//avatar component for the profile picture, not sure if this is the place to extract user info and send it to the component or just user id there
	return (
	<div className="max-w-screen-sm mx-auto p-4">
      	<h1 className="font-bold text-2xl text-white mb-4">My Stats</h1>
		<div className="grid grid-cols-2 gap-4">
			<ProfileBlock title="Avatar">
				<Avatar  />
			</ProfileBlock>

			{/* <ProfileBlock title="Games Played">
				<GamesPlayed total={gamesPlayed} />
			</ProfileBlock> */}

			<ProfileBlock title="Wins">
				<Wins victories={victories} />
			</ProfileBlock>

			<ProfileBlock title="Losses">
				<Losses losses={losses} />
			</ProfileBlock>
		</div>
	</div>
    )
}

export default Profile