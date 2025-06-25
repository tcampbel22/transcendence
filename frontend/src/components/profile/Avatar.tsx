import React, { useEffect, useState } from "react";
import api from "../../lib/api";
import { AxiosError } from "axios";
import  axios  from	"axios"
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import DeleteProfile from "./DeleteUser";

type AvatarInfo = {
	userId: number;
	is2faEnabled: boolean;
};

const Avatar = ({userId, is2faEnabled}: AvatarInfo) => {
	const API_URL = import.meta.env.VITE_API_USER;
	const BASE_URL = import.meta.env.VITE_BASE_USER_URL || '';
	const [editIsOpen, setEditOpen] = useState(false);
	const [passwordIsOpen, setPasswordOpen] = useState(false);
	const [deleteIsOpen, setDeleteOpen] = useState(false);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [refreshUser, setRefreshUser] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>(`${BASE_URL}/uploads/default.png`);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [enabled, setEnabled] = useState(is2faEnabled);
	//need to add actual values to the userId.

	useEffect(() => {
    setEnabled(is2faEnabled);
	}, [is2faEnabled]);

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const response = await api.get(`${API_URL}/${userId}`, { withCredentials: true });
				setUsername(response.data.username);
				setEmail(response.data.email);
				if (response.data.picture) {
					setImageUrl(`${BASE_URL}${response.data.picture}?${Date.now()}`);
				  } else {
					setImageUrl(`${BASE_URL}/uploads/default.png`);
				  }
			} 
			catch (err) {
				const error = err as AxiosError;
				console.error("Error:", error.message);
			}
		};
		fetchUserInfo()
	}, [userId, refreshUser]);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setImageFile(file); //stores the file in to the state
			setImageUrl(URL.createObjectURL(file)); // Instant preview
		}
	};

	const set2FA = async () => {
		if (enabled)
		{	
			const response = await api.put(`${API_URL}/${userId}/2fa`, { is2faEnabled: false });
			setEnabled(false);
		}
		else
		{
			const response = await api.put(`${API_URL}/${userId}/2fa`, { is2faEnabled: true });
			setEnabled(true);
		}
	}

	const uploadProfileImage = async () => {
		if (!imageFile) return;
		
		const formData = new FormData();
		formData.append("file", imageFile);
		
		try {
			const headers = { "Content-Type": "multipart/form-data" };
			const response = await api.put(`${API_URL}/${userId}/picture`, formData, { headers });
			setImageUrl(`${BASE_URL}${response.data.newPicture}?${Date.now()}`);
			setImageFile(null);
			setRefreshUser(prev => !prev); // Trigger refresh to get latest data
		} catch (error: any) {
			console.error("Image upload failed:", error.response?.data || error.message);
		}
	};	

	//image change logic, change password logic and account deletion needs to be added.
	return (
        <div className="bg-beige border border-white items-center flex flex-col h-screen min-h-[1000px] max-h-[1211px] py-8 shadow-md text-black rounded overflow-auto">
			<h1 className="font-bold text-4xl m-4 ">{username}</h1>
			<div className="relative w-auto h-auto flex flex-col items-center">
				<div className="bg-white w-auto h-auto rounded-full border-4 border-black flex shadow-md flex-col items-center justify-center bg-cover bg-center">
					<img 
						src={imageUrl} 
						alt="Profile Picture"
						onError={() => setImageUrl(`${BASE_URL}/uploads/default.png`)} 
						className="w-80 h-80 rounded-full object-cover"
					/>
				</div>
				<button
					onClick={() => document.getElementById("imageInput")?.click()}
					className="absolute bottom-4 right-4 bg-beige text-black p-2 rounded-full shadow-md hover:bg-black border-2 border-white w-10 h-10 items-center"
					title="Change profile picture"
				>
					✏️
				</button>
				<input 
					id="imageInput" 
					type="file" 
					accept="image/*" 
					className="hidden" 
					onChange={handleImageChange} 
				/>
				{imageFile && (
					<button 
						onClick={uploadProfileImage} 
						className="mt-2 px-3 py-1 bg-gradient-to-r from-amber-200 to-amber-500 border-2 border-black text-black rounded hover:from-black hover:to-black hover:text-beige">
						Upload
					</button>
				)}
			</div>
			<br />
			<br />
			<div className="font-bold text-2xl m-4">
				<p className="">email: {email}</p>
			</div>
			<div className="flex flex-col items-center w-full px-4 max-w-xs mx-auto space-y-8 mt-24">
				<button
					onClick={() => setEditOpen(true)}
					className="bg-gradient-to-r from-amber-300 to-amber-500 w-full py-3 text-lg border border-black rounded hover:from-black hover:to-black hover:text-white shadow-md transition"
				>
					edit profile
				</button>
				<button
					onClick={() => setPasswordOpen(true)}
					className="bg-gradient-to-r from-amber-300 to-amber-500 w-full py-3 text-lg border border-black rounded hover:from-black hover:to-black hover:text-white shadow-md transition"
				>
					change password
				</button>
				<button
					onClick={() => set2FA()}
					className="bg-gradient-to-r from-amber-300 to-amber-500 w-full py-3 text-lg border border-black rounded hover:from-black hover:to-black hover:text-white shadow-md transition"
				>
					{enabled ? 'disable 2FA' : 'enable 2FA'}
				</button>
				<button
					onClick={() => setDeleteOpen(true)}
					className="bg-gradient-to-r from-red-400 to-red-600 w-full py-3 text-lg shadow-md border border-black text-black rounded hover:from-red-600 hover:to-red-700 hover:text-beige transition"
				>
					delete user
				</button>
			</div>
			{editIsOpen && <EditProfile onClose={() => setEditOpen(false)} userId={userId} onSave={() => setRefreshUser(prev => !prev)}/>}
			{passwordIsOpen && <ChangePassword onClose={() => setPasswordOpen(false)} userId={userId} onSave={() => setRefreshUser(prev => !prev)}/>}
			{deleteIsOpen && <DeleteProfile onClose={() => setDeleteOpen(false)} userId={userId}/> }
        </div>
    )
}

export default Avatar;