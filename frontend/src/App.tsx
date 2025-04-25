import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
// import Pong from "./Pong";
import Button from "./components/ButtonGroup";
import OneVsOnePage from "./pages/OneVsOnePage";
import TournamentPage from "./pages/TournamentPage";
import AppRoutes from "./components/AppRoutes";

const App: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('authenticated') === 'true') {
            navigate('/hub');
        }
    }, [location, navigate]);

    return (
        <div 
            className="min-h-screen text-center"
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