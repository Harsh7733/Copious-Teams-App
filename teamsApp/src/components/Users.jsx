import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getUsers, updateUser } from '../../Services/UserService';
import { Picker } from '@react-native-picker/picker';
import { stylesforUsers } from '../../styles/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [userTypes] = useState([
    { label: 'Admin', value: 'Admin' },
    { label: 'Developer', value: 'Developer' },
    { label: 'Field Worker', value: 'FieldWorker' },
    { label: 'Doctor', value: 'Doctor' },
  ]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Handle user type update
  const handleUpdateUserType = async (userId, newType) => {
    try {
      const updatedUser = { userType: newType };
      await updateUser(userId, updatedUser);
      setUsers(users.map(user =>
        user.id === userId ? { ...user, userType: newType } : user
      ));
    } catch (error) {
      console.error('Error updating user type:', error);
    }
  };

  const renderUserCard = ({ item }) => (
    <View style={stylesforUsers.card}>
      <Text style={stylesforUsers.userName}>{item.userName}</Text>
      <Picker
        selectedValue={item.userType}
        onValueChange={(value) => handleUpdateUserType(item.id, value)}
        style={stylesforUsers.picker}
      >
        {userTypes.map(type => (
          <Picker.Item
            style={stylesforUsers.pickerText}
            key={type.value} label={type.label} value={type.value} />
        ))}
      </Picker>
      <Icon
        name="keyboard-arrow-down"
        color="#000000"
        size={25}
        style={stylesforUsers.icon}
      />
    </View>
  );

  return (
    <View style={stylesforUsers.container}>
      <Text style={stylesforUsers.title}>-: Users :-</Text>
      <FlatList
        data={users}
        renderItem={renderUserCard}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Users;
