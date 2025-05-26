import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import defaultAvatar from "../../assets/avatar.png";

const SettingsScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
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
      let res = await fetch("https://api.cloudinary.com/v1_1/df2sj5dwk/upload", {
        method: "POST",
        body: data,
      });
      let response = await res.json();
      console.log("Uploaded URL:", response.secure_url);
    } catch (err) {
      console.log("Error uploading", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      <Image source={image ? { uri: image } : defaultAvatar} style={styles.avatar} />
      <Button title="Cambiar foto de perfil" onPress={pickImage} />
      <View style={{ marginTop: 20 }}>
        <Button title="Volver al Home" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
});
