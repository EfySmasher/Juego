import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserContext } from "../UserContext";

//Screens
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import UserScreen from "../screens/UserScreen";
import SettingsScreen from "../screens/settingsScreen";
import SplashScreen from "../screens/SplashScreen";
import GameScreen from "../screens/GameScreen";
import AboutScreen from "../screens/AboutScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="User" component={UserScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
        
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
