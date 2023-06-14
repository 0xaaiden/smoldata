import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: 'AIzaSyDTRY5WPQm0v26OuJDvkZ-FwDiPMtoIg_U',
  authDomain: 'indexsc-80164.firebaseapp.com',
  projectId: 'indexsc-80164',
  storageBucket: 'indexsc-80164.appspot.com',
  messagingSenderId: '450893406130',
  appId: '1:450893406130:web:5326cc19258ad6e83f8eab',
  measurementId: 'G-NN253G450K',
  databaseURL: "https://indexsc-80164-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth();
// Initialize Firebase Firestore
const db = getFirestore();

// Initialize Firebase Realtime Database
const rtDatabase = getDatabase();

export { auth, db, rtDatabase };
