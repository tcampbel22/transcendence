import { useState, useEffect } from "react";

export type BracketMatch = {
  playerA: number | "TBD";
  playerB: number | "TBD";
  winner: number | "TBD";
  hasPlayed: boolean;
};

export type BracketState = {
  round1: BracketMatch[];      // For 8 players only
  semifinals: BracketMatch[];
  final: BracketMatch;
};

const generateInitialBracket = (players: number[]): BracketState => {
  if (players.length === 8) {
    return {
      round1: [
        { playerA: players[0], playerB: players[7], winner: "TBD", hasPlayed: false },
        { playerA: players[3], playerB: players[4], winner: "TBD", hasPlayed: false },
        { playerA: players[1], playerB: players[6], winner: "TBD", hasPlayed: false },
        { playerA: players[2], playerB: players[5], winner: "TBD", hasPlayed: false },
      ],
      semifinals: [
        { playerA: "TBD", playerB: "TBD", winner: "TBD", hasPlayed: false },
        { playerA: "TBD", playerB: "TBD", winner: "TBD", hasPlayed: false },
      ],
      final: { playerA: "TBD", playerB: "TBD", winner: "TBD", hasPlayed: false },
    };
  }

  // 4 players
  return {
    round1: [],
    semifinals: [
      { playerA: players[0], playerB: players[3], winner: "TBD", hasPlayed: false },
      { playerA: players[1], playerB: players[2], winner: "TBD", hasPlayed: false },
    ],
    final: { playerA: "TBD", playerB: "TBD", winner: "TBD", hasPlayed: false },
  };
};

export function useTournamentBracket(players: number[]) {
  const [bracket, setBracket] = useState<BracketState>(() => {
    const stored = localStorage.getItem("tournament_bracket");
    if (stored) return JSON.parse(stored);
    const initial = generateInitialBracket(players);
    localStorage.setItem("tournament_bracket", JSON.stringify(initial));
    return initial;
  });

  useEffect(() => {
    localStorage.setItem("tournament_bracket", JSON.stringify(bracket));
  }, [bracket]);

  const updateMatchResult = (
    stage: "round1" | "semifinal" | "final",
    matchIndex: number,
    winner: number
  ) => {
    setBracket(prev => {
      const newBracket = { ...prev };

      if (stage === "round1") {
        newBracket.round1[matchIndex] = {
          ...newBracket.round1[matchIndex],
          winner,
          hasPlayed: true,
        };

        const semiIndex = matchIndex < 2 ? 0 : 1;
        const position = matchIndex % 2 === 0 ? "playerA" : "playerB";
        newBracket.semifinals[semiIndex][position] = winner;
      }

      if (stage === "semifinal") {
        newBracket.semifinals[matchIndex] = {
          ...newBracket.semifinals[matchIndex],
          winner,
          hasPlayed: true,
        };

        if (matchIndex === 0) newBracket.final.playerA = winner;
        if (matchIndex === 1) newBracket.final.playerB = winner;
      }

      if (stage === "final") {
        newBracket.final = {
          ...newBracket.final,
          winner,
          hasPlayed: true,
        };
      }

      localStorage.setItem("tournament_bracket", JSON.stringify(newBracket));
      return newBracket;
    });
  };

  return [bracket, updateMatchResult] as const;
}