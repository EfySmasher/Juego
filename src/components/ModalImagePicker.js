import React from "react";
import {View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native'
import colors from '../constants/colors'

const ModalImagePicker = ({Visible, ImageUri, onChooseImage, onSave, onCancel})
return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onCancel}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Cambiar foto de perfil</Text>
          
          <Image source={{ uri: imageUri }} style={styles.ImagePreview} />
  
          <TouchableOpacity style={styles.imageButton} onPress={onChooseImage}>
            <Text style={styles.imageButtonText}>Seleccionar imagen</Text>
          </TouchableOpacity>
  
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.imageButton} onPress={onCancel}>
              <Text style={styles.imageButtonText}>Cancelar</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={onSave}>
              <Text style={styles.imageButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
  
  