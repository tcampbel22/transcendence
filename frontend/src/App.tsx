import React, { useState }  from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Tournament from "./components/Tournament";
import OneVsOnePage from "./pages/OneVsOnePage";
import TournamentPage from "./pages/TournamentPage";


const App: React.FC = () => {
	

    return (
      <Routes>
        <Route path="/" element={
      <div className="flex flex-col items-center gap-4 my-4">
        <h1>Welcome to Pong</h1>
        <p>Choose if you want to play 1v1 or tournament</p>
			<Link to="/play/1v1">
            <button className="bg-red-500 hover:bg-red-200 text-white font-bold py-2 px-2 rounded-lg shadow-md transition">1v1</button>
          </Link>
		  <Link to="/play/Tournament">
			<button className="bg-green-500 hover:bg-green-200 text-white font-bold py-2 px-2 rounded-lg shadow-md transition">Tournament</button>
		  </Link>
			<Login />
      </div>} />
        <Route path="/register" element={<Register />} />
		<Route path="/play/1v1" element={<OneVsOnePage />} />
		<Route path="/play/Tournament" element={<TournamentPage />} />
      </Routes>
    );
};


export default App;