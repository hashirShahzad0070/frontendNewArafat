import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Dimensions, Alert, Modal } from 'react-native';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native'; // to handle screen focus/unfocus
import start from '../assets/images/start.png';
import pause from '../assets/images/pause.png';
import typeImg from '../assets/images/typeImg.png';
import background from '../assets/images/background.png';

const Type2Screen = ({ navigation }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const sidebarAnim = useState(new Animated.Value(-Dimensions.get('window').width))[0];
  const screenWidth = Dimensions.get('window').width;

  // Load a single sound on component mount
  useEffect(() => {
    const loadSound = async () => {
      const newSound = new Audio.Sound();
      try {
        await newSound.loadAsync(require('../../src/assets/audios/updown.mp3')); // Adjust path if necessary
        await newSound.setIsLoopingAsync(true);  // Set the audio to loop
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

  // Pause audio when navigating away from the screen
  useFocusEffect(
    React.useCallback(() => {
      // Pause the audio when the screen loses focus
      return () => {
        if (sound && isPlaying) {
          sound.pauseAsync();
          setIsPlaying(false);
        }
      };
    }, [sound, isPlaying])
  );

  // Pause the audio when the Type button is pressed
  const handleTypeBtnPress = () => {
    if (sound && isPlaying) {
      sound.pauseAsync();
      setIsPlaying(false);
    }
    setModalVisible(true);
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

      <TouchableOpacity style={styles.TypeBtn} onPress={handleTypeBtnPress}>
        <Image source={typeImg} style={styles.TypeBtnImage} />
      </TouchableOpacity>

      <Text style={styles.subtitle}>Max 1 High intensity set/exercise</Text>

      {/* Modal for Type Selection */}
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
  backgroundImage: {
    width: 450,
    height: '80%',
  },
  nav: {
    height: 130,
    width: '100%',
    backgroundColor: '#25262A',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  title: {
    fontSize: 30,
    marginTop: 80,
    textAlign: 'center',
    color: '#fff',
  },
  titleType: {
    fontSize: 44,
    fontWeight: 'bold',
    marginTop: 70,
    textAlign: 'center',
    color: '#80C4E9',
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
    paddingBottom: 10,
    alignItems: 'left',
    width: '50%',
  },
  pauseBtn: {
    width: 150,
    height: 70,
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
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TypeBtnImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
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

export default Type2Screen;
