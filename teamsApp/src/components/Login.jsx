import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Login = ({ onLogin, onNavigateToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    onLogin();
  };

  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onNavigateToSignUp} style={styles.link}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
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

export default Login;
