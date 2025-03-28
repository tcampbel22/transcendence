import React from "react";
import { Routes, Route } from "react-router-dom";
import login from "./components/Login";
import Login from "./components/Login";
import Register from "./components/Register";

const App: React.FC = () => {
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
      </div>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
};


export default App;