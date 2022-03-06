import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { setBearer } from '../services/http';
import { httpGetUser, httpLogin } from '../services/auth';
import { LoginCredentials } from '../model/login';
import { AuthUser } from '../model/auth';

interface AuthContextType {
  user?: AuthUser;
  loading: boolean;
  token?: string;
  loginError?: string;
  loggedIn?: boolean;
  login: (credentials: LoginCredentials, callback?: VoidFunction) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  loading: true,
  token: undefined,
  loginError: undefined,
  login: () => {
    console.error('unimplemented!');
  },
  logout: () => {
    console.error('unimplemented!');
  },
});

export const AuthProvider = ({children}: { children?: ReactNode | undefined }) => {

  const [loginError, setLoginError] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<AuthUser | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken, clearToken] = useLocalStorage<string | undefined>('accessToken');

  const doLogin = (credentials: LoginCredentials, callback?: VoidFunction) => {
    httpLogin(credentials).then(({access_token: accessToken}) => {
      setToken(accessToken);
      callback?.();
    }).catch((e) => {
      clearToken();
      setLoginError(e.response.data.message);
    });
  };

  useEffect(() => {
    setLoading(true);
    setBearer(token);
    if (!token) {
      doLogout();
      return;
    }
    httpGetUser().then((user) => {
      setUser(user);
      setLoading(false);
    }).catch(() => {
      doLogout();
    });
  }, [token]);

  const doLogout = () => {
    setLoading(false);
    clearToken();
    setUser(undefined);
    setToken(undefined);
  };

  const value = {
    login: doLogin,
    logout: doLogout,
    loginError,
    user,
    token,
    loggedIn: !!token,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );

};

export const useAuth = () => useContext(AuthContext);
