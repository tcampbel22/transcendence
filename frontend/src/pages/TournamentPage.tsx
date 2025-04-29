// // src/pages/TournamentPage.tsx
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Pong from '../components/Pong';

// type TournamentType = '4player' | '8player';

// interface Match {
//   id: string;
//   player1: string;
//   player2: string;
//   winner?: string;
//   status: 'pending' | 'in-progress' | 'completed';
//   nextMatchId?: string;
// }

// interface TournamentState {
//   currentRound: number;
//   rounds: Match[][];
//   currentMatchIndex: number;
// }

// const TournamentPage: React.FC = () => {
//   const [stage, setStage] = useState<'setup' | 'playing' | 'results'>('setup');
//   const [tournamentType, setTournamentType] = useState<TournamentType>('4player');
//   const [players, setPlayers] = useState<string[]>([]);
//   const [tournamentState, setTournamentState] = useState<TournamentState | null>(null);
//   const [currentMatch, setCurrentMatch] = useState<Match | null>(null);

//   // Use your existing functions but adapt them to the page format
//   const addPlayer = (playerName: string) => {
//     // Your existing logic
//   };

//   const createTournament = () => {
//     // Create tournament brackets
//     // This will replace your createRandomMatches function with the enhanced
//     // version that supports proper tournament progression
    
//     setStage('playing');
//   };

//   const handleMatchComplete = (winner: string) => {
//     // Update tournament state with match result
//     // Move to next match or round
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold text-center mb-6">Tournament Mode</h1>
      
//       {/* Back button */}
//       <Link to="/" className="absolute top-4 left-4">
//         <button className="bg-gray-500 text-white py-1 px-3 rounded">
//           ← Back to Menu
//         </button>
//       </Link>

//       {stage === 'setup' && (
//         <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//           {/* Your existing tournament setup UI, but without modal wrapper */}
//           <div className="mb-4">
//             <label className="text-lg">Choose Tournament Type:</label>
//             <select
//               className="bg-white p-2 rounded border w-full mt-2"
//               value={tournamentType}
//               onChange={(e) => {
//                 setTournamentType(e.target.value as TournamentType);
//                 setPlayers([]);
//               }}
//             >
//               <option value="2player">2 Player</option>
//               <option value="4player">4 Player</option>
//               <option value="8player">8 Player</option>
//             </select>
//           </div>
          
//           {/* Player management UI */}
//           {/* Start tournament button */}
//           <button
//             className="w-full bg-blue-500 text-white p-2 rounded font-bold"
//             onClick={createTournament}
//           >
//             Start Tournament
//           </button>
//         </div>
//       )}

//       {stage === 'playing' && (
//         <div>
//           {currentMatch ? (
//             <Pong 
//               player1={currentMatch.player1}
//               player2={currentMatch.player2}
//               onGameEnd={handleMatchComplete}
//             />
//           ) : (
//             <div className="text-center">
//               <h2 className="text-xl">Tournament Brackets</h2>
//               {/* Display tournament brackets */}
//               <button 
//                 className="bg-blue-500 text-white p-2 rounded mt-4"
//                 onClick={() => {/* Start next match */}}
//               >
//                 Start Next Match
//               </button>
//             </div>
//           )}
//         </div>
//       )}
      
//       {stage === 'results' && (
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Tournament Complete!</h2>
//           <p className="text-xl mb-6">Winner: {/* Show winner */}</p>
//           <button
//             className="bg-green-500 text-white p-2 rounded"
//             onClick={() => setStage('setup')}
//           >
//             New Tournament
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TournamentPage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pong from '../components/game/Pong';

// Define the types of tournaments
type TournamentType = '4player' | '8player';

interface Match {
  id: string;
  player1: string;
  player2: string;
  winner?: string;
  status: 'pending' | 'in-progress' | 'completed';
  nextMatchId?: string;
}

interface TournamentState {
  currentRound: number;
  rounds: Match[][];
  currentMatchIndex: number;
}

