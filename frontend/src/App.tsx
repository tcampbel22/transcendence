import React from "react";
import Matchmaking from "./components/Matchmaking";

const App: React.FC = () => {
    return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
		<h1 className="text-3xl font-bold mb-4">Welcome to Pong</h1>
		<Matchmaking/>
	  </div>
      );
};


export default App;