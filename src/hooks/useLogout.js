import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

export const useLogout = () => {
  const { dispatch } = useContext(AuthContext);

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: 'LOGOUT' });
      console.log('user logged out');
    } catch (error) {
      console.log(error.message);
    }
  };

  return { logout };
};
