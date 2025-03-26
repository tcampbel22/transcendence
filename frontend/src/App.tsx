import React from "react";

const App: React.FC = () => {
    return (
        <div>
            {/* Header */}
            <h2>Welcome to the Pong game!</h2>

            {/* Login Form */}
            <LoginForm />
        </div>
    );
};

const LoginForm: React.FC = () => {
    return (
        <form
            style={{
                position: "absolute",
                right: "50px",
                top: "50px",
            }}
        >
            <input
                type="text"
                placeholder="Username"
                style={{ marginRight: "10px" }}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default App;