Manual Técnico – Jumping Cat
1. Información General
Nombre de la Aplicación: Jumping Cat
Plataforma: React Native 
Backend: Firebase 
Autores: Sofía Cano y José Miguel Montoya

Jumping Cat es una aplicación móvil tipo arcade desarrollada con React Native. El usuario controla un gatito que salta para esquivar obstáculos e intentar obtener el mayor puntaje posible. Actualmente, el juego incluye autenticación básica de usuarios, navegación entre pantallas, selección de personaje y personalización del perfil mediante subida de imagen.
La aplicación fue diseñada con una arquitectura modular y escalable, lo cual facilita la implementación de nuevas funciones en futuras versiones (como puntuaciones guardadas, tienda o rankings).
2. Arquitectura de la Aplicación
La aplicación está construida en React Native usando Expo, lo que facilita el desarrollo multiplataforma para dispositivos Android. Firebase proporciona los servicios de backend, incluyendo autenticación y almacenamiento en la nube. El estado global se maneja mediante Context API.

Componentes principales:
- Frontend: React Native con Hooks y componentes funcionales.
- Backend: Firebase Authentication (actualmente usado para registro e inicio de sesión).
- Context API para manejo de sesión y estado del personaje
- AsyncStorage para guardar información local temporal.
- Cloudinary para subir y mostrar fotos de perfil.




3. Estructura de Carpetas
src/components/: Componentes reutilizables, como modales para editar perfil y selección de imágenes.
src/constants/: Configuraciones globales, incluyendo colores y temas personalizados.
src/context/: Manejo del estado global con Context API, en especial el estado del usuario (UserContext.js).
 src/navigation/: Configuración de la navegación principal de la aplicación (AppNavigator.js).
src/screens/: Pantallas principales de la aplicación, organizadas en carpetas para autenticación (auth/) y otras como juego, inicio, perfil y configuración.
src/services/: Servicios para conexión con Firebase, manejo de puntuaciones y configuración de backend.
4. Tecnologías Usadas
- React Native (Expo)
- Firebase Authentication
- React Navigation
- Context API
- AsyncStorage (en mejoras)
- Cloudinary (para imágenes de perfil)
5. Descripción de Pantallas
-SplashScreen: Muestra el logo mientras la aplicación carga.
- LoginScreen / RegisterScreen: Autenticación mediante correo y contraseña usando Firebase.
- HomeScreen: Selección del gato para jugar. Navegación hacia Configuración, Perfil e Información sobre la aplicación.
- GameScreen: Lógica del juego. Salto del gato, obstáculos, animaciones y puntuación.
- SettingsScreen: Permite seleccionar y subir una imagen como avatar del usuario.
- UserScreen: Muestra los datos del usuario logueado, como correo, nombre y puntaje.
6. Configuración de Firebase
El archivo `firebaseConfig.js` contiene las credenciales para conectar la app con Firebase. Este archivo no debe subirse a repositorios públicos.
Parámetros:
- apiKey
- authDomain
- projectId
- storageBucket
- messagingSenderId
- appId
7. Lógica de GameScreen
Personaje y obstáculo:
-El gato se posiciona siempre en el eje horizontal fijo (CAT_LEFT = 80).
-El obstáculo (un perrito) se mueve desde el lado derecho de la pantalla hacia la izquierda, simulando avance.
Movimiento del gato:
-El gato puede saltar y caer controlando la altura con estados isJumping e isFalling.
-El salto se realiza aumentando la posición vertical (catBottom) hasta un máximo (JUMP_HEIGHT = 150).
-Luego el gatito cae gradualmente hasta la posición base (GROUND_LEVEL = 100).
-La gravedad y velocidad del salto/fall están ajustadas con constantes (GRAVITY, intervalos de 30ms).
-El salto se activa tocando la pantalla o presionando la barra espaciadora en web.
Obstáculo y colisiones:
-El obstáculo se mueve horizontalmente con velocidad fija (OBSTACLE_SPEED = 6).
-Cuando el obstáculo llega al final, se reinicia su posición y aumenta la puntuación (score).
-Se detecta colisión usando cajas rectangulares para el gatito y el obstáculo; si chocan, el juego termina.
Estados del juego:
-El juego puede estar en pausa (paused) o terminado (gameOver).
-En pausa, se muestra un menú para reanudar, reiniciar o volver al inicio.
-Al terminar, se muestra la puntuación final y opciones para reiniciar o volver al inicio.
Guardar puntuación:
-Al finalizar el juego, la puntuación se guarda en Firestore bajo el documento del usuario.
8. Funcionalidades Actuales
- Registro e inicio de sesión con Firebase.
- Selección entre dos personajes (gatos).
- Juego funcional con lógica de salto y detección de colisiones.
- Menú de pausa con opciones de reanudar, reiniciar o volver al inicio.
- Visualización de perfil y cambio de imagen.
9. Mejoras Planeadas
- Guardado del puntaje más alto en Firebase o AsyncStorage.
- Dificultad progresiva (velocidad y aparición de obstáculos).
- Tienda interna con monedas o puntos.
- Selección de fondo (día, noche, arcoíris).
- Modo multijugador local por turnos.
10. Consideraciones de Seguridad
- Validar entradas del usuario antes de enviarlas a Firebase.
- No exponer claves de API públicas.
- Configurar reglas de Firebase para proteger la lectura y escritura de datos.
- Usar almacenamiento local con AsyncStorage de forma segura.

