import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import chatBot from '../assets/images/Chat-bot.png';
import start from '../assets/images/start.png';
import ProfileModal from '../components/profileModal';
import { axios } from '../config/axios.config';

const Welcome = ({ navigation, route }) => {
  const { token, userId } = route.params;
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [profile, setProfile] = useState(null);

  const sidebarAnim = useState(new Animated.Value(-Dimensions.get('window').width))[0];
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (profileModalVisible && userId) {
      fetchUserProfile(userId);
    }
  }, [profileModalVisible, userId]);

  const fetchUserProfile = async (id) => {
    try {
      const response = await axios.get(`user/${id}`);
      const data = await response.data;

      if (data.status === 'success') {
        setProfile(data);
      } else {
        Alert.alert('Error', 'Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      Alert.alert('Error', 'An error occurred while fetching profile');
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    Animated.timing(sidebarAnim, {
      toValue: sidebarVisible ? -screenWidth : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

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
      </View>

      <Image source={chatBot} style={styles.image} accessible accessibilityLabel="Chatbot Illustration" />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => setModalVisible(true)}
        accessible
        accessibilityLabel="Start Experience"
      >
        <Image source={start} style={styles.startBtn} />
      </TouchableOpacity>

      <Text style={styles.subtitle}>
        Experience unique, unpredictable sessions that boost intensity, delivering fast and impressive results
      </Text>

      <TouchableOpacity style={styles.toggleButton} onPress={toggleSidebar} accessible accessibilityLabel="Toggle Sidebar">
        <Text style={styles.toggleButtonText}>≡</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => setProfileModalVisible(true)}
        accessible
        accessibilityLabel="Open Profile"
      >
        <Text style={styles.profileButtonText}>ALGOPAN</Text>
      </TouchableOpacity>

      {sidebarVisible && (
        <PanGestureHandler
          onGestureEvent={handleGesture}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) {
              handleGestureEnd(nativeEvent);
            }
          }}
        >
          <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarAnim }] }]}>
            <View style={styles.sidebarHeader}>
              <Text style={styles.sidebarTitle}>Hi, {profile?.data?.name}</Text>
              <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton} accessible accessibilityLabel="Close Sidebar">
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setProfileModalVisible(true)}>
              <Text style={styles.sidebarItem}>View Profile</Text>
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
      )}

      <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Choose a Type</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Type1Screen');
              }}
            >
              <Text style={styles.modalButtonText}>Type 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Type2Screen');
              }}
            >
              <Text style={styles.modalButtonText}>Type 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ProfileModal
        visible={profileModalVisible}
        onClose={() => setProfileModalVisible(false)}
        data={profile?.data}
      />

      <Text style={styles.signupText3}>Powered By | BG IT Solutions</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#36373B',
  },
  nav: {
    height: 140,
    width: '100%',
    backgroundColor: '#25262A',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  title: {
    fontSize: 30,
    marginTop: 80,
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#DDDDDD',
    marginVertical: 10,
  },
  signupText3: {
    color: '#fff',
    position: 'absolute',
    bottom: 40,
    fontSize: 14,
    textAlign: 'center',
  },
  image: {
    width: '90%',
    height: undefined,
    aspectRatio: 1,
    marginVertical: 20,
  },
  startBtn: {
    width: 190,
    height: 90,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleButton: {
    position: 'absolute',
    bottom: 80,
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
    bottom: 80,
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
    bottom: 30,
    left: 10,
    width: Dimensions.get('window').width * 0.4,
    height: 100,

    backgroundColor: '#25262A',
    
    
    zIndex: 2,
    borderRadius:20,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  sidebarTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',

  },
  closeButton: {
    width: 90,
    height: 90,
    // borderRadius: 50,
    alignItems:'flex-end',
    position:"absolute",
    right:15,
    top:9,
    

    // justifyContent: "space-around",
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 23,

  },
  sidebarItem: {
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 20,
    marginBottom:10,
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

export default Welcome;
