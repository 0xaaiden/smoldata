import { db } from './config';
import { doc, getDoc } from 'firebase/firestore';

export const fetchUser = async (uid) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    // console.log('Document data:', docSnap.data());
    return docSnap.data();
  } else {
    // console.log('No such document!');
  }
};
