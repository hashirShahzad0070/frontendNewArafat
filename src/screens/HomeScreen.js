import React, { useState } from 'react';
import { FlatList, Image, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ali from '../assets/images/ali.png';
import chatIcon from '../assets/images/chat-box.png';
import chatRound from '../assets/images/chat-round.png';
import rectangle from '../assets/images/Rectangle.png';
import TabNavigation from '../components/TabNavigation';
import ToggleButtons from '../components/ToggleButtons';
import { conversations } from '../data/conversations';

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Home'); // Track active tab


  const renderItem = ({ item }) => (
    <View style={styles.conversationItem}>
      <Image source={chatRound} style={styles.chatRound} />
      <View style={{ flex: 1 }}>
        <Text style={styles.conversationTitle}>{item.title}</Text>
        <Text style={styles.conversationDate}>{item.date}</Text>
      </View>
      <Icon name="more-vert" size={24} color="#545454" />
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={rectangle} style={styles.headerWrapper}>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.welcomeText}>Welcome Ali,</Text>
            <Text style={styles.mainTitle}>My AI Chat</Text>
          </View>
          <Image source={ali} style={styles.profileImage} />
        </View>

        {/* Tabs */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ToggleButtons />
        </View>
      </ImageBackground>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Image source={chatIcon} style={styles.image} />
        <TextInput placeholder="Search conversation..." placeholderTextColor="#545454CC" style={styles.searchInput} />
        <Icon name="search" size={30} color="#545454CC" />
      </View>

      <View style={styles.containerRecentView}>
        <View style={styles.recents}>
          <Text style={styles.recentText}>Recents</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.viewText}>View all</Text>
        </View>
      </View>

      {/* Recents List */}
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.recentList}
      />

      {/* FAB */}
      <FAB style={styles.fab} icon="plus" color='#fff' onPress={() => navigation.navigate('ChatScreen')} />

      {/* Bottom Navigation */}

      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab}  />
    
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerWrapper: {
    width: '100%',
    height: 239,
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 30,
    marginLeft: 30,
  },
  headerTextContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 40,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
    fontWeight: '500',
  },
  profileImage: {
    width: 40,
    height: 40,
    marginRight: 20,
    marginTop: 10,
  },
  image: {
    width: 28,
    height: 28,
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    height: 56,
    width: 350,
    marginLeft: 18,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#54545480',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 20,
    fontSize: 18,
  },
  recentList: {
    paddingBottom: 80,
    padding: 18,
  },
  chatRound: {
    width: 35,
    height: 35,
    marginRight: 20,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    height: 70,
    backgroundColor: '#F1F5F9',
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#54545480',
  },
  fab: {
    position: 'absolute',
    right: 45,
    bottom: 136,
    backgroundColor: '#0e9b94',
    borderRadius: 40,
    width: 60,
    height: 60,
  },
  
  containerRecentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  recentText: {
    fontSize: 16,
  },
  viewText: {
    color: '#36373B',
    fontSize: 16,
    
  },
});

export default HomeScreen;
