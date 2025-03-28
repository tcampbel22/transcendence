import React, { useState }  from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Pong from "./Pong";

const App: React.FC = () => {

  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
    return (
      <Routes>
        <Route path="/" element={
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to Pong</h1>
        <p>Choose if you want to play 1v1 or tournament</p>
        <button>1v1</button>
        <button>versus AI</button>
        <button>Tournament</button>
        <Login />
        <h2>Score: {leftScore} - {rightScore}</h2>
        <Pong setLeftScore={setLeftScore} setRightScore={setRightScore} />
      </div>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
};


export default App;