import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTournamentBracket } from "../../hooks/useTournamentBracket";
import { TitleCard } from "../utils/TitleCard";
import { BracketHeader } from "./TournamentBracketUtils";
import { StartTournamentGame, StartTournamentGameProps } from "./TournamentControls";
import { BracketCell } from "./BracketCell";


const TournamentBracket4: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [startGameData, setStartGameData] = useState<StartTournamentGameProps | null>(null)

  const routerState = (location.state as { shuffledPlayerIds?: number[] }) || {};
  const players = routerState.shuffledPlayerIds ?? [];

  // Load bracket data from localStorage or initialize with players
  const [bracket] = useTournamentBracket(players);

  const isEmptyBracket =
    bracket.semifinals.length === 0 &&
    (bracket.final.playerA === "TBD" || bracket.final.playerB === "TBD");

  if (isEmptyBracket) {
    return (
      <div className="p-10 text-center text-red-500">
        Error: No tournament data found.
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 border rounded hover:bg-amber-200 hover:text-gray-900"
        >
          Go Back
        </button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col w-full h-full items-center border-amber-200 overflow-scroll">
      <TitleCard link={true} />
            <div className="grid grid-cols-2 grid-rows-5 w-5xl min-h-lg">
              
			  <BracketHeader text="Semifinal" col={1} row={1}/>
              <BracketHeader text="Final" col={2} row={1}/>
				<div className="col-start-1 row-start-2">
					<BracketCell 	
						p1Id={bracket.semifinals[0]?.playerA}
						p2Id={bracket.semifinals[0]?.playerB}
						winner={bracket.semifinals[0]?.winner}
						hasPlayed={bracket.semifinals[0]?.hasPlayed}
						index={0}
						stage="semifinal"
						setData={(data) => setStartGameData(data)}
						xDir="left"
						yDir="bottom"
						tType={4}/>
					</div>

					<div className="col-start-1 row-start-4">
					<BracketCell 	
						p1Id={bracket.semifinals[1]?.playerA}
						p2Id={bracket.semifinals[1]?.playerB}
						winner={bracket.semifinals[1]?.winner}
						hasPlayed={bracket.semifinals[1]?.hasPlayed}
						index={1}
						stage="semifinal"
						setData={(data) => setStartGameData(data)}
						xDir="left"
						yDir="top"
						tType={4}/>
					</div>
				<div className="col-start-2 row-start-3">
					<BracketCell 	
						p1Id={bracket.final?.playerA}
						p2Id={bracket.final?.playerB}
						winner={bracket.final?.winner}
						hasPlayed={bracket.final?.hasPlayed}
						index={0}
						stage="final"
						setData={(data) => setStartGameData(data)}
						xDir=""
						yDir=""
						tType={4}/>
						</div>
            </div>
			{startGameData && (
				<StartTournamentGame
					{...startGameData}
					onStart={() => {
					navigate("/play/1v1/tournament", {
						state: startGameData,
					});
					}}
					onClose={() => setStartGameData(null)}
				/>
				)}
          </div>
  );
};

export default TournamentBracket4;
