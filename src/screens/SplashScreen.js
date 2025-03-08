import { useNavigation } from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View,Text,StyleSheet} from 'react-native';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('MainTabs')},3000);
            return () => clearTimeout(timer)
        })

    
    return (
        <View style = {StyleSheet.container}>
            <Text>Cargando...</Text>
            <Image source = {require('../../assets/avatar.png')} style = {styles.logo}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default SplashScreen