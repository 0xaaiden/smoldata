import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { createUserDocument } from "../firebase/createUserDocument";

export const useLogin = () => {
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const provider = new GithubAuthProvider();
  const { dispatch } = useContext(AuthContext);

  const login = async () => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        throw new Error('Could not complete signup');
      }

      const user = res.user;
      await createUserDocument(user);
      dispatch({ type: "LOGIN", payload: user });
      // console.log(user);
      setIsPending(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setIsPending(false);
    }
  };

  return { login, error, isPending };
};
