import React from "react";
import AppRoutes from "./components/routes/AppRoutes";
import useAxiosInterceptor from "./hooks/useAxiosInterceptor";

const App: React.FC = () => {
  useAxiosInterceptor();

  return (
    <div
      className="max-w-screen h-full bg-gray-900 font-mono text-amber-200 overflow-auto"
    >
      <AppRoutes />
    </div>
  );
};

export default App;
