import axios, { AxiosError } from "axios";
import api from "../../lib/api";
import { useState } from "react";



type Id = {
    userId: number;
	onSuccess: () => void;
};

const AddFriendButton = ({userId, onSuccess} : Id) => {
    const API_URL = import.meta.env.VITE_API_USER;
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [friendsName, setFriendsName] = useState('');
    const [isError, setIsError] = useState(false);

    const handleClick = () => {
        setOpen(prev => !prev);
        setMessage('');
        setIsError(false);
    }

    const handleAddFriend = async () => {
        try {
            const payload = {
                friendUsername: friendsName,
            }
            const res = await api.post(`${API_URL}/${userId}/friends`, payload, {withCredentials: true});
            setMessage("Friend added successfully!");
			onSuccess();
            setIsError(false);
        } catch (err) {
            const error = err as AxiosError
            setMessage("Failed to add friend.");
            setIsError(true);
        }
    }

    return (
        <div className="flex flex-col rounded border border-amber-200 text-center text-xl">
            <button 
				title="Add Friend" 
				className="flex flex-col justify-center transition-all duration-200 ease-in-out p-6 hover:bg-amber-200 hover:text-gray-900" 
            	onClick={handleClick}
            >
                Add Friend
            </button>
                {open && (
                    <div className="flex flex-col items-center text-center  my-2 rounded p-4 m-2">
                        <input  className="border-amber-200 text-amber-100 border rounded px-2 my-2"
                                type="text" 
                                placeholder="Enter Username..."
                                onChange={(e) => setFriendsName(e.target.value)}
                        />
                        <button onClick={handleAddFriend}
                                className="border border-amber-200 px-2 rounded my-2 hover:bg-amber-200 hover:text-gray-900"
                        >
                            Add
                        </button>
                        {message && (
                            <p className={`mt-2 text-sm font-bold ${isError ? "text-red-400" : "text-green-400"}`}>
                                {message}
                            </p>
                        )}
                    </div>
                )}
    </div>
    )
};

export default AddFriendButton;