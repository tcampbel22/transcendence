import { useEffect, useState } from "react";
import api from "../lib/api";

const BASE_URL = import.meta.env.VITE_API_HEALTH

export const useLoadingScreenToggle = (first = 50000, interval = 10000, maxRetries = 10) => {
	const [isReady, setIsReady] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<boolean>(false)
	useEffect(() => {
		let retries = 0;
		let cancelled = false;

		const healthCheck = async () => {
			try {
				const res = await api.get(BASE_URL)
				if (res.status === 200) {
					if (!cancelled) {
						setIsReady(true);
						setLoading(false);
					}
				} else 
					throw new Error(`Status: ${res.status}`)
			} catch (err: any) {
				if (retries === 1)
					setTimeout(healthCheck, first)
				else if (retries >= maxRetries) {
					setError(true);
					setLoading(false);
				} else {
					setTimeout(healthCheck, interval);
				}
				retries++;
				console.error(`Services are currently unavailable: ${err.message}`)
			}
		};
		healthCheck();

		return () => {
			cancelled = true;
		}
	}, [interval, isReady, error])

	return { loading, error, isReady }
}