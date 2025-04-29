import { useLocation } from 'react-router-dom';

export const userNameFromState = () => {
	const location = useLocation();
  	const username = location.state;
	
	return username;
}