import { useFriendslist } from "../../hooks/useFriendsList";
import { useState } from "react";

type Id = {
    userId: number;
};

const FriendsButton = ({userId} : Id) => {
    const friendsList = useFriendslist(userId);
    const [open, setOpen] = useState(false);
    
    return (
        <div className="relative z-50 inline-block">
        <button title='Friends List' className={`transition-all duration-200 ease-in-out 
          ${open ? 'w-64 rounded-t bg-beige-200' : 'w-12 rounded bg-beige'}
          bg-beige-200 text-white py-2 shadow text-2xl flex items-center justify-center`} onClick={() => setOpen(!open)}>
                🫂
        </button>
        {open && ( 
            <div className="absolute top-full left-0 w-64 bg-beige-200 border-t-0 border rounded-b shadow max-h-60 overflow-y-auto">
                {friendsList && friendsList.map((friend, idx) => (
                    <div key={idx} className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-200">
                        <span>{friend.username}</span>
                        <span className={`w-2 h-2 rounded-full ${
                            friend.status === 'online' ? 'bg-green-500' : 'bg-red-400'}`}
                        title={friend.status}
                        />
                    </div>
                ))}
            </div>
            )}
    </div>
    );
};

export default FriendsButton;