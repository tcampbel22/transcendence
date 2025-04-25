import { useEffect } from 'react';
import  {useUsername} from '../../hooks/useUsername'
import { useCreateGame } from '../../hooks/useCreateGame';
import axios, { AxiosError } from 'axios';


type EndGameProps = {
    userId: number,
    opponentUserId: number,
    winner: string | null ,
    p1score: number,
    p2score: number
};

const GameEnd = async ({userId, opponentUserId, winner, p1score, p2score} : EndGameProps) => {
    const API_URL = import.meta.env.VITE_API_USER;
    const { username: p1Username } = await useUsername(userId);
    const { username: p2Username } = await useUsername(opponentUserId);

    console.log("usernames of players: ", p2Username);
    const { gameId: gameId } = await useCreateGame({ p1Id: userId, p2Id: opponentUserId });

    useEffect(() => {
        const postWinner = async () => {
           const payload = {
                gameId: gameId,
                p1score: p1score,
                p2score: p2score,
                winnerId: winner === 'left' ? userId : opponentUserId
            }
            try {
                axios.patch(`${API_URL}/api/${gameId}/finish-game`, payload);
            } catch (err) {
                const error = err as AxiosError;
                console.log("unable to save match result", error);
            };
        }
        postWinner();
    }, [gameId, userId])

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-beige p-6 rounded-lg text-center">
                <h1 className="font-bold text-2xl mb-4">Match Result</h1>

                <div className="flex flex-row justify-between items-center gap-8">
                {/* Player 1 */}
                <div className="flex flex-col items-center">
                    {winner === 'left' && <p className="font-semibold text-lg text-green-500">Winner</p>}
                    <p className="font-semibold text-lg">Loser</p>
                    <p className="text-sm text-gray-600">{p1Username}</p>
                </div>

                {/* Score */}
                <div className="flex flex-col items-center">
                    <p className="text-3xl font-bold">{p1score} : {p2score}</p>
                </div>

                {/* Player 2 */}
                <div className="flex flex-col items-center">
                    <p className="font-semibold text-lg">Player 2</p>
                    <p className="text-sm text-gray-600">{p2Username}</p>
                </div>
         </div>
    </div>
</div>
    )
}

export default GameEnd;
