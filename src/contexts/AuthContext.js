/* eslint-disable react/prop-types */
import React from 'react';
<<<<<<< HEAD
import { createContext, useEffect, useReducer } from 'react';
=======
import { createContext, useEffect, useReducer, useState } from 'react';
>>>>>>> dev
import { authReducer } from '../reducers/authReducer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
<<<<<<< HEAD
=======
  const [loading, setLoading] = useState(true);
>>>>>>> dev
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false
  });

<<<<<<< HEAD
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'AUTH_IS_READY', payload: user });
    });
    console.log('AuthContextProvider');
=======
  // console.log('AuthContextProvider', state, auth)
  useEffect(() => {
    // console.log('onAuthStateChanged');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'AUTH_IS_READY', payload: user });
      setLoading(false);
    });
    // console.log('AuthContextProvider');
>>>>>>> dev
    return unsubscribe;
  }, []);
  // console.log('AuthContextProvider', state);

<<<<<<< HEAD
  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
=======
  return (
    <AuthContext.Provider value={{ ...state, loading, dispatch }}>{children}</AuthContext.Provider>
  );
>>>>>>> dev
};

export default AuthContextProvider;
