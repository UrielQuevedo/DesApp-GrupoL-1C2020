/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { getUserById } from "../Service/Api";
import { Redirect } from "react-router";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [ user, setUser ] = useState({});
  const { authState, setAuth } = useContext(AuthContext);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if(authState.isAuth) {
      setLoading(true);
      getUserById(localStorage.id)
        .then(userData => {
          setUser(userData)
          setLoading(false);
        })
        .catch(() => {
          setAuth({ type:'LOG_OUT' });
        });
    }
  }, []);

  const isMyLocationNow = window.location.pathname === '/mylocation';

  const handlerComponent = () => {
    if(authState.isAuth && !user.location && !isMyLocationNow) return <Redirect to='/mylocation' />
    if(authState.isAuth && user.location && isMyLocationNow) return <Redirect to='/' />
    return children;
  }

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      { !loading && handlerComponent() }
    </UserContext.Provider>
  );
}

export default UserProvider;