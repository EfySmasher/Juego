//src/services/scoreService.js
import { db } from "./firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

/**
 * Guarda una nueva puntuación en Firestore
 * @param {string} uid - ID del usuario
 * @param {number} puntos - Puntos obtenidos
 */
export const saveScore = async (uid, puntos) => {
  try {
    await addDoc(collection(db, "scores"), {
      uid: uid,
      puntos: puntos,
      fecha: Timestamp.now(),
    });
    console.log("✅ Puntuación guardada.");
  } catch (error) {
    console.error("❌ Error al guardar puntuación:", error);
  }
};
