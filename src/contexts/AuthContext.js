/* eslint-disable react/prop-types */
import React from 'react';
import { createContext, useEffect, useReducer, useState } from 'react';
import { authReducer } from '../reducers/authReducer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false
  });

  // console.log('AuthContextProvider', state, auth)
  useEffect(() => {
    // console.log('onAuthStateChanged');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'AUTH_IS_READY', payload: user });
      setLoading(false);
    });
    // console.log('AuthContextProvider');
    return unsubscribe;
  }, []);
  // console.log('AuthContextProvider', state);

  return (
    <AuthContext.Provider value={{ ...state, loading, dispatch }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
