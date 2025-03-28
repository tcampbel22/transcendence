import React, { useState }  from "react";
import Pong from "./Pong";

const App: React.FC = () => {
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Pong</h1>
      <h2>Score: {leftScore} - {rightScore}</h2>
      <Pong setLeftScore={setLeftScore} setRightScore={setRightScore} />
    </div>
  );
};


export default App;