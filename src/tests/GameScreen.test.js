import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import GameScreen from '../screens/GameScreen';
import { UserContext } from '../src/UserContext';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('../src/services/firebaseConfig', () => ({
  db: {},
}));
jest.mock('expo-font');

describe('GameScreen', () => {
  const mockUser = { uid: '123', name: 'Sofi' };

  const renderWithProviders = () =>
    render(
      <UserContext.Provider value={{ selectedCat: 'cat1', user: mockUser }}>
        <NavigationContainer>
          <GameScreen />
        </NavigationContainer>
      </UserContext.Provider>
    );

  it('muestra el modal de pausa al presionar el botón de pausa', async () => {
    const { getByText, queryByText } = renderWithProviders();

    const pauseButton = getByText('⏸');
    fireEvent.press(pauseButton);

    await waitFor(() => {
      expect(getByText('Juego en Pausa')).toBeTruthy();
      expect(getByText('Reanudar')).toBeTruthy();
    });

    fireEvent.press(getByText('Reanudar'));
    expect(queryByText('Juego en Pausa')).toBeNull();
  });
});
