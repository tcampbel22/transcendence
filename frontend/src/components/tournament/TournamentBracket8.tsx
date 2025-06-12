import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MatchBox from "./MatchBox";
import { useTournamentBracket } from "../../hooks/useTournamentBracket";

const TournamentBracket8: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
    <div className="p-6 min-h-screen" style={{ backgroundImage: 'url("/images/epic_background.webp")' }}>
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

          {/* Section Titles */}
          <div className="grid grid-cols-3 mb-4 text-center">
            <div>
              <h2 className="text-xl font-bold text-black bg-beige rounded-full py-1 px-3 shadow-sm max-w-[120px] mx-auto">
                Round 1
              </h2>
            </div>
            <div>
              <h2 className="text-xl font-bold text-black bg-beige rounded-full py-1 px-3 shadow-sm max-w-[140px] mx-auto">
                Semifinals
              </h2>
            </div>
            <div>
              <h2 className="text-xl font-bold text-black bg-beige rounded-full py-1 px-3 shadow-sm max-w-[100px] mx-auto">
                Final
              </h2>
            </div>
          </div>

          {/* Triangle Bracket Structure */}
          <div className="relative">
            {/* Round 1 */}
            <div className="grid grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="flex flex-col justify-around h-[800px] py-8">
                  {bracket.round1.map((match, index) => (
                    <div key={`r1-${index}`} className="relative mb-8">
                      <MatchBox
                        playerA={match.playerA}
                        playerB={match.playerB}
                        winner={match.winner}
                        hasPlayed={match.hasPlayed}
                        onClick={() => {
                          navigate("/play/1v1/tournament", {
                            state: {
                              p1UserId: match.playerA,
                              p2UserId: match.playerB,
                              matchIndex: index,
                              stage: "round1",
                            },
                          });
                        }}
                      />

                      {/* Connection lines */}
                      {index % 2 === 0 && (
                        <>
                          {/* Horizontal line from match */}
                          <div className={`absolute top-1/2 right-0 w-16 h-[3px] ${match.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
                          
                          {/* Vertical line connecting pairs */}
                          <div className={`absolute top-1/2 right-[-16px] w-[3px] h-[200px] ${match.hasPlayed && bracket.round1[index+1]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
                          
                          {/* Horizontal line to semifinal */}
                          <div className={`absolute top-[calc(50%+100px)] right-[-16px] w-16 h-[3px] ${match.hasPlayed && bracket.round1[index+1]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Semifinals - positioned to create triangle effect */}
              <div className="flex flex-col items-center">
                <div className="flex flex-col justify-around h-[500px] py-8 mt-32">
                  {bracket.semifinals.map((match, index) => (
                    <div key={`sf-${index}`} className="relative mb-8">
                      <MatchBox
                        playerA={match.playerA}
                        playerB={match.playerB}
                        winner={match.winner}
                        hasPlayed={match.hasPlayed}
                        onClick={() => {
                          navigate("/play/1v1/tournament", {
                            state: {
                              p1UserId: match.playerA,
                              p2UserId: match.playerB,
                              matchIndex: index,
                              stage: "semifinal",
                            },
                          });
                        }}
                      />

                      {/* Connection lines */}
                      {index === 0 && (
                        <>
                          {/* Horizontal line from semifinal */}
                          <div className={`absolute top-1/2 right-0 w-16 h-[3px] ${match.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
                          
                          {/* Vertical line connecting semifinals */}
                          <div className={`absolute top-1/2 right-[-16px] w-[3px] h-[250px] ${match.hasPlayed && bracket.semifinals[1]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
                          
                          {/* Horizontal line to final */}
                          <div className={`absolute top-[calc(50%+125px)] right-[-16px] w-16 h-[3px] ${match.hasPlayed && bracket.semifinals[1]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Final - positioned at the point of the triangle */}
              <div className="flex items-center justify-center">
                <div className="transform scale-110 mt-[230px]">
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
                </div>
              </div>
            </div>

            {/* Trophy icon if tournament is complete */}
            {bracket.final.hasPlayed && (
              <div className="absolute top-[230px] right-0 transform translate-x-full">
                <div className="text-6xl ml-4 drop-shadow-glow animate-pulse-slow">🏆</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentBracket8;
