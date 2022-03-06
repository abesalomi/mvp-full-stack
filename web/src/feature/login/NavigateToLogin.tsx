import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/Auth';


const NavigateToLogin = () => {

  const {loggedIn} = useAuth();
  const location = useLocation();

  return loggedIn || location.pathname.startsWith('/auth')
    ? null
    : <Navigate to={'/auth/login'}/>;
}


export default NavigateToLogin;
