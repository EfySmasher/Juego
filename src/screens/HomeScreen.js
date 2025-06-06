// src/screens/HomeScreen.js
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserContext } from "../UserContext";
import colors from "../constants/colors";

const HomeScreen = ({ navigation }) => {
  const { setSelectedCat } = useContext(UserContext);
  const [catSelected, setCatSelected] = useState(null);

  const handleSelectCat = (cat) => {
    setCatSelected(cat);
    setSelectedCat(cat);
  };

  const handlePlay = () => {
    navigation.navigate("Game");
  };

  return (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Elige tu Gatito</Text>

        <View style={styles.catContainer}>
          <Pressable onPress={() => handleSelectCat("cat1")}>
            <Image
              source={require("../../assets/cat1.png")}
              style={[
                styles.catImage,
                catSelected === "cat1" && styles.selectedCat,
              ]}
            />
          </Pressable>
          <Pressable onPress={() => handleSelectCat("cat2")}>
            <Image
              source={require("../../assets/cat2.png")}
              style={[
                styles.catImage,
                catSelected === "cat2" && styles.selectedCat,
              ]}
            />
          </Pressable>
        </View>

        {catSelected && (
          <Pressable
            onPress={handlePlay}
            style={[styles.iconButton, { backgroundColor: "#F3BDBD" }]}
          >
            <Ionicons name="play" size={30} color="#fff" />
          </Pressable>
        )}

        <View style={styles.buttonsContainer}>
          <Pressable
            onPress={() => navigation.navigate("Settings")}
            style={({ pressed }) => [
              styles.iconButton,
              {
                backgroundColor: colors.accentOrange,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Ionicons name="settings" size={26} color="#fff" />
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("User")}
            style={({ pressed }) => [
              styles.iconButton,
              {
                backgroundColor: colors.accentBlue,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Ionicons name="person" size={26} color="#fff" />
          </Pressable>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("About")}
          style={styles.aboutLink}
        >
          <Text style={styles.aboutText}>
            ¿Quieres saber más? Acerca del juego
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    padding: 30,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    color: "#fff",
    fontWeight: "bold",
  },
  catContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 20,
  },
  catImage: {
    width: 110,
    height: 110,
    marginHorizontal: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  selectedCat: {
    borderColor: "#F3BDBD",
    borderWidth: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 30,
    gap: 10,
  },
  iconButton: {
    padding: 12,
    borderRadius: 20,
    minWidth: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  aboutLink: {
    marginTop: 20,
  },
  aboutText: {
    color: "#f78c6b",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default HomeScreen;
