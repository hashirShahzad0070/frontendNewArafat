import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import profileImage from '../assets/images/LoginBot.png'; // Placeholder profile image


const ProfileModal = ({ visible, onClose, data }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image
            source={profileImage}
            style={styles.profileImage}
          />

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Name: </Text>
            <TextInput
              style={styles.textBox}
              value={data?.name || ''}
              editable={false}
            />
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.textBox}
              value={data?.email || ''}
              editable={false}
            />
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: '#000',
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    width: '30%',
    fontWeight: 'bold',
    color: '#555',
  },
  textBox: {
    width: '69%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    color: '#333',
    backgroundColor: '#f7f7f7',
  },
  closeButton: {
    backgroundColor: '#000', // Black background
    borderRadius: 5,         // Rounded corners
    borderColor: 'silver',   // Silver border color
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',           // White text color
    fontWeight: 'bold',
  },
});

export default ProfileModal;
