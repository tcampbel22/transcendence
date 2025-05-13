import { useState, useRef } from 'react';
import  {useUsername} from '../../hooks/useUsername'
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import { AxiosError } from 'axios';


type userObj = {
    userId: number;
    username: string;
};

type EndGameProps = {
    gameId: number | null,
    user: userObj,
    opponentUserId: number,
    winner: string | null ,
    p1score: number,
    p2score: number
};

const GameEnd = ({user, opponentUserId, winner, p1score, p2score, gameId} : EndGameProps) => {
    const navigate = useNavigate();
    const {userId, username } = user;
    const API_URL = import.meta.env.VITE_API_GAME;
    const { username: p2Username } = useUsername(opponentUserId);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const submittedOnce = useRef(false);
   


    const postWinner = async () => {
        if (!gameId || isSubmitting || submittedOnce.current) {
            console.log("Submission skipped - game not ready or already submitted");
            return;
        }
        setIsSubmitting(true);
        submittedOnce.current = true;

        const payload = {
            gameId: gameId,
            p1score: p1score,
            p2score: p2score,
            winnerId: winner === 'left' ? userId : opponentUserId
        }

        try {
            const res = await api.patch(`${API_URL}/${gameId}/finish-game`, payload);
            console.log("match finished", res.data);
            navigate('/hub', {state:user});
        } catch (err) {
            const error = err as AxiosError;
            console.log("unable to save match result", error);
            navigate('/hub', {state:user});
        };
    }
    
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-beige p-6 rounded-lg text-center">
                <h1 className="font-bold text-2xl mb-4">Match Result</h1>

                <div className="flex flex-row justify-between items-center gap-8">
                {/* Player 1 */}
                <div className="flex flex-col items-center">
                    {winner === 'left' && <p className="font-semibold text-lg text-green-500">Winner</p>}
                    <p className=   {`font-semibold text-lg ${winner === 'left' ? 'text-green-500' : 'text-red-600'}`}>
                                    {winner === 'left' ? 'Winner' : 'Loser'}
                    </p>
                    <p className="text-sm text-gray-600 font-bold">{username}</p>
                </div>

                {/* Score */}
                <div className="flex flex-col items-center">
                    <p className="text-3xl font-bold">{p1score} : {p2score}</p>
                </div>

                {/* Player 2 */}
                <div className="flex flex-col items-center">
                    <p className=   {`font-semibold text-lg ${winner === 'right' ? 'text-green-500' : 'text-red-600'}`}>
                                    {winner === 'right' ? 'Winner' : 'Loser'}
                    </p>
                    <p className="text-sm text-gray-600 font-bold">{p2Username}</p>
                </div>
         </div>
         <button onClick={postWinner} disabled={!gameId || isSubmitting} className='border-2 border-black rounded px-1 m-2 hover:bg-black hover:text-beige shadow-sm'>submit</button>
    </div>
</div>
    )
}

export default GameEnd;
