import React from "react";
import { Modal, View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from "react-native";

const ModalEditProfile = ({
  visible,
  title,
  value,
  onChangeText,
  onSave,
  onClose,
  isImage,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar {title}</Text>

          {isImage ? (
            <>
              <Image
                source={value ? { uri: value } : require("../assets/default-avatar.png")}
                style={styles.imagePreview}
              />
              <TouchableOpacity style={styles.button} onPress={onChangeText}>
                <Text style={styles.buttonText}>Seleccionar Imagen</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChangeText}
              placeholder={`Nuevo ${title}`}
            />
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={onSave}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    padding: 10,
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  saveButton: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ModalEditProfile;
