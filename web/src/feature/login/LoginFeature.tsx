import LoginForm from '../../components/auth/LoginForm';
import { LoginCredentials } from '../../model/login';
import { useAuth } from '../../auth/Auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginFeature = () => {

  const {login, loggedIn, loginError} = useAuth();
  const navigate = useNavigate();

  const handleLogin = (credentials: LoginCredentials) => {
    login(credentials)
  }

  useEffect(() => {
    if (loggedIn) {
      navigate('/')
    }
  }, [loggedIn])

  return (
    <LoginForm error={loginError} onLogin={handleLogin}/>
  )
}

export default LoginFeature;
