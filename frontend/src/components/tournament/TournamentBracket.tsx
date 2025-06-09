import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MatchBox from "./MatchBox";
import { useTournamentBracket } from "../../hooks/useTournamentBracket";

const TournamentBracket: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routerState = (location.state as { players?: number[] }) || {};
  const players = routerState.players ?? [];

  // Always load from localStorage; init if players are passed
  const [bracket] = useTournamentBracket(players);

  const isEmptyBracket =
    bracket.semifinals.length === 0 &&
    bracket.round1.length === 0 &&
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
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-10 bg-beige border-2 border-black rounded">
        Tournament Bracket
      </h1>

      <div className="grid grid-cols-3 grid-rows-4 gap-x-10">
        {/* ───── Round 1 (only if 8 players) ───── */}
        {bracket.round1.length > 0 &&
          bracket.round1.map((match, index) => (
            <div key={`r1-${index}`} className={`col-start-1 row-start-${index + 1} flex justify-center`}>
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
            </div>
          ))}

        {/* ───── Semifinals ───── */}
        {bracket.semifinals.map((match, index) => (
          <div key={`sf-${index}`} className={`col-start-2 row-start-${index * 2 + 1} flex justify-center`}>
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
          </div>
        ))}

        {/* ───── Final ───── */}
        <div className="col-start-3 row-start-2 row-span-2 flex justify-center">
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
  );
};

export default TournamentBracket;