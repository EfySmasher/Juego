// src/components/ModalImagePicker.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import colors from "../constants/colors";

const ModalImagePicker = ({ visible, imageUri, onChooseImage, onSave, onCancel }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Cambiar foto de perfil</Text>

          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          ) : (
            <Text style={styles.noImageText}>No has seleccionado imagen</Text>
          )}

          <TouchableOpacity style={styles.imageButton} onPress={onChooseImage}>
            <Text style={styles.imageButtonText}>Seleccionar imagen</Text>
          </TouchableOpacity>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={onSave}>
              <Text style={styles.imageButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalImagePicker;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 25,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: colors.primary || "#ff8c42",
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.primary || "#ff8c42",
  },
  noImageText: {
    textAlign: "center",
    marginBottom: 20,
    color: "#888",
  },
  imageButton: {
    backgroundColor: colors.primary || "#ff8c42",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  imageButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#ccc",
    paddingVertical: 12,
    marginRight: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#444",
    fontWeight: "bold",
    fontSize: 16,
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.primary || "#ff8c42",
    paddingVertical: 12,
    marginLeft: 5,
    borderRadius: 10,
    alignItems: "center",
  },
});
