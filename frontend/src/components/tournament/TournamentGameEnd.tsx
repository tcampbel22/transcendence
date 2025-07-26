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
          className="mt-4 px-6 py-2 border-2 border-amber-200 rounded hover:bg-black hover:text-beige transition"
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
