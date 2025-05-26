import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { UserContext } from '../UserContext';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const GRAVITY = 4;
const JUMP_HEIGHT = 120;
const OBSTACLE_SPEED = 4;
const SPAWN_INTERVAL = 2000;

const GameScreen = () => {
  const { selectedCat } = useContext(UserContext);
  const navigation = useNavigation();

  const [catBottom, setCatBottom] = useState(height / 2);
  const catBottomRef = useRef(catBottom);
  const [obstacles, setObstacles] = useState([]);
  const [mice, setMice] = useState([]);
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);

  const gameTimer = useRef(null);
  const fallTimer = useRef(null);
  const moveTimer = useRef(null);

  const catImage = selectedCat === 'cat2'
    ? require('../../assets/cat2.png')
    : require('../../assets/cat1.png');

  const jump = () => {
    if (!paused && catBottom < height - 100) {
      setCatBottom((prev) => prev + JUMP_HEIGHT);
    }
  };

  // Actualizar la ref
  useEffect(() => {
    catBottomRef.current = catBottom;
  }, [catBottom]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') jump();
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

  useEffect(() => {
    if (!paused) {
      fallTimer.current = setInterval(() => {
        setCatBottom((prev) => Math.max(0, prev - GRAVITY));
      }, 30);
    }
    return () => clearInterval(fallTimer.current);
  }, [paused]);

  useEffect(() => {
    if (!paused) {
      gameTimer.current = setInterval(() => {
        const newObstacle = {
          id: Date.now(),
          x: width,
          y: Math.random() * (height - 150),
        };
        const newMouse = {
          id: Date.now() + 1,
          x: width,
          y: Math.random() * (height - 150),
        };
        setObstacles((prev) => [...prev, newObstacle]);
        setMice((prev) => [...prev, newMouse]);
      }, SPAWN_INTERVAL);
    }
    return () => clearInterval(gameTimer.current);
  }, [paused]);

  useEffect(() => {
    if (!paused) {
      moveTimer.current = setInterval(() => {
        setObstacles((prev) =>
          prev.map((o) => ({ ...o, x: o.x - OBSTACLE_SPEED })).filter((o) => o.x > -50)
        );
        setMice((prev) =>
          prev
            .map((m) => {
              const hit = m.x < 100 && Math.abs(catBottomRef.current - m.y) < 50;
              if (hit) setScore((prev) => prev + 1);
              return { ...m, x: m.x - OBSTACLE_SPEED };
            })
            .filter((m) => m.x > -50)
        );
      }, 30);
    }
    return () => clearInterval(moveTimer.current);
  }, [paused]);

  const handleRestart = () => {
    setPaused(false);
    setScore(0);
    setCatBottom(height / 2);
    setObstacles([]);
    setMice([]);
  };

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <ImageBackground source={require('../../assets/fondo.png')} style={styles.background}>
        <View style={styles.container}>
          {/* Botón de pausa */}
          <TouchableOpacity style={styles.pauseButton} onPress={() => setPaused(true)}>
            <Text style={styles.pauseText}>⏸</Text>
          </TouchableOpacity>

          <Text style={styles.score}>Puntos: {score}</Text>
          <Image source={catImage} style={[styles.cat, { bottom: catBottom }]} />

          {obstacles.map((obstacle) => (
            <Image
              key={obstacle.id}
              source={require('../../assets/obstacle.png')}
              style={[styles.obstacle, { left: obstacle.x, top: obstacle.y }]}
            />
          ))}
          {mice.map((mouse) => (
            <Image
              key={mouse.id}
              source={require('../../assets/raton.png')}
              style={[styles.mouse, { left: mouse.x, top: mouse.y }]}
            />
          ))}

          {/* Menú de pausa */}
          <Modal transparent visible={paused} animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalMenu}>
                <Text style={styles.modalTitle}>Juego en Pausa</Text>

                <TouchableOpacity onPress={() => setPaused(false)} style={styles.menuButton}>
                  <Text style={styles.menuButtonText}>Reanudar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleRestart} style={styles.menuButton}>
                  <Text style={styles.menuButtonText}>Reiniciar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setPaused(false);
                    navigation.navigate('Home');
                  }}
                  style={styles.menuButton}
                >
                  <Text style={styles.menuButtonText}>Volver al inicio</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, position: 'relative' },
  cat: {
    position: 'absolute',
    left: 80,
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  obstacle: {
    position: 'absolute',
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  mouse: {
    position: 'absolute',
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  score: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  pauseButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderRadius: 20,
  },
  pauseText: {
    color: 'white',
    fontSize: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalMenu: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  menuButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
