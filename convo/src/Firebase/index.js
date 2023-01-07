// Firebase imports
import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyAKgsABJl5BaVsJxW-Jt1vwsqNt8URkMOc',
  authDomain: 'convo-messaging-platform.firebaseapp.com',
  projectId: 'convo-messaging-platform',
  storageBucket: 'convo-messaging-platform.appspot.com',
  messagingSenderId: '923976286987',
  appId: '1:923976286987:web:c7819820592ab13bd7980e',
  measurementId: 'G-1LPX4YZSS0'
});

// Get database
export const firebaseDatabase = getFirestore(firebaseApp);
export const auth = getAuth();

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const githubProvider = new GithubAuthProvider();
githubProvider.setCustomParameters({ prompt: 'select_account' });
