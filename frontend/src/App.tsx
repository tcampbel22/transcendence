import React, { useState }  from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Pong from "./components/Pong";
import { Link } from "react-router-dom";

const App: React.FC = () => {

  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const navigate = useNavigate();

  const handle1v1Click = () => {
    navigate("/1v1");
  };

    return (
      <Routes>
        <Route path="/" element={
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to Pong</h1>
        <p>Choose if you want to play 1v1 or tournament</p>
        <button onClick ={handle1v1Click}>1v1</button>
        <button>versus AI</button>
        <button>Tournament</button>
        <Login />
      </div>} />
        <Route path="/register" element={<Register />} />
        <Route path="/1v1" element={<Pong setLeftScore={setLeftScore} setRightScore={setRightScore} />} />
      </Routes>
    );
};


export default App;