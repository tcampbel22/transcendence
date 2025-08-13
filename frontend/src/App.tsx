import React, { useEffect, useState } from "react";
import AppRoutes from "./components/routes/AppRoutes";
import useAxiosInterceptor from "./hooks/useAxiosInterceptor";
import { Loading } from "./Loading";
import { Error } from "./components/utils/Error";
import useServicePinger from "./hooks/useServicePinger";

const isProduction = process.env.NODE_ENV === 'production'

const App: React.FC = () => {
  useAxiosInterceptor();
  const [ready, setReady] = useState<boolean>(true);
  if (isProduction) { 
	let retries = 0;
	setReady(false)
	const services = [
		"https://tc-user-service.fly.dev/api/health",
		"https://tc-game-service.fly.dev/api/health"
	]
	useServicePinger(services);
	
	useEffect(() => {
		retries++
		const checkServices = async () => {
		try {
			const userService = fetch(services[0]);
			const gameService = fetch(services[1]);
			await Promise.all([userService, gameService]);
			setReady(true);
		} catch (err) {
			console.error("Service check failed", err);
			setTimeout(checkServices, 3000); // retry after 3s
		}
		};

		checkServices();
	}, []);
	if (retries > 5)
		return <Error/>
	}
  return  ready ? (
    <div className="max-w-screen h-screen bg-gray-900 font-mono text-amber-200 overflow-auto">
      	<AppRoutes />
    </div> ) : (
		<div className="max-w-screen h-screen bg-gray-900 font-mono text-amber-200 overflow-auto">
			<Loading/>
		</div>
	)
};

export default App;
