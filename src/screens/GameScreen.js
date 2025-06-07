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
  Platform,
} from 'react-native';
import { UserContext } from '../UserContext';
import { useNavigation } from '@react-navigation/native';
import { db } from '../services/firebaseConfig';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';

const { width, height } = Dimensions.get('window');
const GRAVITY = 3;
const JUMP_HEIGHT = 150;
const OBSTACLE_SPEED = 6;

const GameScreen = () => {
  const { selectedCat, user } = useContext(UserContext);
  const navigation = useNavigation();

  const CAT_LEFT = 80;
  const GROUND_LEVEL = 100;

  const [catBottom, setCatBottom] = useState(GROUND_LEVEL);
  const catBottomRef = useRef(catBottom);
  const [obstacleX, setObstacleX] = useState(width);
  const [mouseX, setMouseX] = useState(width + 400);
  const [score, setScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [isFalling, setIsFalling] = useState(false);
  const [hasShield, setHasShield] = useState(false);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [obstaclePassed, setObstaclePassed] = useState(false);

  const jumpTimer = useRef(null);
  const fallTimer = useRef(null);
  const moveObstacleTimer = useRef(null);

  useEffect(() => {
    catBottomRef.current = catBottom;
  }, [catBottom]);

  const getCatImage = () => {
    if (selectedCat === 'cat2') {
      if (isJumping) return require('../../assets/jumpingCat2.png');
      if (isFalling) return require('../../assets/fallingCat2.png');
      return require('../../assets/cat2.png');
    } else {
      if (isJumping) return require('../../assets/jumpingCat1.png');
      if (isFalling) return require('../../assets/fallingCat1.png');
      return require('../../assets/cat1.png');
    }
  };

  const jump = () => {
    if (paused || gameOver || isJumping || isFalling) return;

    setIsJumping(true);
    setIsFalling(false);
    let jumpHeight = 0;

    jumpTimer.current = setInterval(() => {
      if (jumpHeight >= JUMP_HEIGHT) {
        clearInterval(jumpTimer.current);
        fall();
      } else {
        setCatBottom((prev) => prev + 20);
        jumpHeight += 20;
      }
    }, 30);
  };

  const fall = () => {
    setIsJumping(false);
    setIsFalling(true);

    fallTimer.current = setInterval(() => {
      setCatBottom((prev) => {
        if (prev <= GROUND_LEVEL) {
          clearInterval(fallTimer.current);
          setIsFalling(false);
          return GROUND_LEVEL;
        }
        return prev - GRAVITY;
      });
    }, 30);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };
    if (Platform.OS === 'web') window.addEventListener('keydown', handleKeyDown);
    return () => {
      if (Platform.OS === 'web') window.removeEventListener('keydown', handleKeyDown);
    };
  }, [paused, gameOver, isJumping, isFalling]);

  useEffect(() => {
    if (!paused && !gameOver) {
      setObstacleX(width);
      setMouseX(width + 400);
      setObstaclePassed(false);

      moveObstacleTimer.current = setInterval(() => {
        setObstacleX((prev) => (prev <= -60 ? width : prev - OBSTACLE_SPEED));
        setMouseX((prev) => (prev <= -60 ? width + Math.random() * 300 + 200 : prev - OBSTACLE_SPEED));
      }, 30);
    }
    return () => clearInterval(moveObstacleTimer.current);
  }, [paused, gameOver]);

  useEffect(() => {
    if (paused || gameOver) return;

    const CAT_WIDTH = 80;
    const OBSTACLE_WIDTH = 60;
    const ITEM_WIDTH = 50;

    const catRect = {
      x: CAT_LEFT,
      y: catBottomRef.current,
      width: CAT_WIDTH,
      height: 80,
    };
    const obstacleRect = {
      x: obstacleX,
      y: GROUND_LEVEL,
      width: OBSTACLE_WIDTH,
      height: 60,
    };
    const mouseRect = {
      x: mouseX,
      y: GROUND_LEVEL,
      width: ITEM_WIDTH,
      height: 50,
    };

    const isColliding = (r1, r2) => !(
      r1.x + r1.width < r2.x ||
      r1.x > r2.x + r2.width ||
      r1.y + r1.height < r2.y ||
      r1.y > r2.y + r2.height
    );

    // Colisión con obstáculo
    if (isColliding(catRect, obstacleRect)) {
      if (hasShield) {
        setHasShield(false);
        setObstacleX(width);
        setObstaclePassed(false);
      } else {
        setPaused(true);
        setGameOver(true);
        saveScore();
      }
    }

    // Colisión con ratón
    if (isColliding(catRect, mouseRect)) {
      setHasShield(true);
      setMouseX(width + Math.random() * 500 + 300);
    }

    // Para detectar que el obstáculo fue esquivado
    if (!obstaclePassed && obstacleX + OBSTACLE_WIDTH < CAT_LEFT) {
      setScore((prev) => prev + 5);
      setObstaclePassed(true);
    }

  }, [obstacleX, mouseX, catBottom]);

  const handleRestart = () => {
    setPaused(false);
    setGameOver(false);
    setScore(0);
    setCatBottom(GROUND_LEVEL);
    setObstacleX(width);
    setMouseX(width + 400);
    setIsJumping(false);
    setIsFalling(false);
    setHasShield(false);
    setObstaclePassed(false);
  };

  const saveScore = async () => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, { scores: [score] });
    } else {
      const existingScores = docSnap.data().scores || [];
      await updateDoc(userRef, { scores: [...existingScores, score] });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <ImageBackground source={require('../../assets/fondo.png')} style={styles.background}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.pauseButton} onPress={() => setPaused(true)}>
            <Text style={styles.pauseText}>⏸</Text>
          </TouchableOpacity>

          <Text style={styles.score}>Puntos: {score}</Text>

          {hasShield && (
            <Image source={require('../../assets/shield.png')} style={styles.shieldIcon} />
          )}

          <Image source={getCatImage()} style={[styles.cat, { bottom: catBottom }]} />
          <Image source={require('../../assets/perrito.png')} style={[styles.obstacle, { left: obstacleX, bottom: GROUND_LEVEL }]} />
          <Image source={require('../../assets/raton.png')} style={[styles.obstacle, { left: mouseX, bottom: GROUND_LEVEL }]} />

          {/* PAUSA */}
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
                <TouchableOpacity onPress={() => { setPaused(false); navigation.navigate('Home'); }} style={styles.menuButton}>
                  <Text style={styles.menuButtonText}>Volver al inicio</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* GAME OVER */}
          <Modal transparent visible={gameOver} animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalMenu}>
                <Text style={styles.modalTitle}>¡Juego Terminado!</Text>
                <Text style={styles.score}>Puntos: {score}</Text>
                <TouchableOpacity onPress={handleRestart} style={styles.menuButton}>
                  <Text style={styles.menuButtonText}>Volver a Intentarlo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setGameOver(false); navigation.navigate('Home'); }} style={styles.menuButton}>
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
  shieldIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
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
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  pauseButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: '#ff8c42',
    padding: 14,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  pauseText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000cc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalMenu: {
    backgroundColor: '#ff8c42',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 26,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  menuButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginVertical: 10,
    width: '80%',
  },
  menuButtonText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});