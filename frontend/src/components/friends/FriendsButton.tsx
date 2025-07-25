import { deleteFriend } from "../../hooks/deleteFriend"
import { useState } from "react";
import { AxiosError } from "axios";
import FriendItem from "./FriendItem";

type Friends = {
    id: number,
    username: string,
    picture: string | null,
    status: boolean
}

type Id = {
    userId: number;
	friendsList: Friends[] | null;
	onSuccess: () => void;
};

const FriendsButton = ({userId, friendsList, onSuccess} : Id) => {
    const [open, setOpen] = useState(false);
    
	const toggleOpen = () => {
		setOpen(prev => !prev);
		onSuccess();
	}

	const handleDelete = async (friendName: string) => {
		try {
			await deleteFriend(userId, friendName);
			onSuccess();
		} catch (err) {
			const error = err as AxiosError;
		  	console.error('Failed to delete friend', error);
		}
	  };
    return (
        <div className="flex flex-col rounded border border-amber-200 text-center text-xl">
        <button title='Friends List' 
		className={`flex justify-center p-6
				transition-all duration-200 ease-in-out hover:bg-amber-200 hover:text-gray-900
          		${open ? 'min-w-50' : 'w-auto'}`} onClick={toggleOpen}>
                Friends
        </button>
		{open && (
        	<div className="max-h-60 overflow-y-auto">
				{friendsList && friendsList.length > 0 ? 
				(friendsList?.map(f => (
				<FriendItem key={f.id} friend={f} onDelete={() => handleDelete(f.username)} />))
			): <p className="p-4">You have no friends :(</p>}
        	</div>
     	 )}
    </div>
    );
};

export default FriendsButton;