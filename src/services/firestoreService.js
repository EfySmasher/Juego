// services/firestoreService.js
import { collection, doc, setDoc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Asegúrate que esté bien la ruta

// Crear o actualizar usuario
export const saveUserData = async (userId, userData) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, userData, { merge: true });
    console.log("✅ Usuario guardado exitosamente.");
  } catch (error) {
    console.error("❌ Error guardando usuario:", error);
    throw error;
  }
};

// Obtener datos de un usuario
export const getUserData = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log("❗ Usuario no encontrado.");
      return null;
    }
  } catch (error) {
    console.error("❌ Error obteniendo usuario:", error);
    throw error;
  }
};

// Obtener todos los usuarios
export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = [];

    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    return users;
  } catch (error) {
    console.error("❌ Error obteniendo usuarios:", error);
    throw error;
  }
};

// Actualizar un campo específico
export const updateUserField = async (userId, field, value) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { [field]: value });
    console.log("✅ Campo actualizado.");
  } catch (error) {
    console.error("❌ Error actualizando campo:", error);
    throw error;
  }
};
