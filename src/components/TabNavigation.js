// TabNavigation.js
import React from 'react';
import home from '../assets/images/home.png';
import settings from '../assets/images/settin.png';
import profile from '../assets/images/profile.png';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.containerTab}>
        <View style={styles.navTab}>
          <View style={styles.imageRow}>
            <TouchableOpacity
              style={[styles.imageContainer, activeTab === 'Home' && styles.activeTab]} // Apply active style
              onPress={() => setActiveTab('Home')}
            >
              <Image source={home} style={styles.Tabimage} />
              <Text style={styles.textField}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.imageContainer, activeTab === 'Settings' && styles.activeTab]} // Apply active style
              onPress={() => setActiveTab('Settings')}
            >
              <Image source={settings} style={styles.Tabimage} />
              <Text style={styles.textField}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.imageContainer, activeTab === 'Profile' && styles.activeTab]} // Apply active style
              onPress={() => setActiveTab('Profile')}
            >
              <Image source={profile} style={styles.Tabimage} />
              <Text style={styles.textField}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  containerTab: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  navTab: {
    position: 'absolute',
    bottom: 23,
    left: 18,
    right: 18,
    borderRadius: 100,
    height: 75,
    backgroundColor: '#1C274C',
    paddingVertical: 11,
    alignItems: 'center',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    width: 96,
  },
  activeTab: {
    backgroundColor: '#808080', 
    borderRadius: 30, 
    
  },
  Tabimage: {
    width: 25,
    height: 25,
    marginBottom: 5,
  },
  textField: {
    width: 60,
    height: 25,
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    borderRadius: 5,
    padding: 3,
    
  },
});

export default TabNavigation;
