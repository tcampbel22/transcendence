// import { useState, useRef } from 'react';
// import  {useUsername} from '../../hooks/useUsername'
// import { useNavigate } from 'react-router-dom';
// import api from '../../lib/api';
// import { AxiosError } from 'axios';


// type userObj = {
//     userId: number;
//     username: { username: string | undefined };
// };

// type EndGameProps = {
//     gameId: number | null,
//     user: userObj,
//     opponentUserId: number,
//     winner: string | null ,
//     p1score: number,
//     p2score: number
// 	stage: string
// };

// const TournamentGameEnd = ({user, opponentUserId, winner, p1score, p2score, gameId, stage} : EndGameProps) => {
//     const navigate = useNavigate();
//     const {userId, username } = user;
//     const API_URL = import.meta.env.VITE_API_GAME;
//     const { username: p2Username } = useUsername(opponentUserId);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const submittedOnce = useRef(false);
   


//     const postWinner = async () => {
//         if (!gameId || isSubmitting || submittedOnce.current) {
//             console.log("Submission skipped - game not ready or already submitted");
//             return;
//         }
//         setIsSubmitting(true);
//         submittedOnce.current = true;

//         const payload = {
//             gameId: gameId,
//             p1score: p1score,
//             p2score: p2score,
//             winnerId: winner === 'left' ? userId : opponentUserId,
//         }
// 		console.log("payload inside postwinner:", payload)
//         try {
//             const res = await api.patch(`${API_URL}/${gameId}/finish-game`, payload);
//             console.log("match finished", res.data);
// 			console.log("userstate after match: ", user);
// 			if (stage === "finals")
// 				navigate('/hub');
//             navigate('/play/tournament-bracket', {state:user});
//         } catch (err) {
//             const error = err as AxiosError;
//             console.log("unable to save match result", error);
//             navigate('/hub', {state:user});
//         };
//     }
    
//     return (
//         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
//             <div className="bg-beige p-6 rounded-lg text-center">
//                 <h1 className="font-bold text-2xl mb-4">{stage}</h1>
// 				<h2 className="font-bold text-2xl mb-4">result</h2>
//                 <div className="flex flex-row justify-between items-center gap-8">
//                 {/* Player 1 */}
//                 <div className="flex flex-col items-center">
//                     {winner === 'left' && <p className="font-semibold text-lg text-green-500">Winner</p>}
//                     <p className=   {`font-semibold text-lg ${winner === 'left' ? 'text-green-500' : 'text-red-600'}`}>
//                                     {winner === 'left' ? 'Winner' : 'Loser'}
//                     </p>
//                     <p className="text-sm text-gray-600 font-bold">{useUsername(userId).username}</p>
//                 </div>

//                 {/* Score */}
//                 <div className="flex flex-col items-center">
//                     <p className="text-3xl font-bold">{p1score} : {p2score}</p>
//                 </div>

//                 {/* Player 2 */}
//                 <div className="flex flex-col items-center">
//                     <p className=   {`font-semibold text-lg ${winner === 'right' ? 'text-green-500' : 'text-red-600'}`}>
//                                     {winner === 'right' ? 'Winner' : 'Loser'}
//                     </p>
//                     <p className="text-sm text-gray-600 font-bold">{p2Username}</p>
//                 </div>
//          </div>
//          <button onClick={postWinner} disabled={!gameId || isSubmitting} className='border-2 border-black rounded px-1 m-2 hover:bg-black hover:text-beige shadow-sm'>submit</button>
//     </div>
// </div>
//     )
// }

// export default TournamentGameEnd;

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsername } from '../../hooks/useUsername';
import api from '../../lib/api';
import { AxiosError } from 'axios';

// Props for the end-of-game popup
interface EndGameProps {
  gameId: number | null;
  user: { userId: number; username: { username: string | undefined } | string };
  opponentUserId: number;
  winner: 'left' | 'right' | null;
  p1score: number;
  p2score: number;
  stage: string;
}

const TournamentGameEnd: React.FC<EndGameProps> = ({
  user,
  opponentUserId,
  winner,
  p1score,
  p2score,
  gameId,
  stage,
}) => {
  const navigate = useNavigate();
  const { userId } = user;
  // Handle both object and string username formats
  const userUsername = typeof user.username === 'object' ? user.username.username : user.username;
  const { username: p2Username } = useUsername(opponentUserId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittedOnce = useRef(false);

  const isFinal = stage === 'final';

  const postWinner = async () => {
    if (!gameId || isSubmitting || submittedOnce.current) return;
    setIsSubmitting(true);
    submittedOnce.current = true;

    const winnerId = winner === 'left' ? userId : opponentUserId;
    const payload = { gameId, p1score, p2score, winnerId };

    try {
      await api.patch(
        `${import.meta.env.VITE_API_GAME}/${gameId}/finish-game`,
        payload
      );
      // After saving, navigate based on stage
      if (isFinal) {
		localStorage.removeItem("tournament_bracket");
		navigate('/hub');
	  }
      else 
	  	navigate('/play/tournament-bracket', { state: user });
    } catch (err) {
      console.error('Error submitting match:', err as AxiosError);
      navigate('/hub');
    }
  };

  // Derive the display name of the winner with fallbacks
  const winnerName =
    winner === 'left' ? (userUsername || 'You') : (p2Username || 'Opponent');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-beige p-8 rounded-lg text-center shadow-lg max-w-sm w-full space-y-4">
        <h1 className="text-2xl font-bold">🎉 Winner of {stage}! 🎉</h1>
		<h2 className="text-3xl font-bold">{winnerName}</h2>
        <p className="text-xl">
          {isFinal ? 'You won the tournament!' : 'You won this match!'}
        </p>
        <p className="font-semibold">
          Final Score: {p1score} : {p2score}
        </p>
        <button
          onClick={postWinner}
          disabled={isSubmitting}
          className="mt-4 px-6 py-2 border-2 border-black rounded hover:bg-black hover:text-beige transition"
        >
          {isSubmitting
            ? 'Submitting...'
            : isFinal
            ? 'Go to Hub'
            : 'Back to Bracket'}
        </button>
      </div>
    </div>
  );
};

export default TournamentGameEnd;
