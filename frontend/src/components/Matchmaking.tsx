import React, { useState } from 'react';

// Define the types of tournaments
type TournamentType = '2player' | '4player' | '8player';

interface Match {
  player1: string;
  player2: string;
  winner?: string;
}

const TournamentModal: React.FC<{ isOpen: boolean; closeModal: () => void }> = ({ isOpen, closeModal }) => {
  const [tournamentType, setTournamentType] = useState<TournamentType>('2player');
  const [players, setPlayers] = useState<string[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  // Function to handle player selection
  const addPlayer = (playerName: string) => {
	if (!parsePlayerName(playerName))
		return ;
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
  //Remove player from players array
  const removePlayer = (playerName: string) => {
	setPlayers(players.filter(player => player !== playerName));
  }

  // Function to handle the creation of random matches
  const createRandomMatches = () => {
    let shuffledPlayers = [...players];
    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
    }

    const newMatches: Match[] = [];
    for (let i = 0; i < shuffledPlayers.length; i += 2) {
      newMatches.push({
        player1: shuffledPlayers[i],
        player2: shuffledPlayers[i + 1],
      });
    }
    setMatches(newMatches);
  };

  // Function to handle tournament setup
  const handleTournamentStart = () => {
    if (players.length == parseInt(tournamentType[0])) {
      createRandomMatches();
    } else {
      alert(`Please add at least ${tournamentType[0]} players.`);
    }
  };

  // Tournament type selection handler
  const handleTournamentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTournamentType(event.target.value as TournamentType);
    setPlayers([]); // Reset players when tournament type changes
    setMatches([]); // Reset matches
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
      <div className="modal-content bg-white p-6 rounded shadow-lg">
        <button className="absolute top-2 right-2 font-bold" onClick={closeModal}>X</button>
        <h1 className="text-xl font-bold text-center mb-4">Tournament</h1>

        <div className="mb-4">
          <label className="text-lg">Choose Tournament Type:</label>
          <select
            className="bg-white p-2 rounded border"
            value={tournamentType}
            onChange={handleTournamentChange}
          >
            <option value="2player">2 Player</option>
            <option value="4player">4 Player</option>
            <option value="8player">8 Player</option>
          </select>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Players</h2>
          <ul>
            {players.map((player, index) => (
              <li key={index} className='flex justify-between items-center'>
			  <span>{player}</span>
			  <button className='font-bold text-red-500 hover:text-red-200' onClick={() => removePlayer(player)}>Remove</button>
			  </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Enter player name"
            className="mb-2 p-2 text-black rounded border"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addPlayer((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
        </div>

        <button
          className="w-full bg-blue-500 text-black p-2 rounded"
          onClick={handleTournamentStart}
        >
          Start Tournament
        </button>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Matches</h2>
          {matches.length > 0 && (
            <ul>
              {matches.map((match, index) => (
                <li key={index}>
                  {match.player1} vs {match.player2}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const TournamentButton: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <button
        className="bg-green-500 text-white p-2 rounded-lg font-bold"
        onClick={openModal}
      >
        Tournament
      </button>

      <TournamentModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default TournamentButton;
