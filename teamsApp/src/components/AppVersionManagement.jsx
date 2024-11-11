import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const AppVersionManagement = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'white',
  },
});

export default AppVersionManagement;
