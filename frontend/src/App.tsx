import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import AppRoutes from "./components/routes/AppRoutes";
import useAxiosInterceptor from "./hooks/useAxiosInterceptor";
import './index.css'

const App: React.FC = () => {
  return (
    <div
      className="min-h-screen text-center"
      style={{
        backgroundImage: 'url("/images/epic_background.webp")',
      }}
    >
      <AppRoutes />
    </div>
  );
};

export default App;
