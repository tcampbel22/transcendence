import React, { useState }  from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Pong from "./Pong";
import Button from "./components/ButtonGroup";
import OneVsOnePage from "./pages/OneVsOnePage";
import TournamentPage from "./pages/TournamentPage";


const App: React.FC = () => {

  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const buttons = ["1v1", "versus AI", "Tournament"]

    return (
      <Routes>
        <Route path="/" element={
      <div className="min-h-screen text-center bg-gradient-moving bg-[length:200%_200%] animate-bg-pan">
        <h1 className="font-bold text-5xl">Welcome to Pong</h1>
        <Login />
        {/* need to move these some where else, could use navigate(); after a succesfull login */}
        {/* <Button buttons={buttons}/> */}
        {/* <h2>Score: {leftScore} - {rightScore}</h2> */}
        {/* <Pong setLeftScore={setLeftScore} setRightScore={setRightScore} /> */}
      </div>} />
		
        <Route path="/register" element={<Register />} />
		<Route path="/play/1v1" element={<OneVsOnePage />} />
		<Route path="/play/Tournament" element={<TournamentPage />} />
      </Routes>
    );
};


export default App;