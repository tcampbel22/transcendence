import { useEffect } from "react";
import { userNameFromState } from "../../hooks/useNameFromState";
import { useUsername } from "../../hooks/useUsername";


interface MatchBoxProps {
  playerA: number | string;
  playerB: number | string;
  onClick?: () => void;
}

const MatchBox: React.FC<MatchBoxProps> = ({ playerA, playerB, onClick }) => {
  const player1Name = typeof playerA === "number" ? useUsername(playerA).username : "TBD";
  const player2Name = typeof playerB === "number" ? useUsername(playerB).username : "TBD";

  const isTBD = player1Name === "TBD" || player2Name === "TBD";

  return (
    <div
      onClick={!isTBD && onClick ? onClick : undefined}
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
        ${!isTBD && onClick ? "hover:shadow-lg cursor-pointer" : "opacity-60"} 
        transition
      `}
    >
      <div className="font-medium">{player1Name}</div>
      <div className="text-gray-500 text-sm">vs</div>
      <div className="font-medium">{player2Name}</div>
    </div>
  );
};

export default MatchBox;