import { useState, useRef } from 'react';
import  {useUsername} from '../../hooks/useUsername'
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import { AxiosError } from 'axios';
import { PlayerProps } from '../../types/types';

type EndGameProps = {
    gameId: number | null,
    user: PlayerProps,
    opponentUserId: number,
    winner: string | null ,
    p1score: number,
    p2score: number
};

const GameEnd = ({user, opponentUserId, winner, p1score, p2score, gameId} : EndGameProps) => {
    const navigate = useNavigate();
    const {id, username } = user;
    const API_URL = import.meta.env.VITE_API_GAME;
    const { username: p2Username } = useUsername(opponentUserId);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const submittedOnce = useRef(false);
   

	console.log(opponentUserId, id)
    const postWinner = async () => {
        if (!gameId || isSubmitting || submittedOnce.current) {
            return;
        }
        setIsSubmitting(true);
        submittedOnce.current = true;

        const payload = {
            gameId: gameId,
            p1score: p1score,
            p2score: p2score,
            winnerId: winner === 'left' ? id : opponentUserId,
        }
        try {
            const res = await api.patch(`${API_URL}/${gameId}/finish-game`, payload, { withCredentials: true });
            console.log("posting winner", {
				gameId,
				p1score,
				p2score,
				winner,
				userId: user.id,
				opponentId: opponentUserId,
			  });
			navigate('/hub', {state: {
				userId: id,
    			username: username,
			}});
        } catch (err) {
            const error = err as AxiosError;
            console.log("unable to save match result", error);
            navigate('/hub', {state: {
				userId: id,
    			username: username,
			}});
        };
    }
    
    return (
        <div className="absolute inset-0 flex items-center justify-center text-xl bg-gray-900 opacity-95">
            <div className="border bg-gray-950 p-6 rounded text-center">
                <h1 className="font-bold text-2xl mb-4">Match Result</h1>

                <div className="flex flex-row justify-between items-center gap-8">
                {/* Player 1 */}
                <div className="flex flex-col items-center">
            
                    <p className=   {`font-semibold text-xl ${winner === 'left' ? 'text-indigo-400' : 'text-red-400'}`}>
                                    {winner === 'left' ? 'Winner' : 'Loser'}
                    </p>
                    <p className="text-lg text-gray-400 font-bold">{username}</p>
                </div>

                {/* Score */}
                <div className="flex flex-col items-center">
                    <p className="text-3xl font-bold">{p1score} : {p2score}</p>
                </div>

                {/* Player 2 */}
                <div className="flex flex-col items-center">
                    <p className=   {`font-semibold text-xl ${winner === 'right' ? 'text-indigo-400' : 'text-red-400'}`}>
                                    {winner === 'right' ? 'Winner' : 'Loser'}
                    </p>
                    <p className="text-lg text-gray-400 font-bold">{p2Username}</p>
                </div>
         </div>
         <button onClick={postWinner} disabled={!gameId || isSubmitting} className='border rounded px-1 m-2 hover:bg-amber-200 hover:text-gray-900'>submit</button>
    </div>
</div>
    )
}

export default GameEnd;
