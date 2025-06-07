import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../constants/colors';

const SplashScreen = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            }),
        ]).start();

        
        const timer = setTimeout(() => {
            navigation.replace(user ? 'Home' : 'Login'); 
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <LinearGradient colors={colors.gradientLight} style={styles.container}>
            <Animated.View
                style={{
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }],
                    alignItems: 'center',
                }}
            >
                <Image
                    source={require('../../assets/splash.png')}
                    style={styles.logo}
                />
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
        width: 220,
        height: 220,
        resizeMode: 'contain',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    text: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },
});

export default SplashScreen;
