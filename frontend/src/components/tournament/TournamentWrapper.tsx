import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import TournamentPong from "./TournamentPong";

const TournamentPongWrapper: React.FC = () => {
  const location = useLocation();
  const state = location.state as {
    p1UserId: number;
    p2UserId: number;
    stage: "round1" | "semifinal" | "final";
    matchIndex?: number;
  };

  const [scores, setScores] = useState({ left: 0, right: 0 });

  if (!state?.p1UserId || !state?.p2UserId || !state?.stage) {
    return <div className="p-10 text-center text-red-500">Missing match data</div>;
  }

  return (
    <TournamentPong
      p1UserId={state.p1UserId}
      p2UserId={state.p2UserId}
      stage={state.stage}
      matchIndex={state.matchIndex}
      onScoreChange={(left, right) => setScores({ left, right })}
    />
  );
};

export default TournamentPongWrapper;