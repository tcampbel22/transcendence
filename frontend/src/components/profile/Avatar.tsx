import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import EditProfile from "./EditProfile";

type AvatarInfo = {
	userId: number;
};

const Avatar = ({userId}: AvatarInfo) => {
	// const API_URL = "https://localhost:4433";
	const API_DEV_URL = "http://localhost:3002";
	const [isOpen, setOpen] = useState(false);
	const [username, setUsername] = useState('Timothy');
	const [email, setEmail] = useState('Timothy@gmail.com');
	const [refreshUser, setRefreshUser] = useState(false);
	//need to add actual values to the userId.

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				// const response = await axios.get(`${API_URL}/api/users/${userId}`);
				const response = await axios.get(`${API_DEV_URL}/api/users/${userId}`);
				setUsername(response.data.username);
				setEmail(response.data.email)
			} 
			catch (err) {
				const error = err as AxiosError;
				console.log("HERE")
				console.error("Error:", error.message);
			}
		};
		fetchUserInfo()
	}, [userId, refreshUser]);

	//image change logic, change password logic and account deletion needs to be added.
	return (
        <div	className="bg-beige border border-white col-span-1 row-span-2 items-center flex flex-col h-screen py-8 shadow-md text-black rounded">
			<h1 className=" font-bold text-2xl m-4 ">{username}</h1>
			<div className="relative w-80 h-80">
			<div	className="bg-white w-80 h-80 rounded-full border-4  border-black flex shadow-md flex-col items-center justify-center bg-cover bg-center"
					style={{
						backgroundImage: 'url(images/profile_tmp.png)'
					}}
			>
			</div>
				<button
						onClick={() => console.log('change profile pic')}
					className="absolute bottom-4 right-4 bg-beige text-black p-2 rounded-full shadow-md hover:bg-black border-2 border-white w-10 h-10 items-center"
					title="Change profile picture"
				>
					✏️
				</button>
			</div>
			<br />
			<br />
			<div className="">
				<p className="">email:</p>
				<p>{email}</p>
			</div>
			<button onClick={() => setOpen(true)} className="border border-black rounded p-1 hover:bg-black hover:text-white mt-auto shadow-md">
				edit profile
			</button>
			<button className="border border-black rounded p-1 hover:bg-black hover:text-white mt-3 shadow-md">
				change password
			</button>
			<button className="shadow-md bg-beige border border-black text-black rounded p-1 hover:bg-red-500 hover:text-beige mt-auto">
				commit seppuku
			</button>
			{isOpen && <EditProfile onClose={() => setOpen(false)} userId={12} onSave={() => setRefreshUser(prev => !prev)}/>}
        </div>
    )
}

export default Avatar;