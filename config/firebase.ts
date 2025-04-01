// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfiguration = {
  apiKey: "AIzaSyBREBCt6PyHR5c5jZ_KlztvKYgh2H-wtRQ",
  authDomain: "expense-tracker-dbffd.firebaseapp.com",
  projectId: "expense-tracker-dbffd",
  storageBucket: "expense-tracker-dbffd.firebasestorage.app",
  messagingSenderId: "834995526172",
  appId: "1:834995526172:web:8efbea54450e28493fddd9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfiguration);

//auth
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

//db
export const firestore = getFirestore(app);