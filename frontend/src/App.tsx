import React from "react";
import AppRoutes from "./components/routes/AppRoutes";
import useAxiosInterceptor from "./hooks/useAxiosInterceptor";

const App: React.FC = () => {
  useAxiosInterceptor();

  return (
    <div
      className="max-w-screen bg-gray-150"
    >
      <AppRoutes />
    </div>
  );
};

export default App;
