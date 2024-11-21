import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Modal, Animated } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import chatBotImg from '../assets/images/chatBot.png';
import arrowLeft from '../assets/images/arrowLeft.png';
import tick from '../assets/images/tick.png';



const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const [closeButtonColor, setCloseButtonColor] = React.useState('#475569'); // Default color
  const [tickButtonColor, setTickButtonColor] = React.useState('#475569'); // Default color

  // Animation values for audio wave effect
  const waveAnim1 = React.useRef(new Animated.Value(1)).current;
  const waveAnim2 = React.useRef(new Animated.Value(1)).current;
  const waveAnim3 = React.useRef(new Animated.Value(1)).current;

  const sendMessage = () => {
    if (input.trim()) {
      const userMessage = { text: input, isUser: true };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');

      const aiResponse = getAIResponse(input);
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }
  };

  const sendAudioMessage = () => {
    const audioMessage = { text: 'Audio Message', isUser: true, isAudio: true };
    setMessages(prevMessages => [...prevMessages, audioMessage]);
    toggleModal(); // Close the modal after sending audio message
  };

  const getAIResponse = (userMessage) => {
    return { text: `You said: ${userMessage}`, isUser: false };
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    if (!isModalVisible) {
      startWaveAnimation();
    } else {
      stopWaveAnimation();
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      stopWaveAnimation();
      setCloseButtonColor('#475569'); // Default color when not playing
      setTickButtonColor('#475569'); // Default color when not playing
    } else {
      startWaveAnimation();
      setCloseButtonColor('#EA3D5B'); // Change to red when playing
      setTickButtonColor('#36373B'); // Change to green when playing
    }
  };




  const startWaveAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim1, {
          toValue: 1.5,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim1, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim2, {
          toValue: 1.5,
          duration: 500,
          delay: 200,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim2, {
          toValue: 1,
          duration: 500,
          delay: 200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim3, {
          toValue: 1.5,
          duration: 500,
          delay: 400,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim3, {
          toValue: 1,
          duration: 500,
          delay: 400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopWaveAnimation = () => {
    waveAnim1.stopAnimation();
    waveAnim2.stopAnimation();
    waveAnim3.stopAnimation();
  };

  return (
    <PaperProvider>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <Image source={arrowLeft} style={styles.arrow} />
          </TouchableOpacity>
          <Image source={chatBotImg} style={styles.image} />
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>AI Chat</Text>
            <Text style={styles.headerStatus}>Online</Text>
          </View>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="search" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="ellipsis-vertical" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.chatContainer}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.message,
                message.isUser ? styles.userMessage : styles.botMessage,
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
              {message.isUser ? (
                <View style={styles.tailRight} />
              ) : (
                <View style={styles.tailLeft} />
              )}
            </View>
          ))}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor={'#545454'}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Icon name="send" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal} style={styles.recordButton}>
            <Icon name="mic" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Bottom Modal for Audio Recording */}
 
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={toggleModal}
        >
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
    <TouchableOpacity style={[styles.ModalButton, { backgroundColor: closeButtonColor }]} onPress={toggleModal}> 
             <Text style={styles.ModalButtonText}>✕</Text>
      </TouchableOpacity>

      {/* Play/Pause Button */}
      <TouchableOpacity style={styles.ModalButtonPlay} onPress={togglePlayPause}>
        <Icon name={isPlaying ? "pause" : "play"} size={24} color="#fff" />
      </TouchableOpacity>

      {/* Audio Wave Animation */}
      <View style={styles.audioWaveContainer}>
        <Animated.View style={[styles.audioWaveBar, { transform: [{ scaleY: waveAnim1 }] }]} />
        <Animated.View style={[styles.audioWaveBar, { transform: [{ scaleY: waveAnim2 }] }]} />
        <Animated.View style={[styles.audioWaveBar, { transform: [{ scaleY: waveAnim3 }] }]} />
        <Animated.View style={[styles.audioWaveBar, { transform: [{ scaleY: waveAnim1 }] }]} />
        <Animated.View style={[styles.audioWaveBar, { transform: [{ scaleY: waveAnim2 }] }]} />
        <Animated.View style={[styles.audioWaveBar, { transform: [{ scaleY: waveAnim3 }] }]} />
        <Animated.View style={[styles.audioWaveBar, { transform: [{ scaleY: waveAnim1 }] }]} />
        <Animated.View style={[styles.audioWaveBar, { transform: [{ scaleY: waveAnim2 }] }]} />
        <Animated.View style={[styles.audioWaveBar, { transform: [{ scaleY: waveAnim3 }] }]} />
        <Animated.View style={[styles.audioWaveBar, { transform: [{ scaleY: waveAnim1 }] }]} />
        <Animated.View style={[styles.audioWaveBar, { transform: [{ scaleY: waveAnim2 }] }]} />
        <Animated.View style={[styles.audioWaveBar, { transform: [{ scaleY: waveAnim3 }] }]} />
        <Animated.View style={[styles.audioWaveBar, { transform: [{ scaleY: waveAnim1 }] }]} />
        <Animated.View style={[styles.audioWaveBar, { transform: [{ scaleY: waveAnim2 }] }]} />
        <Animated.View style={[styles.audioWaveBar, { transform: [{ scaleY: waveAnim3 }] }]} />
        <Animated.View style={[styles.audioWaveBar, { transform: [{ scaleY: waveAnim1 }] }]} />
        <Animated.View style={[styles.audioWaveBar, { transform: [{ scaleY: waveAnim2 }] }]} />
        <Animated.View style={[styles.audioWaveBar, { transform: [{ scaleY: waveAnim3 }] }]} />
      </View>

      <TouchableOpacity style={[styles.ModalButton, { backgroundColor: tickButtonColor }]} onPress={sendAudioMessage}>
        <Image source={tick} style={styles.tickIcon} />
      </TouchableOpacity>
    </View>
  </View>
