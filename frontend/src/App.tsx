import React, { useState }  from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Pong from "./Pong";
import Matchmaking from "./components/Matchmaking";


const App: React.FC = () => {
	const [scores, setScores] = useState({ left: 0, right: 0 });

    return (
      <Routes>
        <Route path="/" element={
      <div className="flex flex-col items-center gap-4 my-4">
        <h1>Welcome to Pong</h1>
        <p>Choose if you want to play 1v1 or tournament</p>
			<Matchmaking />
			<button className="bg-red-500 hover:bg-red-200 text-white font-bold py-2 px-2 rounded-lg shadow-md transition">1v1</button>
			<button className="bg-green-500 hover:bg-green-200 text-white font-bold py-2 px-2 rounded-lg shadow-md transition">1vAI</button>
			<Login />
        	<h2>Score: {scores.left} - {scores.right}</h2>
        <Pong onScoreChange={(left, right) => setScores({ left, right })} />
      </div>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
};


export default App;