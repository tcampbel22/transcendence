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
    <div className="p-6 min-h-screen flex flex-col" style={{ backgroundImage: 'url("/images/epic_background.webp")' }}>
      <h1 className="text-3xl font-bold text-center mb-6 bg-beige text-amber-200 p-3 rounded-lg shadow-lg w-80 mx-auto flex items-center justify-center">
        <span className="text-2xl mr-3">🏆</span>Tournament<span className="text-2xl ml-3">🏆</span>
      </h1>

      <div className="flex justify-center">
        <div className="relative max-w-6xl w-full">
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-20 backdrop-blur-sm">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-amber-500/50"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-amber-700/50"></div>
          </div>

          {/* Tournament Bracket Grid Structure */}
          <div className="relative">
            {/* Grid layout with 3 columns and 8 rows */}
            <div className="grid grid-cols-3 gap-x-16 mx-auto max-w-5xl">
              {/* Section Titles - Row 1 */}
              <div className="flex items-center justify-center h-[60px] mb-4">
                <h2 className="text-xl font-bold text-amber-200 bg-beige rounded-full py-1 px-6 shadow-sm text-center">
                  Quarter Finals
                </h2>
              </div>
              <div className="flex items-center justify-center h-[60px] mb-4">
                <h2 className="text-xl font-bold text-amber-200 bg-beige rounded-full py-1 px-6 shadow-sm w-36 text-center">
                  Semifinals
                </h2>
              </div>
              <div className="flex items-center justify-center h-[60px] mb-4">
                <h2 className="text-xl font-bold text-amber-200 bg-beige rounded-full py-1 px-6 shadow-sm w-36 text-center">
                  Final
                </h2>
              </div>
              {/* Round 1 - Match 1 (Row 2, Column 1) */}
              <div className="flex items-center justify-center relative h-[120px]">
                <MatchBox
                  playerA={bracket.round1[0]?.playerA}
                  playerB={bracket.round1[0]?.playerB}
                  winner={bracket.round1[0]?.winner}
                  hasPlayed={bracket.round1[0]?.hasPlayed}
                  onClick={() => {
                    navigate("/play/1v1/tournament", {
                      state: {
                        p1UserId: bracket.round1[0]?.playerA,
                        p2UserId: bracket.round1[0]?.playerB,
                        matchIndex: 0,
                        stage: "round1",
                      },
                    });
                  }}
                />
                {/* Connection lines */}
                <div className={`absolute top-1/2 right-[-25px] w-20 h-[3px] ${bracket.round1[0]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
              </div>

              {/* Empty Cell - Row 2, Column 2 */}
              <div className="h-[30px]"></div>

              {/* Empty Cell - Row 2, Column 3 */}
              <div className="h-[30px]"></div>

              {/* Empty Cell - Row 3, Column 1 */}
              <div className="relative h-[120px] flex items-center justify-center">
                <div className={`absolute top-[-60px] right-[-25px] w-[3px] h-[120px] ${bracket.round1[0]?.hasPlayed && bracket.round1[1]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
                <div className={`absolute top-[60px] right-[-25px] w-[3px] h-[120px] ${bracket.round1[0]?.hasPlayed && bracket.round1[1]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
                <div className={`absolute top-15 right-[-122px] w-24 h-[3px] ${bracket.round1[0]?.hasPlayed && bracket.round1[1]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
              </div>

              {/* Semifinal 1 - Row 3, Column 2 */}
              <div className="flex items-center justify-center relative h-[120px]">
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
                {/* Connection lines */}
                <div className={`absolute top-1/2 right-[-25px] w-20 h-[3px] ${bracket.semifinals[0]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
              </div>

              {/* Empty Cell - Row 2, Column 3 */}
              <div className="h-[30px]"></div>

              {/* Round 1 - Match 2 (Row 4, Column 1) */}
              <div className="flex items-center justify-center relative h-[120px]">
                <MatchBox
                  playerA={bracket.round1[1]?.playerA}
                  playerB={bracket.round1[1]?.playerB}
                  winner={bracket.round1[1]?.winner}
                  hasPlayed={bracket.round1[1]?.hasPlayed}
                  onClick={() => {
                    navigate("/play/1v1/tournament", {
                      state: {
                        p1UserId: bracket.round1[1]?.playerA,
                        p2UserId: bracket.round1[1]?.playerB,
                        matchIndex: 1,
                        stage: "round1",
                      },
                    });
                  }}
                />
                {/* Connection lines */}
                <div className={`absolute top-1/2 right-[-25px] w-20 h-[3px] ${bracket.round1[1]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
              </div>

              {/* Empty Cell - Row 2, Column 2 */}
              <div className="h-[120px]"></div>

              {/* Empty Cell - Row 4, Column 3 */}
              <div className="h-[30px]"></div>

              {/* Empty Cell - Row 5, Column 1 */}
              <div className="relative h-[120px] flex items-center justify-center">
              </div>

              {/* Empty Cell - Row 5, Column 2 */}
              <div className="relative h-[120px] flex items-center justify-end">
                {/* Connecting lines from semifinals to final */}
                <div className={`absolute top-[-180px] right-[-25px] w-[3px] h-[240px] ${bracket.semifinals[0]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
                <div className={`absolute bottom-[-180px] right-[-25px] w-[3px] h-[240px] ${bracket.semifinals[1]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
                <div className={`absolute top-15 right-[-120px] w-24 h-[3px] ${bracket.semifinals[0]?.hasPlayed || bracket.semifinals[1]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
              </div>

              {/* Final Match - Row 5, Column 3 */}
              <div className="flex items-center justify-center h-[120px]">
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

              {/* Empty Cell - Row 5, Column 1 */}
              <div className="flex items-center justify-center relative h-[120px]">
                <MatchBox
                  playerA={bracket.round1[2]?.playerA}
                  playerB={bracket.round1[2]?.playerB}
                  winner={bracket.round1[2]?.winner}
                  hasPlayed={bracket.round1[2]?.hasPlayed}
                  onClick={() => {
                    navigate("/play/1v1/tournament", {
                      state: {
                        p1UserId: bracket.round1[2]?.playerA,
                        p2UserId: bracket.round1[2]?.playerB,
                        matchIndex: 2,
                        stage: "round1",
                      },
                    });
                  }}
                />
                {/* Connection lines */}
                <div className={`absolute top-1/2 right-[-25px] w-20 h-[3px] ${bracket.round1[2]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
              </div>

              {/* Empty Cell - Row 5, Column 2 */}
              <div className="h-[30px]"></div>

              {/* Empty Cell - Row 6, Column 3 */}
              <div className="h-[30px]"></div>

              {/* Empty Cell - Row 7, Column 1 */}
              <div className="relative h-[120px] flex items-center justify-center">
                <div className={`absolute top-[-60px] right-[-25px] w-[3px] h-[120px] ${bracket.round1[2]?.hasPlayed && bracket.round1[3]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
                <div className={`absolute top-15 right-[-120px] w-24 h-[3px] ${bracket.round1[2]?.hasPlayed && bracket.round1[3]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
              </div>

              {/* Semifinal 2 - Row 7, Column 2 */}
              <div className="flex items-center justify-center relative h-[120px]">
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
                {/* Connection lines */}
                <div className={`absolute top-1/2 right-[-25px] w-20 h-[3px] ${bracket.semifinals[1]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
              </div>

              {/* Empty Cell - Row 6, Column 3 */}
              <div className="h-[30px]"></div>

              {/* Round 1 - Match 4 (Row 8, Column 1) */}
              <div className="flex items-center justify-center relative h-[120px]">
                <MatchBox
                  playerA={bracket.round1[3]?.playerA}
                  playerB={bracket.round1[3]?.playerB}
                  winner={bracket.round1[3]?.winner}
                  hasPlayed={bracket.round1[3]?.hasPlayed}
                  onClick={() => {
                    navigate("/play/1v1/tournament", {
                      state: {
                        p1UserId: bracket.round1[3]?.playerA,
                        p2UserId: bracket.round1[3]?.playerB,
                        matchIndex: 3,
                        stage: "round1",
                      },
                    });
                  }}
                />
                {/* Connection lines */}
                <div className={`absolute top-1/2 right-[-25px] w-20 h-[3px] ${bracket.round1[3]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
                <div className={`absolute top-[-60px] right-[-25px] w-[3px] h-[120px] ${bracket.round1[4]?.hasPlayed && bracket.round1[1]?.hasPlayed ? 'bg-black shadow-md' : 'bg-black/50'}`}></div>
				  
			  </div>

              {/* Empty Cell - Row 8, Column 2 */}
              <div className="relative h-[80px] flex items-center justify-center">
                {/* Connecting vertical line from match 3 to match 4 */}
              </div>

              {/* Empty Cell - Row 8, Column 3 */}
              <div className="h-[80px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentBracket8;
