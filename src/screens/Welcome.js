import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Dimensions, Modal } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import chatBot from '../assets/images/Chat-bot.png';
import start from '../assets/images/start.png';
import ProfileModal from '../components/profileModal'; // Import the ProfileModal component
import { axios } from "../config/axios.config"; // Ensure axios is configured


const Welcome = ({ navigation, route }) => {
  const { token, userId } = route.params;
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility for type selection
  const [profileModalVisible, setProfileModalVisible] = useState(false); // Profile Modal visibility
  const [profile, setProfile] = useState(null); // State to hold the profile data

  const sidebarAnim = useState(new Animated.Value(-Dimensions.get('window').width))[0];
  const screenWidth = Dimensions.get('window').width;

  // Fetch user name from the token or API
  useEffect(() => {
    if (profileModalVisible && userId) {
      fetchUserProfile(user);
    }
  }, [profileModalVisible, userId]);


  // Fetch user profile data from the API
  const fetchUserProfile = async (id) => {
    try {
      // // Fetch user profile without the Authorization header
      // const response = await fetch(`http://192.168.18.5:5000/user/${id}`, {
      //   method: "GET",
      // });
      console.log(id);
      const response = await axios.get(`user/${id}`);
      console.log(response);

      const data = await response.data;
      console.log(data);
  
      if (data.status === "success") {
        console.log("API success");
        setProfile(data);
      } else {
        Alert.alert("Error", "Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      Alert.alert("Error", "An error occurred while fetching profile");
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

      <Image
        source={chatBot}
        style={styles.image}
      />

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/* Start Button opens Modal */}
      <TouchableOpacity 
        style={styles.buttonContainer} 
        onPress={() => setModalVisible(true)} // Open modal on press
      >
        <Image
          source={start}
          style={styles.startBtn}
        />
      </TouchableOpacity>

      <Text style={styles.subtitle}>Experience unique, unpredictable sessions that boost intensity, delivering fast and impressive results</Text>

      <TouchableOpacity 
        style={styles.toggleButton} 
        onPress={toggleSidebar} 
      >
        <Text style={styles.toggleButtonText}>≡</Text>
      </TouchableOpacity>

      {/* Profile Button triggers Profile Modal */}

      
     
      <TouchableOpacity 
        style={styles.profileButton} 
        onPress={() => setProfileModalVisible(true)} // Open Profile Modal on press
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
          <Animated.View style={styles.sidebar}>
            <View style={styles.sidebarHeader}>
            <Text style={styles.sidebarTitle}>Hi, {profile?.data?.name}</Text>
            <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setProfileModalVisible(true)}>
              <Text style={styles.sidebarItem}>View Profile</Text>
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
      )}

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

      {/* Profile Modal to show user details */}
      
      <ProfileModal
  visible={profileModalVisible} // Pass the profileModalVisible state as visible
  onClose={() => setProfileModalVisible(false)} // Close the profile modal when onClose is called
  data={profile?.data} // Pass the user data to the ProfileModal
/>

       <Text style={styles.signupText3}>
            Powered By | BG IT Solutions
              </Text>
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
  nav: {
    height: 140,
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
    color: '#fff'
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 60,
    textAlign: 'center',
    color: '#DDDDDD',
    marginTop: 10,
  },
  signupText3:{
    color:"#fff",
    // marginTop:60,
    position:"absolute",
    bottom:40,
    fontSize: 19,
    fontWeight:500,
  
},
  image: {
    width: 415, 
    height: 435, 
    marginBottom: 0,
    marginTop:40,
  },
  startBtn: {
    width: 190,
    height: 90,
    marginTop: -90,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonContainer: {
    backgroundColor: '#36373B',
    paddingBottom: 0,
    alignItems: 'center',
    width: '50%',
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
  profileButton:{
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
  profileButtonText:{
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
    width: 50,
    height: 50,
    // borderRadius: 50,
    alignItems:'flex-end',
    position:"absolute",
    right:15,
    top:9,
    

    // justifyContent: "space-around",
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 19,

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
