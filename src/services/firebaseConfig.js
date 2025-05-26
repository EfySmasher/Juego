// src/services/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ➡️ esto es para las imágenes

const firebaseConfig = {
  apiKey: "AIzaSyDb8AGfmU5XRZlI6WOHB74xEHjqJB8-XAI",
  authDomain: "jumping-cat-fe091.firebaseapp.com",
  projectId: "jumping-cat-fe091",
  storageBucket: "jumping-cat-fe091.appspot.com", // ✅ corregido aquí
  messagingSenderId: "322451779842",
  appId: "1:322451779842:web:ccaf73ae09a8b5f32b521b",
  measurementId: "G-5M48PT0956"
};

// Inicializamos la app
const app = initializeApp(firebaseConfig);

// Exportamos todo lo que usamos
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // ➡️ ahora también tienes storage disponible
