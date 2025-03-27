import React from "react";

const App: React.FC = () => {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to Pong</h1>
        <p>Choose if you want to play 1v1 or tournament</p>
        <button>1v1</button>
        <button>versus AI</button>
        <button>Tournament</button>
      </div>
    );
};


export default App;