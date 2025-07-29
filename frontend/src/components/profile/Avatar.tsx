import React, { useEffect, useState } from "react";
import api from "../../lib/api";
import { AxiosError } from "axios";
import  axios  from	"axios"
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import DeleteProfile from "./DeleteUser";
import { ProfileButton } from "./ProfileButton";
import { ProfilePopUp } from "./ProfilePopUp";

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
			catch (err: any) {
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

	const set2FA = async (enabled: boolean) => {
		const response = await api.put(`${API_URL}/${userId}/2fa`, { is2faEnabled: enabled ? false : true });
		setEnabled(enabled ? false: true)
		
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

	return (
        <div className="border flex flex-col items-center justify-between h-full w-full rounded py-4 overflow-y-scroll">
			<h1 className="font-bold text-2xl lg:text-4xl">{username}</h1>
			<div className="relative w-auto h-auto flex flex-col items-center m-8">
				<div className="w-auto h-auto rounded-full border-4 border-amber-200 flex flex-col items-center justify-between">
					<img 
						src={imageUrl} 
						alt="Profile Picture"
						onError={() => setImageUrl(`${BASE_URL}/uploads/default.png`)} 
						className="w-auto h-auto rounded-full object-cover"
					/>
				</div>
				<button
					onClick={() => document.getElementById("imageInput")?.click()}
					className="absolute bottom-4 right-4 p-2 rounded-full hover:bg-amber-200 hover:text-gray-900 border-2 border-amber-200 w-10 h-10 items-center"
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
						className="mt-2 px-3 py-1 border-2 border-amber-200 rounded hover:bg-amber-200 hover:text-gray-900">
						Upload
					</button>
				)}
			</div>
			<div className="font-bold text-lg lg:text-2xl m-4">
				<p className="text-center">email: {email}</p>
			</div>
			<div className="flex flex-col items-center w-full max-w-xs space-y-8 ">
				<ProfileButton text="edit username" setValue={() => setEditOpen(true)} />
				<ProfileButton text="edit password" setValue={() => setPasswordOpen(true)} />
				<ProfileButton text={enabled ? 'disable 2FA' : 'enable 2FA'} setValue={() => set2FA(enabled)} />
				<ProfileButton text="delete account" setValue={() => setDeleteOpen(true)} />
			</div>
			{editIsOpen && <ProfilePopUp endpoint="" onClose={() => setEditOpen(false)} userId={userId} onSave={() => setRefreshUser(prev => !prev)} valueName="username"/>}
			{passwordIsOpen && <ProfilePopUp endpoint="/reset-password" onClose={() =>  setPasswordOpen(false)} userId={userId} onSave={() => setRefreshUser(prev => !prev)} valueName="password"/>}
			{deleteIsOpen && <DeleteProfile onClose={() => setDeleteOpen(false)} userId={userId}/> }
        </div>
    )
}

export default Avatar