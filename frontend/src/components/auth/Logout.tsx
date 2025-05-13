import api from '../../lib/api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
	const API_URL = import.meta.env.VITE_API_USER;
	const navigate = useNavigate();

	useEffect(() => {
		const performLogout = async () => {
			try {
				await api.get(`${API_URL}/logout`, { withCredentials: true });
				// Optionally clear frontend state (user context, etc.)
				navigate('/'); // Redirect to front page after logout
			} catch (error: any) {
				console.error("Logout failed:", error.response?.data || error.message);
				navigate('/'); // Redirect anyway
			}
		};

		performLogout();
	}, []);

	return (
		<div className="flex justify-center items-center min-h-screen">
			<p className="text-lg font-semibold">Logging you out...</p>
		</div>
	);
};

export default Logout;
