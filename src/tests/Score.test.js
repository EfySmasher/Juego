import { act, render } from '@testing-library/react-native';
import React from 'react';
import GameScreen from '../screens/GameScreen';
import { UserContext } from '../src/UserContext';

jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: () => ({
    width: 400,
    height: 800,
  }),
}));

jest.useFakeTimers();

describe('GameScreen - Sistema de Puntuación', () => {
  const mockUser = { uid: 'test123' };

  const renderGame = () => render(
    <UserContext.Provider value={{ selectedCat: 'cat1', user: mockUser }}>
      <GameScreen />
    </UserContext.Provider>
  );

  it('debería aumentar la puntuación en 5 cuando el obstáculo es esquivado', () => {
    const { getByText } = renderGame();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(getByText(/Puntos: [5-9][05]?/)).toBeTruthy();
  });

  it('no debe aumentar más la puntuación si el obstáculo ya fue contado', () => {
    const { getByText } = renderGame();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const scoreText = getByText(/Puntos: (\d+)/).props.children;
    const score = parseInt(Array.isArray(scoreText) ? scoreText[1] : scoreText);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    const newScoreText = getByText(/Puntos: (\d+)/).props.children;
    const newScore = parseInt(Array.isArray(newScoreText) ? newScoreText[1] : newScoreText);

    expect(newScore).toBe(score);
  });
});
