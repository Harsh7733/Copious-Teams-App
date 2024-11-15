import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground, Image, Alert } from 'react-native';
import { saveUser } from '../../Services/UserService';

const SignUp = ({ onNavigateToLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Validate form fields
    const validateForm = () => {
        if (!username || !email || !password) {
            setErrorMessage('All fields are required!');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMessage('Please enter a valid email address.');
            return false;
        }
        if (password.length < 6) {
            setErrorMessage('Password should be at least 6 characters long.');
            return false;
        }
        return true;
    };

    // Handle sign-up action
    const handleSignUp = async () => {
        if (!validateForm()) {
            Alert.alert('Error', errorMessage);
            return;
        }

        setIsLoading(true);
        setErrorMessage('');
        try {
            const userData = {
                userName: username,
                email,
                password
            };
            const response = await saveUser(userData);

            Alert.alert('Success', 'Account created successfully!', [{ text: 'OK', onPress: onNavigateToLogin }]);
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'There was an error with the signup. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../Assets/BGG.png')}
                style={styles.logo1}
            />

            <Image
                source={require('../Assets/logo.png')}
                style={styles.logo2}
            />
            <Text style={styles.SubHeading}>COPIOUS TEAMS</Text>

            <Text style={styles.header}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter an Username"
                placeholderTextColor="gray"
                value={username}
                onChangeText={setUsername}
            />

            <Text style={styles.header}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter an Email Address"
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <Text style={styles.header}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Password"
                placeholderTextColor="gray"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {isLoading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity onPress={onNavigateToLogin} style={styles.link}>
                <Text style={styles.linkText}>Already have an account? Log In</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        width: '100%',
    },
    logo1: {
        width: '100%',
        height: '100%',
    },
    logo2: {
        width: '40%',
        height: '10%',
        marginTop: -650,
        marginLeft: 110,
    },
    SubHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#316cb5',
        marginLeft: 107,
        marginBottom: 15,

    },
    header: {
        color: '#316cb5',
        fontWeight: 'bold',
        fontSize: 15,
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        marginLeft: 80,
        marginBottom: 5,

    },
    input: {
        height: 50,
        width: '60%',
        color: 'black',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 5,
        marginLeft: 80,
        paddingLeft: 10,
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#049f89',
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
        width: '60%',
        marginLeft: 80,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#007BFF',
    },
    link: {
        marginTop: 5,
        alignItems: 'center',
    },
    linkText: {
        color: '#316cb5',
        fontWeight: 'bold',
    },
});

export default SignUp;
