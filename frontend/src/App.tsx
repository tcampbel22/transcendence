import React from "react";
import AppRoutes from "./components/routes/AppRoutes";
import useAxiosInterceptor from "./hooks/useAxiosInterceptor";
import { TitleCard } from "./components/utils/TitleCard";

const App: React.FC = () => {
  useAxiosInterceptor();

  return (
    <div className="max-w-screen h-full bg-gray-900 font-mono text-amber-200 overflow-auto">
		{/* <TitleCard image="/images/pong_12.svg"/> */}
      	<AppRoutes />
    </div>
  );
};

export default App;
