import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { createNewVersionManagementEntry } from '../../Services/VersionManagementService';
import { Picker } from '@react-native-picker/picker';
import { getUsers } from '../../Services/UserService';  // Import getUsers from UserService
import { stylesforVersionManagement } from '../../styles/styles';

const VersionManagement = () => {
  const [entries, setEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState('');
  const [technologyUsed, setTechnologyUsed] = useState('');
  const [currentVersion, setCurrentVersion] = useState('');
  const [latestVersion, setLatestVersion] = useState('');
  const [users, setUsers] = useState([]); // State to store users

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers(); // Fetch users
        if (response.status === 200) {
          setUsers(response.data); // Assuming response.data is an array of users
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  // Handle form submission
  const handleCreateReport = async () => {
    if (!userId || !technologyUsed || !currentVersion || !latestVersion) {
      alert('Please fill all fields');
      return;
    }

    // Prepare the entry data
    const newEntry = {
      userId,
      technologyUsed,
      currentVersion,
      latestVersion
    };

    try {
      const response = await createNewVersionManagementEntry(newEntry);
      if (response.status === 201) {
        setEntries((prevEntries) => [...prevEntries, response.data.newEntry]);
        setModalVisible(false);
        setTechnologyUsed('');
        setCurrentVersion('');
        setLatestVersion('');
      } else {
        alert('Failed to create entry');
      }
    } catch (error) {
      console.error('Error creating entry:', error);
      alert('Error creating entry');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 50 }}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>-: Version Management :-</Text>
      </View>

      <Button title="Add Entry" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={stylesforVersionManagement.modalBackground}>
          <View style={stylesforVersionManagement.modalContainer}>
            <Text style={stylesforVersionManagement.modalTitle}>Version Management</Text>

            <Text style={stylesforVersionManagement.header}>Technology Used :</Text>
            <TextInput
              style={stylesforVersionManagement.input}
              placeholder="Technology Used"
              placeholderTextColor="gray"
              value={technologyUsed}
              onChangeText={setTechnologyUsed}
            />

            {/* User ID Picker */}
            <Text style={stylesforVersionManagement.header}>Created By :</Text>
            <View style={stylesforVersionManagement.picker}>
              <Picker
                selectedValue={userId}
                style={stylesforVersionManagement.input}
                onValueChange={(itemValue) => setUserId(itemValue)}
              >
                <Picker.Item label="Select User" value="" />
                {users.map((user) => (
                  <Picker.Item key={user.id} label={user.name} value={user.id} />
                ))}
              </Picker>
            </View>

            <Text style={stylesforVersionManagement.header}>Current Version :</Text>
            <TextInput
              style={stylesforVersionManagement.input}
              placeholder="Current Version"
              placeholderTextColor="gray"
              value={currentVersion}
              onChangeText={setCurrentVersion}
            />

            <Text style={stylesforVersionManagement.header}>Latest Version :</Text>
            <TextInput
              style={stylesforVersionManagement.input}
              placeholder="Latest Version"
              placeholderTextColor="gray"
              value={latestVersion}
              onChangeText={setLatestVersion}
            />

            {/* Buttons inside the Modal */}
            <View style={stylesforVersionManagement.modalButtonsContainer}>
              <TouchableOpacity
                style={stylesforVersionManagement.buttons}
                onPress={() => setModalVisible(false)}
              >
                <Text style={stylesforVersionManagement.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={stylesforVersionManagement.buttons}
                onPress={handleCreateReport}
              >
                <Text style={stylesforVersionManagement.buttonText}>Create Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={entries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{item.technologyUsed} - {item.currentVersion} / {item.latestVersion}</Text>
        )}
      />
    </View>
  );
};

export default VersionManagement;
