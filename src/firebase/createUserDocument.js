import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where
} from 'firebase/firestore';
import { db } from './config';

export const createUserDocument = async (user) => {
  const q = query(collection(db, 'users'), where('uid', '==', user.uid));
  const { docs } = await getDocs(q);

  if (docs.length === 0) {
    const { uid, displayName, email, photoURL, reloadUserInfo } = user;

    const docRef = doc(db, `users/${uid}`);
    await setDoc(docRef, {
      displayName,
      email,
      photoURL,
      username: reloadUserInfo.screenName,
      smart_contracts: [],
      createdAt: serverTimestamp()
    });
  }
};
