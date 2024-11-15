import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ImageBackground, Image,StyleSheet, Alert } from 'react-native';
import { loginUser } from '../../Services/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ onNavigateToSignUp, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and Password are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await loginUser(email, password);

      if (response.data.success) {
        const { token} = response.data;
        AsyncStorage.setItem('token' , token);
        onLogin();

      } else {
        setError('Incorrect email or password.');
      }
    } catch (error) {
      console.error(error);
      setError('There was an issue logging in. Please try again.');
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

      <Text style={styles.header}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter an Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
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

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {isLoading ? (
        <Text style={styles.loadingText}>Logging you in...</Text>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={onNavigateToSignUp} style={styles.link}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
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
  logo: {
      width: '110%',
      height: '30%',
      marginTop: -60,

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
      fontSize: 18,
      fontWeight: 'bold',

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

export default Login;
