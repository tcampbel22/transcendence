import React, { useEffect, useState } from "react";
import AppRoutes from "./components/routes/AppRoutes";
import useAxiosInterceptor from "./hooks/useAxiosInterceptor";
import { Loading } from "./Loading";

const App: React.FC = () => {
  useAxiosInterceptor();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkServices = async () => {
      try {
        const userService = fetch("https://tc-user-service.fly.dev/api/health");
        const gameService = fetch("https://tc-game-service.fly.dev/api/health");
        await Promise.all([userService, gameService]);
        setReady(true);
      } catch (err) {
        console.error("Service check failed", err);
        setTimeout(checkServices, 3000); // retry after 3s
      }
    };

    checkServices();
  }, []);

  return  ready ? (
    <div className="max-w-screen h-screen bg-gray-900 font-mono text-amber-200 overflow-auto">
      	<AppRoutes />
    </div> ) : (
		<Loading/>
	)
};

export default App;
