import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MatchBox from "./MatchBox";
import { useTournamentBracket } from "../../hooks/useTournamentBracket";
import { TitleCard } from "../utils/TitleCard";
import { VertLine, HoriLine, BracketHeader } from "./TournamentBracketUtils";
import { StartTournamentGame, StartTournamentGameProps } from "./TournamentControls";


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
      <TitleCard image="/images/pong_12.svg" />
            <div className="grid grid-cols-2 grid-rows-5 w-5xl min-h-lg">
              
			  <BracketHeader text="Semifinal" col={1} row={1}/>
              <BracketHeader text="Final" col={2} row={1}/>
			
              <div className="col-start-1 row-start-2 flex justify-center items-start relative">
                <MatchBox
                  playerA={bracket.semifinals[0]?.playerA}
                  playerB={bracket.semifinals[0]?.playerB}
                  winner={bracket.semifinals[0]?.winner}
                  hasPlayed={bracket.semifinals[0]?.hasPlayed}
                  onClick={() => {
                    setStartGameData({
                        p1UserId: bracket.semifinals[0]?.playerA,
                        p2UserId: bracket.semifinals[0]?.playerB,
                        matchIndex: 0,
                        stage: "semifinal",
                    });
                  }}
                />
				<HoriLine xDir="left" yDir="top" hasPlayed={bracket.semifinals[0].hasPlayed} />
				<VertLine xDir="left" yDir="bottom" hasPlayed={bracket.semifinals[0].hasPlayed} />
              </div>
            

              
              <div className="col-start-2 row-start-3 flex items-center justify-center relative">
                <div className="flex items-center">
                  <MatchBox
                    playerA={bracket.final.playerA}
                    playerB={bracket.final.playerB}
                    winner={bracket.final.winner}
                    hasPlayed={bracket.final.hasPlayed}
                    onClick={() => {
						setStartGameData({
							p1UserId: bracket.final.playerA,
                        	p2UserId: bracket.final.playerB,
                        	stage: "final",
						});
					  }}
                  />

                  {/* Trophy if tournament is complete */}
                  {bracket.final.hasPlayed && (
                    <div className="ml-8">
                      <div className="text-6xl drop-shadow-glow animate-pulse-slow">🏆</div>
                    </div>
                  )}
                </div>
				<HoriLine xDir="right" yDir="top" hasPlayed={bracket.final.hasPlayed} />
              </div>

              {/* Semifinal 2 - Fourth Row, First Column */}
              <div className="col-start-1 row-start-4 flex items-center justify-center relative">
                <MatchBox
                  playerA={bracket.semifinals[1]?.playerA}
                  playerB={bracket.semifinals[1]?.playerB}
                  winner={bracket.semifinals[1]?.winner}
                  hasPlayed={bracket.semifinals[1]?.hasPlayed}
                  onClick={() => {
                    setStartGameData({
                        p1UserId: bracket.semifinals[1]?.playerA,
                        p2UserId: bracket.semifinals[1]?.playerB,
                        matchIndex: 1,
                        stage: "semifinal",
                    });
                  }}
                />
				<HoriLine xDir="left" yDir="top" hasPlayed={bracket.semifinals[1].hasPlayed}  />
				<VertLine xDir="left" yDir="top" hasPlayed={bracket.semifinals[1].hasPlayed}  />
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
