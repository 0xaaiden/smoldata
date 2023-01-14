/* eslint-disable react/prop-types */
import React from 'react';
import { createContext, useEffect, useReducer } from 'react';
import { authReducer } from '../reducers/authReducer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'AUTH_IS_READY', payload: user });
    });
    console.log('AuthContextProvider');
    return unsubscribe;
  }, []);
  // console.log('AuthContextProvider', state);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
