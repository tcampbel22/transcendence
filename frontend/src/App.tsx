import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import React, { use, useEffect } from "react";
import AppRoutes from "./components/routes/AppRoutes";
import useAxiosInterceptor from "./hooks/useAxiosInterceptor";
import './index.css'

const App: React.FC = () => {
  useAxiosInterceptor();

  return (
    <div
      className="w-full min-h-screen bg-center min-w-[900px]"
      style={{
        backgroundImage: 'url("/images/epic_background.webp")',
      }}
    >
      <AppRoutes />
    </div>
  );
};

export default App;
