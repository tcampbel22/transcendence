import { useUsername } from "../../hooks/useUsername";
import { StartTournamentGame } from "./TournamentBracket4";

interface MatchBoxProps {
  playerA: number | string;
  playerB: number | string;
  winner: number | string;
  hasPlayed: boolean;
  onClick?: () => void;
}

const MatchBox: React.FC<MatchBoxProps> = ({ playerA, playerB, winner, hasPlayed, onClick }) => {
  const playerAId = typeof playerA === "number" ? playerA : null;
  const playerBId = typeof playerB === "number" ? playerB : null;

  const playerAUsername = playerAId !== null ? useUsername(playerAId).username : "TBD";
  const playerBUsername = playerBId !== null ? useUsername(playerBId).username : "TBD";

  const isTBD = playerA === "TBD" || playerB === "TBD";
  const canClick = onClick && !isTBD && !hasPlayed;

  const isPlayerAWinner = winner === playerA;
  const isPlayerBWinner = winner === playerB;

  return (
    <div
      onClick={canClick ? onClick : undefined}
      className={`
        border-2
        p-5
        w-48
        h-40
        text-center
        rounded
        backdrop-blur-sm
        ${canClick ? "hover:scale-105 cursor-pointer hover:bg-amber-200 hover:text-gray-900" : hasPlayed ? "" : "opacity-80"}
        transition-all duration-200
        relative
        overflow-hidden
		
      `}
    >
      {hasPlayed && (
        <div className="absolute -right-8 -top-8 w-16 h-16 bg-amber-200 rotate-45 opacity-80 shadow-md"></div>
      )}


      <div className="flex flex-col justify-between h-full py-2">
        <div className={`text-lg mb-2 ${isPlayerAWinner ? 'font-extrabold' : ''}`}>
          {playerAUsername}
          {isPlayerAWinner && !isTBD && <span className="ml-2">👑</span>}
        </div>

        <div className="flex items-center justify-center my-1">
          <div className="h-0.5 w-8 bg-amber-200/50"></div>
          <div className="text-sm font-semibold mx-2">vs</div>
          <div className="h-0.5 w-8 bg-amber-200/50"></div>
        </div>

        <div className={`text-lg mt-2 ${isPlayerBWinner ? 'font-extrabold' : ''}`}>
          {playerBUsername}
          {isPlayerBWinner && !isTBD && <span className="ml-2">👑</span>}
        </div>
      </div>
    </div>
  );
};

export default MatchBox;
