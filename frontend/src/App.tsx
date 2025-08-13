import React, { useEffect, useRef, useState } from "react";
import AppRoutes from "./components/routes/AppRoutes";
import useAxiosInterceptor from "./hooks/useAxiosInterceptor";
import { Loading } from "./Loading";
import { Error } from "./components/utils/Error";
import useServicePinger from "./hooks/useServicePinger";

const isProduction = process.env.NODE_ENV === 'production'

const App: React.FC = () => {
  useAxiosInterceptor();
  const [ready, setReady] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const retries = useRef<number>(0);

  const services = [
    "https://tc-user-service.fly.dev/api/health",
    "https://tc-game-service.fly.dev/api/health",
  ];

  useServicePinger(services);

  useEffect(() => {
    const checkServices = async () => {
      try {
        const userService = fetch(services[0]);
        const gameService = fetch(services[1]);
        await Promise.all([userService, gameService]);
        setReady(true);
      } catch (err) {
        retries.current += 1;
        console.error("Service check failed", err);

        if (retries.current > 5) {
          setError(true);
        } else {
          setTimeout(checkServices, 3000);
        }
      }
    };

    checkServices();

    return () => {
      retries.current = 0;
    };
  }, [services]);

  if (error) return <Error />;

  return ready ? (
    <div className="max-w-screen h-screen bg-gray-900 font-mono text-amber-200 overflow-auto">
      <AppRoutes />
    </div>
  ) : (
    <div className="max-w-screen h-screen bg-gray-900 font-mono text-amber-200 overflow-auto">
      <Loading />
    </div>
  );
};

export default App;
