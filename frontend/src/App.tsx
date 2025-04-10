import React, { useState }  from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
// import Pong from "./Pong";
import Button from "./components/ButtonGroup";
import OneVsOnePage from "./pages/OneVsOnePage";
import TournamentPage from "./pages/TournamentPage";
import AppRoutes from "./components/AppRoutes";


const App: React.FC = () => {
  

    return (
	<div 	className="min-h-screen text-center"
			style={{
				backgroundImage: 'url("/images/epic_background.png")',
				
			}}
	>
		<AppRoutes />
	</div>
    );
};


export default App;
{/* <Route path="/register" element={<Register />} />
<Route path="/play/1v1" element={<OneVsOnePage />} />
<Route path="/play/Tournament" element={<TournamentPage />} /> */}