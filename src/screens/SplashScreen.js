import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text, StyleSheet, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../constants/colors';


const SplashScreen = () => {
    const navigation = useNavigation();
    const fadeAnim = new Animated.Value(0); // Animación de opacidad

    useEffect(() => {
        // Animación de opacidad al aparecer
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();

        // Cambiar de pantalla después de 3 segundos
        const timer = setTimeout(() => {
            navigation.replace('MainTabs'); // Asegúrate de que esta ruta es correcta
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <LinearGradient colors={colors.gradientLight} style={styles.container}>
            <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
                <Image source={require('../../assets/splash-icon.png')} style={styles.logo} />
                <Text style={styles.text}>Cargando...</Text>
            </Animated.View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 150, // Ajustado para mejor visibilidad
        height: 150,
        resizeMode: 'contain',
    },
    text: {
        color: '#fff', // Texto blanco para contraste
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
    }
});

export default SplashScreen;
