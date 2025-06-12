import React from "react";
import { useLocation } from "react-router-dom";
import { useTournamentBracket } from "../../hooks/useTournamentBracket";
import TournamentBracket4 from "./TournamentBracket4";
import TournamentBracket8 from "./TournamentBracket8";

/**
 * Router component that redirects to the appropriate tournament bracket based on player count
 */
const TournamentBracket: React.FC = () => {
  const location = useLocation();
  const routerState = (location.state as { shuffledPlayerIds?: number[] }) || {};
  const players = routerState.shuffledPlayerIds ?? [];

  // Always load from localStorage; init if players are passed
  const [bracket] = useTournamentBracket(players);

  // Determine if this is an 8-player tournament by checking for round1 matches
  const isEightPlayerTournament = bracket.round1.length > 0;

  // Render the appropriate bracket based on tournament size
  return isEightPlayerTournament ? <TournamentBracket8 /> : <TournamentBracket4 />;
};

export default TournamentBracket;