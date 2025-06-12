import { useUsername } from "../../hooks/useUsername";

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
        ${hasPlayed ? 'border-black' : 'border-black'}
        bg-beige
        p-5
        w-48
        h-40
        text-center
        rounded-lg
        shadow-lg
        backdrop-blur-sm
        ${canClick ? "hover:shadow-xl hover:scale-105 cursor-pointer hover:bg-amber-100" : hasPlayed ? "" : "opacity-80"}
        transition-all duration-200
        relative
        overflow-hidden
      `}
    >
      {hasPlayed && (
        <div className="absolute -right-8 -top-8 w-16 h-16 bg-black rotate-45 opacity-80 shadow-md"></div>
      )}

      <div className="flex flex-col justify-between h-full py-2">
        <div className={`font-bold text-lg mb-2 ${isPlayerAWinner ? 'text-black font-extrabold' : 'text-black'}`}>
          {playerAUsername}
          {isPlayerAWinner && <span className="ml-2">👑</span>}
        </div>

        <div className="flex items-center justify-center my-1">
          <div className="h-0.5 w-8 bg-black/50"></div>
          <div className="text-black text-sm font-semibold mx-2">vs</div>
          <div className="h-0.5 w-8 bg-black/50"></div>
        </div>

        <div className={`font-bold text-lg mt-2 ${isPlayerBWinner ? 'text-black font-extrabold' : 'text-black'}`}>
          {playerBUsername}
          {isPlayerBWinner && <span className="ml-2">👑</span>}
        </div>
      </div>

      {canClick && (
        <div className="absolute bottom-2 right-2">
          <span className="text-xs font-bold text-black bg-amber-100 px-2 py-1 rounded-full animate-pulse shadow-sm">▶ Press to Play</span>
        </div>
      )}
    </div>
  );
};

export default MatchBox;
