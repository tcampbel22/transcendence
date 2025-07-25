import React, { useEffect, useState } from "react";
import { useFriendslist } from "../../hooks/useFriendsList";
import { PlayerProps } from "../../types/types";

type Friends = {
    id: number,
    username: string,
    picture: string | null,
    status: boolean
}

type GameControlProps = {
    userId: number;
    resetGame: () => void;
    setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
	setOpponent: React.Dispatch<React.SetStateAction<PlayerProps | undefined>>;
}


const GameControls = ({userId, resetGame, setIsGameStarted, setOpponent}: GameControlProps) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Friends | null>(null);
    const {friendsList, reFetch}= useFriendslist(userId) || [];

    const handleClick = () => {
		setIsGameStarted(true);
        resetGame();
    }

    return (
        <div className="flex items-center">
             <div className=" p-6 rounded text-center text-xl">
                <div className="flex flex-col justify-center min-w-90 gap-6">
                    <button onClick={() => setOpen(!open)} className="border-1 border-amber-200 rounded px-3 py-4 hover:bg-amber-200 hover:text-gray-900">
                    {selected ? selected.username : "Select Opponent"} ▾
                    </button>
                    {open && (
                    <div className=" border-1 border-amber-200 rounded overflow-y-auto">
                        {friendsList && friendsList?.map((friend, idx) => (
                        <div
                            key={idx}
                            onClick={() => {
                            setSelected(friend);
							setOpponent({ username: friend.username, id: friend.id })
                            setOpen(false);
                            }}
                            className="px-2 py-1 cursor-pointer hover:bg-amber-200 hover:text-gray-900"
                        >
                            {friend.username}
                        </div>
                        ))}
                    </div>
                    )}
                    <button 
						onClick={handleClick} 
						disabled={!selected} 
						className={`border-1 border-amber-200 rounded px-3 py-4 hover:bg-amber-200 hover:text-gray-900 ${selected ? '' : 'cursor-not-allowed'}` }>
							Start Game
						</button>
                </div>
        </div>
    </div>
    )
}

export default GameControls;