// Firebase imports
import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyD3ejYmxMXMvqtntLFoeChI9AP_c3QLuxQ',
  authDomain: 'spotter-game.firebaseapp.com',
  projectId: 'spotter-game',
  storageBucket: 'spotter-game.appspot.com',
  messagingSenderId: '161452202997',
  appId: '1:161452202997:web:2fa31780b80877900e1ebc',
  measurementId: 'G-5GK8M6D173'
});

// Get database
export const firebaseDatabase = getFirestore(firebaseApp);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const githubProvider = new GithubAuthProvider();
githubProvider.setCustomParameters({ prompt: 'select_account' });