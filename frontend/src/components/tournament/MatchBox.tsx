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

  return (
    <div
      onClick={canClick ? onClick : undefined}
      className={`
        border-2 
        border-black
        bg-beige 
        p-4
        w-40 
        h-24 
        text-center 
        rounded 
        shadow 
        ${canClick ? "hover:shadow-lg cursor-pointer" : "opacity-60"} 
        transition
      `}
    >
      <div className="font-medium">{playerAUsername}</div>
      <div className="text-gray-500 text-sm">vs</div>
      <div className="font-medium">{playerBUsername}</div>
    </div>
  );
};

export default MatchBox;


