import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './src/UserContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    </NavigationContainer>
  );
}