const TournamentPage: React.FC = () => {
  const [stage, setStage] = useState<'setup' | 'playing' | 'bracket' | 'results'>('setup');
  const [tournamentType, setTournamentType] = useState<TournamentType>('4player');
  const [players, setPlayers] = useState<string[]>([]);
  const [tournamentState, setTournamentState] = useState<TournamentState | null>(null);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [tournamentWinner, setTournamentWinner] = useState<string | null>(null);

  // Function to handle player addition - reused from your modal
  const addPlayer = (playerName: string) => {
    if (!parsePlayerName(playerName))
      return;
    else if (players.length == parseInt(tournamentType[0]))
      alert(`Cannot add more players to this tournament`);
    else if (players.find((existingPlayer) => existingPlayer === playerName))
      alert(`${playerName} already exists, choose another name`);
    else
      setPlayers((prev) => [...prev, playerName]);
  };

  const isAlphaNum = (name: string): boolean => {
    return /^[a-zA-Z0-9]+$/.test(name);
  } 

  const parsePlayerName = (playerName: string) : boolean => {
    if (playerName.length === 0) {
      alert("Player name cannot be empty");
      return false;
    }
    else if (!isAlphaNum(playerName)) {
      alert("Invalid characters in name, please use alpha-numeric only");
      return false;
    }
    return true;
  }
  
  // Remove player from players array
  const removePlayer = (playerName: string) => {
    setPlayers(players.filter(player => player !== playerName));
  }

  // Enhanced tournament creation function
  const createTournament = () => {
    if (players.length !== parseInt(tournamentType[0])) {
      alert(`Please add exactly ${tournamentType[0]} players.`);
      return;
    }

    const numPlayers = parseInt(tournamentType[0]);
    const rounds = Math.log2(numPlayers);
    const tournamentMatches: Match[][] = [];
    
    // Shuffle players
    let shuffledPlayers = [...players];
    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
    }
    
    // Create first round matches
    const firstRound: Match[] = [];
    for (let i = 0; i < numPlayers; i += 2) {
      firstRound.push({
        id: `round1-match${i/2+1}`,
        player1: shuffledPlayers[i],
        player2: shuffledPlayers[i+1],
        status: 'pending',
        nextMatchId: numPlayers > 2 ? `round2-match${Math.floor(i/4)+1}` : undefined
      });
    }
    tournamentMatches.push(firstRound);
    
    // Create subsequent rounds (empty matches with placeholders)
    for (let round = 1; round < rounds; round++) {
      const roundMatches: Match[] = [];
      const matchesInRound = numPlayers / Math.pow(2, round+1);
      
      for (let i = 0; i < matchesInRound; i++) {
        roundMatches.push({
          id: `round${round+1}-match${i+1}`,
          player1: "TBD",
          player2: "TBD",
          status: 'pending',
          nextMatchId: round < rounds-1 ? `round${round+2}-match${Math.floor(i/2)+1}` : undefined
        });
      }
      tournamentMatches.push(roundMatches);
    }
    
    setTournamentState({
      currentRound: 0,
      rounds: tournamentMatches,
      currentMatchIndex: 0
    });
    
    setStage('bracket');
  };

  // Find a match by ID in the tournament
  const findMatchById = (matchId: string, rounds: Match[][]): [number, number] => {
    for (let i = 0; i < rounds.length; i++) {
      for (let j = 0; j < rounds[i].length; j++) {
        if (rounds[i][j].id === matchId) {
          return [i, j];
        }
      }
    }
    return [-1, -1];
  };

  // Handle starting the next match
  const startNextMatch = () => {
    if (!tournamentState) return;
    
    const { currentRound, rounds, currentMatchIndex } = tournamentState;
    if (currentRound < rounds.length && currentMatchIndex < rounds[currentRound].length) {
      const match = rounds[currentRound][currentMatchIndex];
      setCurrentMatch(match);
      
      // Update match status
      const updatedRounds = [...rounds];
      updatedRounds[currentRound][currentMatchIndex].status = 'in-progress';
      setTournamentState({
        ...tournamentState,
        rounds: updatedRounds
      });
      
      setStage('playing');
    } else {
      // Tournament complete
      const finalMatch = rounds[rounds.length-1][0];
      setTournamentWinner(finalMatch.winner || "Unknown");
      setStage('results');
    }
  };

  // Handle match completion
  const handleMatchComplete = (winner: string) => {
    if (!tournamentState || !currentMatch) return;
    
    const { currentRound, rounds, currentMatchIndex } = tournamentState;
    
    // Update match with winner
    const updatedRounds = [...rounds];
    updatedRounds[currentRound][currentMatchIndex] = {
      ...currentMatch,
      winner,
      status: 'completed'
    };
    
    // Add winner to next match if exists
    if (currentMatch.nextMatchId) {
      const [nextRound, nextMatchIndex] = findMatchById(currentMatch.nextMatchId, rounds);
      if (nextRound !== -1) {
        const nextMatch = rounds[nextRound][nextMatchIndex];
        // Determine if this winner goes to player1 or player2 slot
        const isFirstWinner = currentMatchIndex % 2 === 0;
        updatedRounds[nextRound][nextMatchIndex] = {
          ...nextMatch,
          player1: isFirstWinner ? winner : nextMatch.player1,
          player2: !isFirstWinner ? winner : nextMatch.player2
        };
      }
    }
    
    // Move to next match
    const newIndex = currentMatchIndex + 1;
    if (newIndex >= rounds[currentRound].length) {
      // Move to next round
      if (currentRound + 1 >= rounds.length) {
        // Tournament complete
        setTournamentWinner(winner);
        setTournamentState({
          rounds: updatedRounds,
          currentRound: currentRound,
          currentMatchIndex: currentMatchIndex
        });
        setStage('results');
      } else {
        setTournamentState({
          rounds: updatedRounds,
          currentRound: currentRound + 1,
          currentMatchIndex: 0
        });
        setStage('bracket');
      }
    } else {
      setTournamentState({
        rounds: updatedRounds,
        currentRound,
        currentMatchIndex: newIndex
      });
      setStage('bracket');
    }
    
    setCurrentMatch(null);
  };

  // Render tournament bracket visualization
  const renderTournamentBracket = () => {
    if (!tournamentState) return null;
    
    return (
      <div className="tournament-bracket">
        {tournamentState.rounds.map((round, roundIndex) => (
          <div key={roundIndex} className="round">
            <h3 className="text-center font-semibold mb-2">
              Round {roundIndex + 1}
            </h3>
            <div className="matches flex flex-col gap-4">
              {round.map((match, matchIndex) => (
                <div 
                  key={match.id} 
                  className={`match p-3 border rounded ${
                    match.status === 'completed' ? 'bg-gray-100' : 
                    match.status === 'in-progress' ? 'bg-blue-100' : ''
                  }`}
                >
                  <div className="flex justify-between">
                    <span className={match.winner === match.player1 ? 'font-bold' : ''}>
                      {match.player1}
                    </span>
                    <span>vs</span>
                    <span className={match.winner === match.player2 ? 'font-bold' : ''}>
                      {match.player2}
                    </span>
                  </div>
                  {match.winner && (
                    <div className="text-center text-sm mt-1">
                      Winner: {match.winner}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Tournament Mode</h1>
      
      {/* Back button */}
      <Link to="/" className="absolute top-4 left-4">
        <button className="bg-gray-500 text-white py-1 px-3 rounded">
          ← Back to Menu
        </button>
      </Link>

      {/* Setup stage */}
      {stage === 'setup' && (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="text-lg">Choose Tournament Type:</label>
            <select
              className="bg-white p-2 rounded border w-full mt-2"
              value={tournamentType}
              onChange={(e) => {
                setTournamentType(e.target.value as TournamentType);
                setPlayers([]);
              }}
            >
              <option value="4player">4 Player</option>
              <option value="8player">8 Player</option>
            </select>
          </div>
          
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Players ({players.length}/{tournamentType[0]})</h2>
            <ul className="mb-2">
              {players.map((player, index) => (
                <li key={index} className="flex justify-between items-center my-1 py-1 border-b">
                  <span>{player}</span>
                  <button 
                    className="text-red-500 hover:text-red-700" 
                    onClick={() => removePlayer(player)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter player name"
                className="p-2 flex-grow border rounded"
                id="playerNameInput"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addPlayer((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
              <button 
                className="bg-blue-500 text-white px-3 rounded"
                onClick={() => {
                  const input = document.getElementById('playerNameInput') as HTMLInputElement;
                  addPlayer(input.value);
                  input.value = '';
                }}
              >
                Add
              </button>
            </div>
          </div>
          
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded font-bold"
            onClick={createTournament}
            disabled={players.length !== parseInt(tournamentType[0])}
          >
            Start Tournament
          </button>
        </div>
      )}

      {/* Bracket view stage */}
      {stage === 'bracket' && tournamentState && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Tournament Bracket</h2>
          
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-8 min-w-max">
              {renderTournamentBracket()}
            </div>
          </div>
          
          <div className="text-center mt-6">
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
              onClick={startNextMatch}
            >
              Start Next Match
            </button>
          </div>
        </div>
      )}
      
      {/* Playing stage */}
      {stage === 'playing' && currentMatch && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {currentMatch.player1} vs {currentMatch.player2}
          </h2>
          
          <div className="my-6">
            <Pong 
              player1={currentMatch.player1}
              player2={currentMatch.player2}
              onGameEnd={handleMatchComplete}
            />
          </div>
        </div>
      )}
      
      {/* Results stage */}
      {stage === 'results' && (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold mb-6">Tournament Complete!</h2>
          <div className="py-6">
            <div className="text-xl mb-2">Winner:</div>
            <div className="text-4xl font-bold text-green-600">{tournamentWinner}</div>
          </div>
          
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg mt-6"
            onClick={() => {
              setStage('setup');
              setPlayers([]);
              setTournamentState(null);
              setCurrentMatch(null);
              setTournamentWinner(null);
            }}
          >
            New Tournament
          </button>
        </div>
      )}
    </div>
  );
};

export default TournamentPage;