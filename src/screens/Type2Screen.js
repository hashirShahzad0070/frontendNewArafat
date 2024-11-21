import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Dimensions, Alert, Modal } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Audio } from 'expo-av';
import start from '../assets/images/start.png';
import pause from '../assets/images/pause.png';
import typeImg from '../assets/images/typeImg.png';
import background from '../assets/images/background.png';

const Type1Screen = ({ navigation }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [sound, setSound] = useState(null);
  const sidebarAnim = useState(new Animated.Value(-Dimensions.get('window').width))[0];
  const screenWidth = Dimensions.get('window').width;

  // Load a single sound on component mount
  useEffect(() => {
    const loadSound = async () => {
      const newSound = new Audio.Sound();
      try {
        await newSound.loadAsync(require('../../src/assets/audios/updown.mp3')); // Adjust path if necessary
        setSound(newSound);
      } catch (error) {
        console.error('Error loading sound:', error);
        Alert.alert("Error loading sound. Please check the file path and format.");
      }
    };

    loadSound();

    // Cleanup sound on component unmount
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // Play functionality for the single sound
  const handlePlayPress = async () => {
    if (sound) {
      try {
        await sound.playAsync();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    } else {
      Alert.alert("Sound is not loaded yet. Please try again.");
    }
  };

  // Pause functionality for the single sound
  const handlePausePress = async () => {
    if (sound && isPlaying) {
      try {
        await sound.pauseAsync();
        setIsPlaying(false);
      } catch (error) {
        console.error("Error pausing sound:", error);
      }
    }
  };

  // Sidebar toggle functionality
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    Animated.timing(sidebarAnim, {
      toValue: sidebarVisible ? -screenWidth : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Swipe gesture for sidebar
  const handleGesture = Animated.event(
    [{ nativeEvent: { translationX: sidebarAnim } }],
    { useNativeDriver: true }
  );

  const handleGestureEnd = (event) => {
    if (event.nativeEvent.translationX < -screenWidth * 0.3) {
      setSidebarVisible(false);
      Animated.timing(sidebarAnim, {
        toValue: -screenWidth,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(sidebarAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Text style={styles.title}>QUANTUM REP</Text>
        <Text style={styles.titleType}>Type 2</Text>
      </View>
      <Image 
        source={background} 
        style={styles.backgroundImage}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.startBtn} onPress={handlePlayPress}>
          <Image source={start} style={styles.startBtnImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.pauseBtn} onPress={handlePausePress}>
          <Image source={pause} style={styles.pauseBtnImage} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.TypeBtn} onPress={() => setModalVisible(true)}>
        <Image source={typeImg} style={styles.TypeBtnImage} />
      </TouchableOpacity>
      
      <Text style={styles.subtitle}>Max 1 High intensity set/exercise</Text>

      {/* <TouchableOpacity style={styles.toggleButton} onPress={toggleSidebar}>
        <Text style={styles.toggleButtonText}>≡</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.profileButton}>
        <Text style={styles.profileButtonText}>ALGOPAN</Text>
      </TouchableOpacity> */}

      {sidebarVisible && (
        <PanGestureHandler
          onGestureEvent={handleGesture}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) {
              handleGestureEnd(nativeEvent);
            }
          }}
        >
          <Animated.View style={styles.sidebar}>
            <View style={styles.sidebarHeader}>
              <Text style={styles.sidebarTitle}>Menu</Text>
              <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('SomeScreen')}>
              <Text style={styles.sidebarItem}>Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AnotherScreen')}>
              <Text style={styles.sidebarItem}>Option 2</Text>
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Choose a Type</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Type1Screen'); // Navigate to Type1Screen
              }}
            >
              <Text style={styles.modalButtonText}>Type 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Type2Screen'); // Navigate to Type2Screen
              }}
            >
              <Text style={styles.modalButtonText}>Type 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    backgroundColor: '#36373B',
  },
  backgroundImage:{
    width:450,
    height:650,


  },

  
  nav: {
    height: 120,
    width: '100%',
    backgroundColor: '#25262A',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    // fontWeight: 'bold',
    marginTop: 75,
    textAlign: 'center',
    color: '#fff'
  },
  titleType: {
    fontSize: 44,
    fontWeight: 'bold',
    marginTop: 50,
    textAlign: 'center',
    color: '#FFD700'
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center',
    color: '#DDDDDD',
    marginTop: 36,
    position: 'absolute',
    bottom: 160,
  },
  buttonContainer: {
    position: 'absolute',
    left: 40,
    // backgroundColor: '#36373B',
    paddingBottom: 10,
    alignItems: 'left',
    width: '50%',
  },
  pauseBtn: {
    width: 150,
    height: 70,
    padding: 0,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseBtnImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  startBtn: {
    width: 150,
    height: 70,
    padding: 0,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startBtnImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  TypeBtn: {
    position: 'absolute',
    right: 30,
    width: 150,
    height: 70,
    padding: 0,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TypeBtnImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  toggleButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    backgroundColor: '#25262A',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#25262A',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButtonText: {
    color: '#FFFFFF',
    fontSize: 8,
  },
  toggleButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: Dimensions.get('window').width * 0.7,
    backgroundColor: '#25262A',
    paddingTop: 20,
    paddingHorizontal: 20,
    zIndex: 2,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sidebarTitle: {
    fontSize: 24,
    marginTop: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 5,
    marginTop: 40,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  sidebarItem: {
    fontSize: 18,
    color: '#FFFFFF',
    marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#25262A',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  modalButton: {
    backgroundColor: '#36373B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  modalCloseButton: {
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: '#DDDDDD',
    fontSize: 16,
  },
});

export default Type1Screen;
