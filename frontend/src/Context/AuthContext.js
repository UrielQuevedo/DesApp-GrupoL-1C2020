import React, { useState } from 'react';
import { createContext } from 'react';
import { useEffect } from 'react';
import { Redirect } from 'react-router';

const AuthTypes = {
  AUTH: { isAuth: true },
  NOT_AUTH: { isAuth: false }
}

const removeAuth = () => {
  localStorage.removeItem('id');
  sessionStorage.removeItem('id');
}

const setAuth = (isRemember, id) => {
  if (isRemember) {
    localStorage.id = id;
    return;
  }
  sessionStorage.id = id;
}

export const reducer = async (authState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      authState(AuthTypes.AUTH);
      setAuth(action.isRemember, action.id);
      break;
    case 'LOG_OUT':
      authState(AuthTypes.NOT_AUTH);
      removeAuth();
      break;
    default:
      break;
  }
}

const checkAuth = async (setAuthState) => {
  //TODO Verificar que el id / token (cuando se implemente) exista;
  if (localStorage.id || sessionStorage.id || localStorage.getItem('authorization')) {
    setAuthState(AuthTypes.AUTH);
    return;
  }
  setAuthState(AuthTypes.NOT_AUTH);
}

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const pathname = window.location.pathname;
  const toCheckPathnames = ['/login', '/register'];
  const [authState, setAuth] = useAuth();

  const handlerComponent = () => {
    if(authState.isAuth && toCheckPathnames.includes(pathname)) return <Redirect to='/mylocation' />;
    if(!authState.isAuth && !toCheckPathnames.includes(pathname)) return <Redirect to='/login' />;
    return children;
  }

  if(!authState) return null;

  return (
    <AuthContext.Provider value={{ authState, setAuth }}>
      { handlerComponent() }
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const [ authState, setAuthState ] = useState(null);

  useEffect(() => {
    checkAuth(setAuthState);
  }, []);

  const setAuth = (action) => reducer(setAuthState, action);

  return [authState, setAuth];
}

export default AuthProvider;