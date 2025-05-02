import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import AppRoutes from "./components/routes/AppRoutes";

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
