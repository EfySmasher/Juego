import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../UserContext"; // Usa tu contexto real
import defaultAvatar from "../../assets/avatar.png";

const UserScreen = () => {
  const { user } = useContext(UserContext); // 🔥 Usa tu contexto
  const navigation = useNavigation();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No has iniciado sesión</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.homeButton}>
          <Text style={styles.homeButtonText}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu Perfil</Text>

      <Image
        source={user.photoURL ? { uri: user.photoURL } : defaultAvatar}
        style={styles.avatar}
      />

      <Text style={styles.info}>Nombre: {user.displayName || "Invitado"}</Text>
      <Text style={styles.info}>Email: {user.email || "No disponible"}</Text>
      <Text style={styles.info}>Puntaje: 1200 🐾</Text>

      <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.homeButton}>
        <Text style={styles.homeButtonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff8f0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  homeButton: {
    marginTop: 30,
    backgroundColor: "#ff8c42",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
