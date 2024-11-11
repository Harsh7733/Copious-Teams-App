// UsersScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { stylesforScreen } from '../../styles/styles';

const UsersScreen = ({ users, addUser }) => {
  const [userName, setUserName] = useState('');

  const handleAddUser = () => {
    if (userName) {
      addUser(userName);
      setUserName(''); // Clear input after adding
    }
  };

  return (
    <View style={stylesforScreen.container}>
      <Text style={stylesforScreen.title}>Users</Text>

      <TouchableOpacity
        style={stylesforScreen.addButton}
        onPress={handleAddUser}
      >
        <Text style={stylesforScreen.addButtonText}>Add User</Text>
      </TouchableOpacity>

      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View style={stylesforScreen.listItem}>
            <Text style={stylesforScreen.listItemText}>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default UsersScreen;
