import React from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity, } from 'react-native';
import chatBot from '../assets/images/Chat-bot.png';

const AllNew = ({ navigation }) =>{
    return (
      <View style={styles.container}>
        <Image 
          source={chatBot} // Ensure the correct path
          style={styles.image}
        />
        <Text style={styles.title}>Your Intelligent Assistant</Text>
        <Text style={styles.subtitle}>Quick answers to your questions</Text>
        <Text style={styles.subtitle}>Friendly conversations</Text>
        
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        
        <TouchableOpacity 
          style={styles.buttonContainer} 
          onPress={() => navigation.navigate('HomeScreen')} // Navigate to Home Screen
        >
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#ffffff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 5,
    },
    image: {
      width: 335, 
      height: 335, 
      marginBottom: 20,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    buttonContainer: {
      backgroundColor: '#36373B',
      padding: 20,
      borderRadius: 25,
      alignItems: 'center',
      width: '90%',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
export default AllNew;
