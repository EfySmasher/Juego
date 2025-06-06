import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { Platform } from "react-native"; // 👈 Importamos Platform
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDb8AGfmU5XRZlI6WOHB74xEHjqJB8-XAI",
  authDomain: "jumping-cat-fe091.firebaseapp.com",
  projectId: "jumping-cat-fe091",
  storageBucket: "jumping-cat-fe091.appspot.com",
  messagingSenderId: "322451779842",
  appId: "1:322451779842:web:ccaf73ae09a8b5f32b521b",
  measurementId: "G-5M48PT0956",
};

const app = initializeApp(firebaseConfig);

// 🔁 Usa persistencia solo en móvil
let auth;

if (Platform.OS === 'web') {
  auth = getAuth(app); // web no soporta AsyncStorage
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { auth };
export const db = getFirestore(app);
export const storage = getStorage(app);
