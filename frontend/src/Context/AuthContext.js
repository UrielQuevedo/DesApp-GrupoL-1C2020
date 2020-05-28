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
      window.location.href = '/';
      break;
    case 'LOG_OUT':
      authState(AuthTypes.NOT_AUTH);
      removeAuth();
      window.location.href = '/login';
      break;
    default:
      break;
  }
}

const checkAuth = async (setAuthState) => {
  if (localStorage.id || sessionStorage.id) {
    setAuthState(AuthTypes.AUTH);
    return;
  }
  setAuthState(AuthTypes.NOT_AUTH);
}

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [ authState, setAuthState ] = useState({});
  const pathname = window.location.pathname;
  const toCheckPathnames = ['/login', '/register'];

  useEffect(() => {
    checkAuth(setAuthState);
  }, []);

  const setAuth = (action) => reducer(setAuthState, action);

  const handlerComponent = () => {
    if (authState.isAuth && toCheckPathnames.includes(pathname)) {
      return <Redirect to='/' />;
    }
    if (!authState.isAuth && !toCheckPathnames.includes(pathname)) {
      return <Redirect to='/login' />;
    }
    return children;
  }

  return (
    <AuthContext.Provider value={{ authState: authState, setAuth: setAuth }}>
      { handlerComponent() }
    </AuthContext.Provider>
  );

}

export default AuthProvider;