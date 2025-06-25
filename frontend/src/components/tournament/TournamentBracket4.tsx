import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MatchBox from "./MatchBox";
import { useTournamentBracket } from "../../hooks/useTournamentBracket";

const TournamentBracket4: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
          className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen flex flex-col" style={{ backgroundImage: 'url("/images/epic_background.webp")'}}>
      <h1 className="text-3xl font-bold text-center mb-6 bg-beige text-black p-3 rounded-lg shadow-lg w-80 mx-auto flex items-center justify-center">
        <span className="text-2xl mr-3">🏆</span>Tournament<span className="text-2xl ml-3">🏆</span>
      </h1>

      <div className="flex justify-center">
        <div className="relative max-w-5xl w-full">
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-20 backdrop-blur-sm">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-amber-500/50"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-amber-700/50"></div>
          </div>

          {/* Tournament Bracket Grid Structure */}
          <div className="relative">
            {/* Grid layout with 2 columns and 4 rows */}
            <div className="grid grid-cols-2 gap-x-20 mx-auto max-w-4xl">
              {/* Section Titles - Row 1 */}
              <div className="flex items-center justify-center h-[60px] mb-4">
                <h2 className="text-xl font-bold text-black bg-beige rounded-full py-1 px-6 shadow-sm w-36 text-center">
                  Semifinals
                </h2>
              </div>
              <div className="flex items-center justify-center h-[60px] mb-4">
                <h2 className="text-xl font-bold text-black bg-beige rounded-full py-1 px-6 shadow-sm w-36 text-center">
                  Final
                </h2>
              </div>
              {/* Semifinal 1 - Second Row, First Column */}
              <div className="flex items-center justify-center relative h-[200px]">
                <MatchBox
                  playerA={bracket.semifinals[0]?.playerA}
                  playerB={bracket.semifinals[0]?.playerB}
                  winner={bracket.semifinals[0]?.winner}
                  hasPlayed={bracket.semifinals[0]?.hasPlayed}
                  onClick={() => {
                    navigate("/play/1v1/tournament", {
                      state: {
                        p1UserId: bracket.semifinals[0]?.playerA,
                        p2UserId: bracket.semifinals[0]?.playerB,
                        matchIndex: 0,
                        stage: "semifinal",
                      },
                    });
                  }}
                />
                {/* Connection lines from first semifinal */}
                <div className={`absolute top-1/2 right-0 w-28 h-[3px] ${bracket.semifinals[0]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
                <div className={`absolute top-1/2 right-0 w-[3px] h-[200px] ${bracket.semifinals[0]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
              </div>

              {/* Empty Cell - Second Row, Second Column */}
              <div className="h-[200px]"></div>

              {/* Connecting Line Cell - Third Row, First Column */}
              <div className="relative h-[300px] flex items-center justify-end">
                <div className={`absolute top-0 right-0 w-[3px] h-[200px] ${bracket.semifinals[0]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
                <div className={`absolute top-[150px] right-[-190px] w-48 h-[3px] ${bracket.semifinals[0]?.hasPlayed && bracket.semifinals[1]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
              </div>

              {/* Final Match - Third Row, Second Column */}
              <div className="flex items-center justify-center h-[300px]">
                <div className="flex items-center">
                  <MatchBox
                    playerA={bracket.final.playerA}
                    playerB={bracket.final.playerB}
                    winner={bracket.final.winner}
                    hasPlayed={bracket.final.hasPlayed}
                    onClick={() => {
                      navigate("/play/1v1/tournament", {
                        state: {
                          p1UserId: bracket.final.playerA,
                          p2UserId: bracket.final.playerB,
                          stage: "final",
                        },
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
              </div>

              {/* Semifinal 2 - Fourth Row, First Column */}
              <div className="flex items-center justify-center relative h-[200px]">
                <MatchBox
                  playerA={bracket.semifinals[1]?.playerA}
                  playerB={bracket.semifinals[1]?.playerB}
                  winner={bracket.semifinals[1]?.winner}
                  hasPlayed={bracket.semifinals[1]?.hasPlayed}
                  onClick={() => {
                    navigate("/play/1v1/tournament", {
                      state: {
                        p1UserId: bracket.semifinals[1]?.playerA,
                        p2UserId: bracket.semifinals[1]?.playerB,
                        matchIndex: 1,
                        stage: "semifinal",
                      },
                    });
                  }}
                />
                {/* Connection lines from second semifinal */}
                <div className={`absolute top-1/2 right-0 w-28 h-[3px] ${bracket.semifinals[1]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
                <div className={`absolute top-1/2 right-0 w-[3px] h-[200px] transform -translate-y-[200px] ${bracket.semifinals[1]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
              </div>

              {/* Empty Cell - Fourth Row, Second Column */}
              <div className="h-[200px]"></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentBracket4;
