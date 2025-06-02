import { useLocation } from 'react-router-dom';

export const status2FAFromState = () => {
    const location = useLocation();
    const { is2faEnabled } = location.state || {};
    return is2faEnabled;
}