import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { createNewVersionManagementEntry, getAllVersionManagementEntries } from '../../Services/VersionManagementService';
import { Picker } from '@react-native-picker/picker';
import { getUsers } from '../../Services/UserService';
import { stylesforVersionManagement } from '../../styles/styles';

const VersionManagement = () => {
  const [entries, setEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState('');
  const [technologyUsed, setTechnologyUsed] = useState('');
  const [currentVersion, setCurrentVersion] = useState('');
  const [latestVersion, setLatestVersion] = useState('');
  const [users, setUsers] = useState([]); // State to store users

  // Fetch users and version entries when the component mounts
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

    const fetchEntries = async () => {
      try {
        const response = await getAllVersionManagementEntries(); // Fetch all version management entries
        if (response.status === 200) {
          const sortedEntries = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by creation date descending
          setEntries(sortedEntries); // Assuming response.data is the array of entries
        }
      } catch (error) {
        console.error('Error fetching entries:', error);
        alert('Failed to fetch version management entries');
      }
    };

    fetchUsers();
    fetchEntries();  // Fetch version entries when the component mounts
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
        const newEntries = [response.data.newEntry, ...entries]; // Add the new entry to the top
        setEntries(newEntries);
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
    <View style={{ flex: 1, padding: 20, marginTop: 40 }}>
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>-: Version Management :-</Text>
      </View>

      <Button title="+ Add Entry" onPress={() => setModalVisible(true)} />

      {/* Modal for creating a new version management entry */}
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
                  <Picker.Item key={user.id} label={user.userName} value={user.id} />
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

      {/* Display Version Management Entries as Cards */}
      <ScrollView style={{ marginTop: 15, marginBottom: -70 }}>
        {entries.map((entry, index) => (
          <View key={index} style={stylesforVersionManagement.card}>
            <Text style={stylesforVersionManagement.cardTitle}>{entry.technologyUsed}</Text>
            <Text style={stylesforVersionManagement.cardText}>Current Version: {entry.currentVersion}</Text>
            <Text style={stylesforVersionManagement.cardText}>Latest Version: {entry.latestVersion}</Text>
            <Text style={stylesforVersionManagement.cardText}>Created By: {users.find(user => user.id === entry.userId)?.userName || 'Unknown'}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default VersionManagement;
