import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTournamentBracket } from "../../hooks/useTournamentBracket";
import { TitleCard } from "../utils/TitleCard";
import { BracketHeader } from "./TournamentBracketUtils";
import { StartTournamentGame, StartTournamentGameProps } from "./TournamentControls";
import { BracketCell } from "./BracketCell";

// type BreacketCellProps = {
// 	col: number;
// 	row: number;
// 	p1Id: number | "TBD";
// 	p2Id: number | "TBD";
// 	winner: number | "TBD";
// 	hasPlayed: boolean;
// 	index?: number;
// 	stage: string;
// 	xDir: string;
// 	yDir: string;
// 	setData: (data: StartTournamentGameProps) => void;
// }

// const BracketCell:React.FC<BreacketCellProps> = ({ 
// 	col, row, p1Id, p2Id, winner, hasPlayed, index, stage, xDir, yDir, setData }) => {
// 	const column = `col-start-${col}`
// 	const rowVal = `row-start-${row}`
	
// 	return (
// 		<div className={`${column} ${rowVal} flex items-start justify-center relative`}>
//                 {stage === 'semifinal' ? (<ShortHoriLine xDir="" yDir="" hasPlayed={hasPlayed}/>) : null}
//                 {stage === 'final' ? (<ShortHoriLine xDir="" yDir="" hasPlayed={hasPlayed}/>) : null}
// 				<MatchBox
//                   playerA={p1Id}
//                   playerB={p2Id}
//                   winner={winner}
//                   hasPlayed={hasPlayed}
//                   onClick={() => {
//                     setData({
//                         p1UserId: p1Id,
//                         p2UserId: p2Id,
//                         matchIndex: index!,
//                         stage: stage,
//                     });
//                   }}
//                 />
// 				{stage !== 'final' ? (
// 					<>
// 						<ShortHoriLine xDir="left" yDir="" hasPlayed={hasPlayed} />
// 						{index === 0 || index === 3 || stage === 'semifinal' ? (
// 						<VertLine xDir="left" yDir={yDir} hasPlayed={hasPlayed} />
// 						) : ( null)}
// 					</>
// 					) : null}
//         </div>
// 	)
// }

const TournamentBracket8: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [startGameData, setStartGameData] = useState<StartTournamentGameProps | null>(null)

  const routerState = (location.state as { shuffledPlayerIds?: number[] }) || {};
  const players = routerState.shuffledPlayerIds ?? [];

  // Load bracket data from localStorage or initialize with players
  const [bracket] = useTournamentBracket(players);

  const isEmptyBracket =
    bracket.round1.length === 0 &&
    bracket.semifinals.length === 0 &&
    (bracket.final.playerA === "TBD" || bracket.final.playerB === "TBD");

  if (isEmptyBracket) {
    return (
      <div className="p-10 text-red-500">
        Error: No tournament data found.
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full  overflow-scroll text-center">
      <TitleCard link={true} />

      
        <div className="relative max-w-6xl w-full h-full">
		<div className="grid grid-cols-3">
              <BracketHeader text="Quarter Finals" col={1} row={1}/>
              <BracketHeader text="Semi Finals" col={2} row={1}/>
              <BracketHeader text="Final" col={3} row={1}/>
		</div>
            <div className="grid grid-cols-3 grid-rows-7 gap-2 relative">
			
			  <div className="col-start-1 row-start-1">
			  	<BracketCell 	
					p1Id={bracket.round1[0]?.playerA}
					p2Id={bracket.round1[0]?.playerB}
					winner={bracket.round1[0]?.winner}
					hasPlayed={bracket.round1[0]?.hasPlayed}
					index={0}
					stage="round1"
					setData={(data) => setStartGameData(data)}
					xDir="left"
					yDir="bottom"
					tType={8}
					/>
				</div>
				<div className="col-start-1 row-start-2">
				<BracketCell 	
					p1Id={bracket.round1[1]?.playerA}
					p2Id={bracket.round1[1]?.playerB}
					winner={bracket.round1[1]?.winner}
					hasPlayed={bracket.round1[1]?.hasPlayed}
					index={1}
					stage="round1"
					setData={(data) => setStartGameData(data)}
					xDir="left"
					yDir="top"
					tType={8}/>
				</div>
				<div className="col-start-1 row-start-4">
				<BracketCell 	
					p1Id={bracket.round1[2]?.playerA}
					p2Id={bracket.round1[2]?.playerB}
					winner={bracket.round1[2]?.winner}
					hasPlayed={bracket.round1[2]?.hasPlayed}
					index={2}
					stage="round1"
					setData={(data) => setStartGameData(data)}
					xDir="left"
					yDir=""
					tType={8}/>
				</div>

				<div className="col-start-1 row-start-5">
				<BracketCell 	
					p1Id={bracket.round1[3]?.playerA}
					p2Id={bracket.round1[3]?.playerB}
					winner={bracket.round1[3]?.winner}
					hasPlayed={bracket.round1[3]?.hasPlayed}
					index={3}
					stage="round1"
					setData={(data) => setStartGameData(data)}
					xDir="left"
					yDir="top"
					tType={8}/>
				</div>
				<div className="col-start-2 row-start-2">
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
					tType={8}/>
				</div>

				<div className="col-start-2 row-start-4">
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
					tType={8}/>
				</div>
				<div className="col-start-3 row-start-3">
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
					tType={8}/>
					</div>
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

export default TournamentBracket8;
