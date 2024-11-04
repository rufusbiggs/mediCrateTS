// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC0fzJ2f0uBDXLUkPlw4ezLZ-gjZO3UHPQ",
    authDomain: "pilltrack-132e8.firebaseapp.com",
    databaseURL: "https://pilltrack-132e8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pilltrack-132e8",
    storageBucket: "pilltrack-132e8.appspot.com",
    messagingSenderId: "504542276669",
    appId: "1:504542276669:web:1f3c3c78b999e7601fce54",
    measurementId: "G-87H97WZWT0"
  };
  
  const app = initializeApp(firebaseConfig);

  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage) // Set persistence to AsyncStorage
});

export { app, auth };