</Modal>

      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C274C',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#21D3C0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 120,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 50,
    marginLeft: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  arrow: {
    marginRight: 20,
    width: 27,
    height: 26,
    marginTop: 50,
  },
  headerStatus: {
    color: '#00ff00',
    fontSize: 16,
  },
  image: {
    width: 45,
    height: 45,
    marginTop: 45,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1C274C',
  },
  message: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 20,
    maxWidth: '75%',
    position: 'relative',
  },
  userMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#21D3C0',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#1C274C',
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 18,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#e5e5ea',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007aff',
    borderRadius: 20,
    padding: 10,
  },
  recordButton: {
    marginLeft: 10,
    backgroundColor: '#36373B',
    borderRadius: 20,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop:40,
    marginBottom:30,
    backgroundColor: '#1E293B',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#21D3C0',
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
  },
  ModalButtonPlay:{
    position: 'absolute',
    backgroundColor: '#475569', // Button background color
    borderRadius: 10,           // Make it round
    width: 51,                  // Width of the button
    height: 51,                 // Height of the button
    justifyContent: 'center',    // Center the icon horizontally
    alignItems: 'center',       // Center the icon vertically
    bottom: 80,                 // Position it above the audio wave
    right:170,  

  },
  ModalButton: {
    backgroundColor: '#475569',  // Red background color
    borderRadius: 10,        // Make it round
    width: 51,               // Width of the button
    height: 51,              // Height of the button
    justifyContent: 'center', // Center the text horizontally
    alignItems: 'center',    // Center the text vertically
  },
  ModalButtonText: {
    color: '#fff',           // White text color
    fontSize: 18,            // Size of the "X"
    fontWeight: 'bold',      // Bold text
  },
  audioWrapper:{
    flexDirection: 'column',
    justifyContent:'center',
    marginBottom:0,


  },
  audioWaveContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  audioWaveBar: {
    width: 2,
    height: 10,
    marginHorizontal: 4,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  tickIcon: {
    width: 20,
    height: 20,
  },
});

export default ChatScreen;
