interface MatchBoxProps {
  playerA: string;
  playerB: string;
  onClick?: () => void;
}


const MatchBox: React.FC<MatchBoxProps> = ({ playerA, playerB, onClick }) => {
  const isTBD = playerA === "TBD" || playerB === "TBD";

  return (
    <div
      onClick={!isTBD && onClick ? onClick : undefined}
      className={`
        border 
        border-gray-400 
        bg-white 
        p-4 
        w-40 
        h-24       /* fixed height so all boxes align */
        text-center 
        rounded 
        shadow 
        ${!isTBD && onClick ? "hover:shadow-lg cursor-pointer" : "opacity-60"} 
        transition
      `}
    >
      <div className="font-medium">{playerA}</div>
      <div className="text-gray-500 text-sm">vs</div>
      <div className="font-medium">{playerB}</div>
    </div>
  );
};

export default MatchBox;