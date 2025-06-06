//src/screens/UserScreen.js
import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { UserContext } from "../UserContext";
import defaultAvatar from "../../assets/avatar.png";
import { db } from '../services/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from "firebase/auth";  // para actualizar displayName en Auth
import ModalEditProfile from "../components/ModalEditProfile"; // Ajusta la ruta si es necesario




const UserScreen = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [scores, setScores] = useState([]);
  
  // Estados para editar nombre
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");

  useFocusEffect(
    React.useCallback(() => {
      const fetchScores = async () => {
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setScores(data.scores || []);
          }
        }
      };
      fetchScores();
    }, [user])
  );

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No has iniciado sesión</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.homeButton}
        >
          <Text style={styles.homeButtonText}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Función para guardar el nuevo nombre
  const saveName = async () => {
    try {
      // Actualizar en Firestore
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { displayName: newName });

      // Actualizar en Firebase Auth (para que user.displayName cambie)
      await updateProfile(user, { displayName: newName });

      setModalVisible(false);
      // Aquí podrías forzar un refresh o usar un método para actualizar el contexto UserContext si lo tienes
      // Por ejemplo, si tienes una función refreshUser() en tu contexto, la llamas aquí.

    } catch (error) {
      console.log("Error actualizando nombre:", error);
      // Puedes agregar un alert o mensaje de error
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu Perfil</Text>

      <Image
        source={user.photoURL ? { uri: user.photoURL } : defaultAvatar}
        style={styles.avatar}
      />

      {/* Nombre con Touchable para abrir modal */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.info}>Nombre: {user.displayName || "Invitado"}</Text>
        <Text style={{ color: "#ff8c42", fontWeight: "bold" }}>Editar nombre</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20, width: '100%' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>
          Tus puntuaciones:
        </Text>
        {scores.length === 0 ? (
          <Text style={{ color: '#999' }}>Aún no tienes puntuaciones.</Text>
        ) : (
          scores
            .sort((a, b) => b - a)
            .slice(0, 5)
            .map((s, i) => (
              <Text key={i} style={{ color: '#333' }}>
                #{i + 1}: {s} puntos
              </Text>
            ))
        )}
      </View>

      <Text style={styles.info}>Email: {user.email || "No disponible"}</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.homeButton}
      >
        <Text style={styles.homeButtonText}>Volver al inicio</Text>
      </TouchableOpacity>

      {/* Modal para editar nombre */}
      <ModalEditProfile
        visible={modalVisible}
        title="Nombre"
        value={newName}
        onChangeText={setNewName}
        onSave={saveName}
        onClose={() => setModalVisible(false)}
        isImage={false}
      />
    </View>
  );
};

export default UserScreen;

// styles queda igual


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f0ff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ff8c42", // corregido
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#ff8c42", // corregido
    shadowColor: "#ff8c42", // corregido
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
    fontWeight: "600",
  },
  homeButton: {
    marginTop: 30,
    backgroundColor: "#ff8c42",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#ff8c42", // corregido
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
