import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ToggleButtons = () => {
    const [active, setActive] = useState('Recent');

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, active === 'Recent' && styles.activeButton]}
                onPress={() => setActive('Recent')}
            >
                <Text style={[styles.buttonText, active === 'Recent' && styles.activeButtonText]}>Recent</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, active === 'Trash' && styles.activeButton]}
                onPress={() => setActive('Trash')}
            >
                <Text style={[styles.buttonText, active === 'Trash' && styles.activeButtonText]}>Trash</Text>
            </TouchableOpacity>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
        height:60,
        width:327,
        borderRadius:20,
        backgroundColor: '#0E786C',

        
        
        
        
    },
    button: {
        flex: 1, // Allow buttons to fill the container equally
        height: '100%', // Make sure the button takes the full height
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        borderRadius: 20,
        backgroundColor: '#0E786C', // Light background color for active
        marginHorizontal: 5,
         borderWidth: 3,
        borderColor: '#0E786C',
         // Border color
    },
    activeButton: {
        backgroundColor: '#36373B', // Darker background color for inactive
    },
    buttonText: {
        color: '#ffffff', // White text color
        fontSize: 16,
        fontWeight: '600',
        },
    activeButtonText: {
        color: '#ffffff', // White text color
    },
});

export default ToggleButtons;
