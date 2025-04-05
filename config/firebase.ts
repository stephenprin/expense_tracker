// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfiguration = {
  apiKey: process.env.EXPO_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_AUTH_DOMAIN,
  projectId: process.env.EXPO_PROJECT_ID,
  storageBucket: process.env.EXPO_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfiguration);

//auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

//db
export const firestore = getFirestore(app);
