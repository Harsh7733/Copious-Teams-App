import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput, Modal, TouchableOpacity, Alert } from 'react-native';
import { createNewAppVersionManagementEntry, getAllAppVersionManagementEntries, updateAppVersionManagementEntryByID, versionAcceptedById } from '../../Services/AppVersionManagementService';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const AppVersionManagement = () => {
  const [entries, setEntries] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateEntryId, setUpdateEntryId] = useState(null);
  const [newEntry, setNewEntry] = useState({
    applicationName: '',
    liveVersion: '',
    testVersion: '',
    status: 'Not Started',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const statusOptions = ['Not Started', 'Working On', 'Submitted', 'In Review'];

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await getAllAppVersionManagementEntries();
      if (response && Array.isArray(response.data)) {
        setEntries(response.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching entries:', error);
      Alert.alert('Error', 'Failed to fetch entries');
    }
  };

  const handleCreateEntry = async () => {
    try {
      if (newEntry.applicationName && newEntry.liveVersion && newEntry.testVersion && newEntry.status) {
        const response = await createNewAppVersionManagementEntry(newEntry);
        Alert.alert('Success', 'App Version Entry Created Successfully');
        setNewEntry({ applicationName: '', liveVersion: '', testVersion: '', status: 'Not Started' });
        setIsModalVisible(false);
        fetchEntries();
      } else {
        Alert.alert('Error', 'Please fill in all fields.');
      }
    } catch (error) {
      console.error('Error creating entry:', error);
      Alert.alert('Error', 'Failed to create entry.');
    }
  };

  const handleUpdateEntry = async () => {
    if (isUpdating && updateEntryId) {
      try {
        const updatedEntry = { ...newEntry, id: updateEntryId };
        const response = await updateAppVersionManagementEntryByID(updatedEntry);
        setNewEntry({ applicationName: '', liveVersion: '', testVersion: '', status: 'Not Started' });
        setIsUpdating(false);
        setUpdateEntryId(null);
        setIsModalVisible(false); 
        fetchEntries();
      } catch (error) {
        console.error('Error updating entry:', error);
        Alert.alert('Error', 'Failed to update entry.');
      }
    }
  };

  const handleAcceptVersion = async (id) => {
    try {
      await versionAcceptedById(id);
      fetchEntries();
    } catch (error) {
      console.error('Error accepting version:', error);
      Alert.alert('Error', 'Failed to accept version.');
    }
  };

  const openUpdateModal = (item) => {
    setNewEntry({
      applicationName: item.applicationName,
      liveVersion: item.liveVersion,
      testVersion: item.testVersion,
      status: item.status,
    });
    setIsUpdating(true);
    setUpdateEntryId(item.id); 
    setIsModalVisible(true); 
  };

  const renderItem = ({ item }) => (
    <View style={styles.entry}>
      <Text style={styles.text}>App: {item.applicationName}</Text>
      <Text style={styles.text}>Live Version: {item.liveVersion}</Text>
      <Text style={styles.text}>Test Version: {item.testVersion}</Text>
      <Text style={styles.text}>Status: {item.status}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleAcceptVersion(item.id)}>
          <Icon name="check" size={20} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => openUpdateModal(item)}>
          <Icon name="edit" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginBottom: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>-: App Version Management :-</Text>
      </View>

      <Button title="Create Entry" onPress={() => setIsModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{isUpdating ? 'Update Entry' : 'Create New Entry'}</Text>

            <Text style={styles.header}>Application Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Application Name"
              placeholderTextColor="gray"
              value={newEntry.applicationName}
              onChangeText={(text) => setNewEntry({ ...newEntry, applicationName: text })}
            />

            <Text style={styles.header}>Live Version:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Live Version"
              placeholderTextColor="gray"
              value={newEntry.liveVersion}
              onChangeText={(text) => setNewEntry({ ...newEntry, liveVersion: text })}
            />

            <Text style={styles.header}>Test Version:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Test Version"
              placeholderTextColor="gray"
              value={newEntry.testVersion}
              onChangeText={(text) => setNewEntry({ ...newEntry, testVersion: text })}
            />

            <Text style={styles.header}>Status:</Text>
            <Picker
              selectedValue={newEntry.status}
              onValueChange={(itemValue) =>
                setNewEntry({ ...newEntry, status: itemValue })
              }
              style={styles.picker}
            >
              {statusOptions.map((status, index) => (
                <Picker.Item key={index} label={status} value={status} />
              ))}
            </Picker>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={isUpdating ? handleUpdateEntry : handleCreateEntry}>
                <Text style={styles.modalButtonText}>{isUpdating ? 'Update' : 'Submit'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.text}>No entries available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 10,
  },
  header: {
    color: '#316cb5',
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 0,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    color: 'black',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  entry: {
    marginBottom: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  iconButtonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
});

export default AppVersionManagement;
