import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MatchBox from "./MatchBox";
import TournamentPong from "./TournamentPong";
import TournamentPongWrapper from "./TournamentWrapper";

const TournamentBracket: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scores, setScores] = useState({ left: 0, right: 0 });

  // 1) Grab the `players` array from location.state
  const routerState = (location.state as { players: number[] }) || null;
  const players = routerState?.players ?? [];
  if (players.length === 0) {
    return (
      <div className="p-10 text-center text-red-500">
        Error: No players provided.
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  // 2) Only supporting exactly 4 players for now:
  const fourPlayers = players.length === 4;
  if (!fourPlayers) {
    return (
      <div className="p-10 text-center text-red-500">
        Error: This example expects exactly 4 players, but got {players.length}.
      </div>
    );
  }

  // 3) Semifinal pairings for 4 players (seeded 0 vs 3, 1 vs 2):
  const sfPairs: [number, number][] = [
    [players[0], players[3]],
    [players[1], players[2]],
  ];

  // 4) Final placeholder
  const finalPair: [number | "TBD", number | "TBD"] = ["TBD", "TBD"];

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-10 bg-beige border-2 border-black rounded">
        Tournament Bracket
      </h1>
      <div className="grid grid-cols-2 grid-rows-4 h-96 gap-x-10">
        {/* ───── Semifinal #1 at column 1, row 1 ───── */}
        <div className="col-start-1 row-start-1 flex justify-center">
          <MatchBox
            playerA={sfPairs[0][0]}
            playerB={sfPairs[0][1]}
			
            onClick={() => {
              navigate("/play/1v1/tournament", {
				state: {
					p1UserId: sfPairs[0][0],
					p2UserId: sfPairs[0][1],
			},
			});
            }}
          />
        </div>

        {/* ───── Semifinal #2 at column 1, row 3 ───── */}
        <div className="col-start-1 row-start-3 flex justify-center">
          <MatchBox
            playerA={sfPairs[1][0]}
            playerB={sfPairs[1][1]}
            onClick={() => {navigate("/play/1v1/tournament", {
				state: {
					p1UserId: sfPairs[0][0],
					p2UserId: sfPairs[0][1],
			},
			});
              /* e.g. navigate to Pong for sfPairs[1][0] vs sfPairs[1][1] */
            }}
          />
        </div>

        {/* ───── Final at column 2, rows 2–3 ───── */}
        <div className="col-start-2 row-start-2 row-span-2 flex justify-center">
          <MatchBox
            playerA={finalPair[0]}
            playerB={finalPair[1]}
            onClick={() => {navigate("/play/1v1/tournament", {
				state: {
					p1UserId: sfPairs[0][0],
					p2UserId: sfPairs[0][1],
			},
			});
              /* e.g. navigate to Pong for finalPair[0] vs finalPair[1] */
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TournamentBracket;