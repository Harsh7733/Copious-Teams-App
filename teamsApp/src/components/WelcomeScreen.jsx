import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const WelcomeScreen = ({ onNavigateToSignUp, onNavigateToLogin }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../Assets/BGG.png')} 
                style={styles.logo1}
            />

            <Text style={styles.welcomeText}>Let's Get Started</Text>
            <Image
                source={require('../Assets/logo.png')} 
                style={styles.logo}
            />
            <Text style={styles.SubHeading}>COPIOUS TEAMS</Text>

            <TouchableOpacity style={styles.signupButton} onPress={onNavigateToSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onNavigateToLogin}>
                <Text style={styles.loginText}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: '100%',
    },
    logo: {
        width: '60%',
        height: '15%',
        marginBottom: 5,
        marginTop: 10,
    },
    logo1: {
        width: '100%',
        height: '100%',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: -670,
        marginBottom: 100,
        color: '#316cb5'
    },
    SubHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#316cb5'
    },
    signupButton: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 100,
        borderRadius: 15,
        marginBottom: 10,
        marginTop: 130,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    loginText: {
        color: '#316cb5',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;
