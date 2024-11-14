import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SignUp = ({ onSignUp, onNavigateToLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        onSignUp();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onNavigateToLogin} style={styles.link}>
                <Text style={styles.linkText}>Already have an account? Log In</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: { height: 50, borderColor: 'gray', borderWidth: 1, marginBottom: 15, paddingLeft: 10 },
    button: { backgroundColor: '#4CAF50', padding: 15, alignItems: 'center' },
    buttonText: { color: 'white' },
    link: { marginTop: 15, alignItems: 'center' },
    linkText: { color: '#007BFF' },
});

export default SignUp;
