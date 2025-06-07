import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";

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
                source={value ? { uri: value } : require("../../assets/avatar.png")}
                style={styles.imagePreview}
              />
              <TouchableOpacity style={styles.primaryButton} onPress={onChangeText}>
                <Text style={styles.buttonText}>Seleccionar Imagen</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChangeText}
              placeholder={`Nuevo ${title}`}
              placeholderTextColor="#999"
            />
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton} onPress={onSave}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalEditProfile;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff8c42",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
    color: "#333",
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#ff8c42",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#ff8c42",
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#ddd",
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButtonText: {
    color: "#444",
    fontWeight: "bold",
    fontSize: 16,
  },
});
