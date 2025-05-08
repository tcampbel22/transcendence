import { useLocation } from 'react-router-dom';

export const userIdFromState = () => {
	const location = useLocation();
  	const userId = location.state;
	
	return userId;
};