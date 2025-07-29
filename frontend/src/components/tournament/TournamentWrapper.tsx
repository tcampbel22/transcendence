import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import TournamentPong from "./TournamentPong";
import { useUsername } from "../../hooks/useUsername";

const TournamentPongWrapper: React.FC = () => {
  const location = useLocation();
  const state = location.state as {
    p1UserId: number;
    p2UserId: number;
    stage: "round1" | "semifinal" | "final";
    matchIndex?: number;
  };
  const p1username = useUsername(state.p1UserId);
  const p2username = useUsername(state.p2UserId);
  const [scores, setScores] = useState({ left: 0, right: 0 });

  if (!state?.p1UserId || !state?.p2UserId || !state?.stage) {
    return <div className="p-10 text-center text-red-500">Missing match data</div>;
  }
  return (
    <TournamentPong
      p1UserId={state.p1UserId}
      p2UserId={state.p2UserId}
	  p1Username={p1username.username}
	  p2Username={p2username.username}
      stage={state.stage}
      matchIndex={state.matchIndex}
      onScoreChange={(left, right) => setScores({ left, right })}
    />
  );
};

export default TournamentPongWrapper;