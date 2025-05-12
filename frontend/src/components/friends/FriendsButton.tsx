import { useFriendslist } from "../../hooks/useFriendsList";
import { deleteFriend } from "../../hooks/deleteFriend"
import { useState } from "react";
import { AxiosError } from "axios";
import FriendItem from "./FriendItem";

type Id = {
    userId: number;
};

const FriendsButton = ({userId} : Id) => {
    const { friendsList, reFetch } = useFriendslist(userId);
    const [open, setOpen] = useState(false);
    
	const toggleOpen = () => {
		setOpen(prev => !prev);

	}

	const handleDelete = async (friendName: string) => {
		try {
			await deleteFriend(userId, friendName);
			await reFetch();
		} catch (err) {
			const error = err as AxiosError;
		  	console.error('Failed to delete friend', error);
		}
	  };

    return (
        <div className="relative z-50 inline-block">
        <button title='Friends List' className={`transition-all duration-200 ease-in-out 
          ${open ? 'w-64 rounded-t bg-beige' : 'w-12 rounded bg-beige'}
          bg-beige text-white py-2 shadow text-2xl flex items-center justify-center`} onClick={toggleOpen}>
                🫂
        </button>
		{open && (
        	<div className="absolute top-full left-0 w-64 bg-beige rounded-b shadow max-h-60 overflow-y-auto">
				{friendsList?.map(f => (
				<FriendItem key={f.id} friend={f} onDelete={() => handleDelete(f.username)} />))}
        	</div>
     	 )}
    </div>
    );
};

export default FriendsButton;