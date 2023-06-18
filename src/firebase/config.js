import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDTRY5WPQm0v26OuJDvkZ-FwDiPMtoIg_U',
  authDomain: 'indexsc-80164.firebaseapp.com',
  projectId: 'indexsc-80164',
  storageBucket: 'indexsc-80164.appspot.com',
  messagingSenderId: '450893406130',
  appId: '1:450893406130:web:5326cc19258ad6e83f8eab',
  measurementId: 'G-NN253G450K'
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth();

export { auth };
