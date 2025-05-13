import axios, { AxiosError } from "axios";
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
            const res = await axios.post(`${API_URL}/${userId}/friends`, payload, {withCredentials: true});
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
        <div className="relative z-50 inline-block px-3">
            <button title="Add Friend" className={`transition-all duration-200 ease-in-out 
          ${'w-12 rounded bg-beige'} 
             bg-beige text-white py-2 shadow text-2xl flex items-center justify-center`} 
            onClick={handleClick}
            >
                🗣️
            </button>
                {open && (
                    <div className="absolute top-full mt-2 right-0 w-64 bg-beige border border-black rounded shadow p-2">
                        <p>Add Friend</p>
                        <input  className="border-black border rounded px-2"
                                type="text" 
                                placeholder="Enter Username"
                                onChange={(e) => setFriendsName(e.target.value)}
                        />
                        <button onClick={handleAddFriend}
                                className="border border-black px-1 rounded m-1 hover:bg-black hover:text-beige"
                        >
                            Add Friend
                        </button>
                        {message && (
                            <p className={`mt-2 text-sm ${isError ? "text-red-600" : "text-green-600"}`}>
                                {message}
                            </p>
                        )}
                    </div>
                )}
    </div>
    )
};

export default AddFriendButton;