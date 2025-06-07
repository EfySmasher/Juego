import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AboutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Botón de cerrar */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Acerca de</Text>

      <Text style={styles.sectionTitle}>🐱 Jumping Cat</Text>
      <Text style={styles.text}>
        Jumping Cat es un juego divertido y ligero donde un gatito salta evitando obstáculos para obtener el puntaje más alto posible.{"\n\n"}
        Fue diseñado para ser simple, accesible y entretenido para todo tipo de jugadores.{"\n\n"}
        Nuestro objetivo es ofrecer una experiencia relajante, ideal para pasar el rato y desconectarse un momento del estrés diario.
      </Text>

      <Text style={styles.sectionTitle}>👩‍💻 Los desarrolladores</Text>
      <Text style={styles.text}>
        Esta app fue creada por desarrolladores independientes como parte de un proyecto académico.{"\n\n"}
        Trabajamos con pasión y dedicación para aprender, mejorar nuestras habilidades y crear algo propio desde cero.{"\n\n"}
        Esperamos que disfrutes el juego tanto como nosotros disfrutamos haciéndolo.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f0',
    padding: 20,
    paddingTop: 60,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 28,
    color: '#ff8c42',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
});

export default AboutScreen;
