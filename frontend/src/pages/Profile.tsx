import React, { useState, useEffect } from "react";
import Wins from "../components/Wins";
import Losses from "../components/Losses";
import axios from "axios";


const Profile = () => {
	const userId = 123
	const [victories, setVictories] = useState(0)
	const [losses, setLoses] = useState(0)

	useEffect (() => {
		const getUserData = async () => {
			try {
				// const gameData = await axios.get('/api/user/userId/user_stats')
				// setVictories(gameData.data.wins) //these are the actual ones for the program testing purposes commented out
				// setLoses(gameData.data.losses)
				setVictories(5)
				setLoses(2)
			} catch (error) {
				console.error('error getting data:', error)
			}
		}
		getUserData()
	}, [userId])



	return (
		<div >
        	<h1 className="font-bold text-2xl text-white">My Stats</h1>
				<ul>
				<li>
					<Wins victories={victories}/>
					<Losses losses={losses}/>
				</li>
				</ul>
        </div>
    )
}

export default Profile