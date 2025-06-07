// src/screens/SettingsScreen.js
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import defaultAvatar from "../../assets/avatar.png";
import { UserContext } from "../UserContext";

const SettingsScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [image, setImage] = useState(user?.photo || null);

  useEffect(() => {
    setImage(user?.photo || null);
  }, [user]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setImage(uri);
        await uploadImage(uri);
      }
    } catch (error) {
      console.error("Error al seleccionar imagen:", error);
      Alert.alert("Error", "No se pudo seleccionar la imagen.");
    }
  };

  const uploadImage = async (uri) => {
    const data = new FormData();
    data.append("file", {
      uri,
      type: "image/jpeg",
      name: "profile.jpg",
    });
    data.append("upload_preset", "unsigned");
    data.append("cloud_name", "df2sj5dwk");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/df2sj5dwk/upload", {
        method: "POST",
        body: data,
      });

      const response = await res.json();
      if (response.secure_url) {
        setImage(response.secure_url);
        setUser((prev) => ({ ...prev, photo: response.secure_url }));
      } else {
        throw new Error("No se recibió URL segura.");
      }
    } catch (err) {
      console.log("Error subiendo imagen:", err);
      Alert.alert("Error", "No se pudo subir la imagen.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Configuración</Text>

        <View style={styles.avatarContainer}>
          <Image
            source={image ? { uri: image } : defaultAvatar}
            style={styles.avatar}
          />
        </View>

        <Pressable style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Cambiar foto de perfil</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: "#4aa3df", marginTop: 25 }]}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Volver al Home</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: "90%",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  avatarContainer: {
    marginBottom: 25,
    borderRadius: 100,
    padding: 5,
    borderWidth: 3,
    borderColor: "#fff",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  button: {
    backgroundColor: "#f78c6b",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 15,
    minWidth: 200,
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
