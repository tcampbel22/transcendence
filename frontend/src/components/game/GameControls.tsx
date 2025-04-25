import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";

type Friends = {
    id: number,
    username: string,
    picture: string | null,
    status: "online" | "offline"
}

type GameControlProps = {
    userId: number;
    resetGame: () => void;
    setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
    setOpponentUserId: React.Dispatch<React.SetStateAction<number>>
}


const GameControls = ({userId, resetGame, setIsGameStarted, setOpponentUserId}: GameControlProps) => {
    const API_URL = import.meta.env.VITE_API_USER;
    const [opponent, setOpponent] = useState<'Friend' | null>(null);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Friends | null>(null);
    const [friendsList, setFriendsList] = useState<Friends[] | null>(null);

    useEffect (() => {
        const getFriendsList = async () => {
            try {
                // MOCK DATA
                const mockFriends: Friends[] = [
                    { id: 1, username: "kissa", picture: null, status: "online" },
                    { id: 2, username: "piisami", picture: null, status: "online" },
                    { id: 2, username: "koira", picture: null, status: "online" },
                ];
                // const res = await axios.get(`${API_DEV}/api/${userId}/friends`); //get friends list
                // setFriendsList(res.data); //set it for usage in the dropdown list
                setFriendsList(mockFriends);

            } catch (err) {
				const error = err as AxiosError;
                console.error("Error fetching friends:", error);
                setFriendsList([]);
            }
        }
        getFriendsList();
    }, [userId]);
	
    const handleClick = () => {
		setIsGameStarted(true);
        resetGame();
		console.log(selected);
    }

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
             <div className="bg-beige p-6 rounded-lg text-center">
                <div className="relative w-48">
                    <button onClick={() => setOpen(!open)} className="border-2 border-black rounded px-2 py-1 w-full">
                    {selected ? selected.username : "Select Opponent"} ▾
                    </button>
                    {open && (
                    <div className="absolute top-full left-0 w-full border-2 border-black rounded bg-white max-h-40 overflow-y-auto z-10">
                        {friendsList && friendsList.map((friend, idx) => (
                        <div
                            key={idx}
                            onClick={() => {
                            setSelected(friend);
                            setOpponentUserId(friend.id);
                            setOpen(false);
                            }}
                            className="px-2 py-1 cursor-pointer hover:bg-gray-200"
                        >
                            {friend.username}
                        </div>
                        ))}
                    </div>
                    )}
                    <button onClick={handleClick} disabled={!selected} className={`border-2 border-black rounded m-2 px-2 hover:bg-black hover:text-beige ${selected ? '' : 'cursor-not-allowed'}` }>Start Game</button>
                </div>
        </div>
    </div>
    )
}

export default GameControls;