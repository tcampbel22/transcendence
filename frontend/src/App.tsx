import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import AppRoutes from "./components/routes/AppRoutes";
import useAxiosInterceptor from "./hooks/useAxiosInterceptor";

const App: React.FC = () => {
    useAxiosInterceptor(); 
  
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
