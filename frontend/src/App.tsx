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

  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const buttons = ["1v1", "Tournament"]

    return (
	<div>
		<AppRoutes />
		<Button buttons={buttons}/>
	</div>
    );
};


export default App;
{/* <Route path="/register" element={<Register />} />
<Route path="/play/1v1" element={<OneVsOnePage />} />
<Route path="/play/Tournament" element={<TournamentPage />} /> */}