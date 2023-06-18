<<<<<<< HEAD
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
=======
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
>>>>>>> dev
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth();
<<<<<<< HEAD

export { auth };
=======
// Initialize Firebase Firestore
const db = getFirestore();

// Initialize Firebase Realtime Database
const rtDatabase = getDatabase();

export { auth, db, rtDatabase };
>>>>>>> dev
