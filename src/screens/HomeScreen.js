import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, Animated } from 'react-native';
import { UserContext } from '../UserContext';

const HomeScreen = ({ navigation }) => {
  const { setSelectedCat } = useContext(UserContext);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Valor inicial: invisible

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSelectCat = (cat) => {
    setSelectedCat(cat);
    navigation.navigate('Game');
  };

  return (
    <ImageBackground source={require('../../assets/fondo.png')} style={styles.background}>
      <View style={styles.container}>
        
        {/* Logo animado con sombra */}
        <Animated.Image
          source={require('../../assets/LOGO.png')}
          style={[styles.logo, { opacity: fadeAnim }]}
        />

        <Text style={styles.title}>Elige tu Gatito</Text>

        <View style={styles.catContainer}>
          <TouchableOpacity onPress={() => handleSelectCat('cat1')}>
            <Image source={require('../../assets/cat1.png')} style={styles.catImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectCat('cat2')}>
            <Image source={require('../../assets/cat2.png')} style={styles.catImage} />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.buttonText}>Configuración</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('User')}>
            <Text style={styles.buttonText}>Perfil de Usuario</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 10,
    marginTop: 40,
    // 👇 Sombra estilo contorno
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  catContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 30,
  },
  catImage: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  button: {
    backgroundColor: '#5D3FD3',
    padding: 12,
    borderRadius: 8,
    minWidth: 140,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
