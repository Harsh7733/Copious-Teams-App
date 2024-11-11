import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, Modal, Button, TextInput } from 'react-native';
import { getSections, deleteSection, updateSection } from '../../Services/SectionService';
import { stylesforSection } from '../../styles/styles'; 
import Icon from 'react-native-vector-icons/FontAwesome';  

const Sections = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const [sectionToUpdate, setSectionToUpdate] = useState(null);
  const [newSectionName, setNewSectionName] = useState('');

  // Fetch sections on mount
  useEffect(() => {
    const fetchSections = async () => {
      setLoading(true);
      try {
        const response = await getSections();
        setSections(response.data);  
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch sections');
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  // Handle deleting a section
  const handleDelete = async () => {
    if (!sectionToDelete) return;

    try {
      await deleteSection(sectionToDelete.id);
      setSections(sections.filter(section => section.id !== sectionToDelete.id));  
      Alert.alert('Success', 'Section deleted successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete section');
    } finally {
      setIsDeleteModalVisible(false); 
      setSectionToDelete(null); 
    }
  };

  // Handle updating a section
  const handleUpdate = async () => {
    if (!newSectionName.trim()) {
      Alert.alert('Error', 'Section name cannot be empty');
      return;
    }

    try {
      await updateSection({ id: sectionToUpdate.id, sectionName: newSectionName });
      const updatedSections = sections.map(section =>
        section.id === sectionToUpdate.id ? { ...section, sectionName: newSectionName } : section
      );
      setSections(updatedSections);  
      Alert.alert('Success', 'Section updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update section');
    } finally {
      setIsUpdateModalVisible(false); 
      setSectionToUpdate(null);  
      setNewSectionName('');  
    }
  };

  const renderSection = ({ item }) => (
    <View style={stylesforSection.sectionRow}>
      <Text style={stylesforSection.sectionName}>{item.sectionName}</Text>
      <View style={stylesforSection.iconContainer}>
        <TouchableOpacity onPress={() => {
          setSectionToUpdate(item);  
          setNewSectionName(item.sectionName);  
          setIsUpdateModalVisible(true); 
        }}>
          <Icon name="edit" size={20} color="#4CAF50" style={stylesforSection.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setSectionToDelete(item); 
          setIsDeleteModalVisible(true);  
        }}>
          <Icon name="trash" size={20} color="#F44336" style={stylesforSection.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 50 }}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold',color:'white' }}>-: Sections :-</Text>
      </View>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={sections}
          renderItem={renderSection}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        visible={isDeleteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsDeleteModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <Text style={{ fontSize: 18, marginBottom: 20, color: 'black' }}>Are you sure you want to delete this section?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button title="Cancel" onPress={() => setIsDeleteModalVisible(false)} />
              <Button title="Delete" onPress={handleDelete} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Update Section Modal */}
      <Modal
        visible={isUpdateModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsUpdateModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'black', fontWeight: 'bold', }}>Update Section Name</Text>
            <TextInput
              value={newSectionName}
              onChangeText={setNewSectionName}
              style={{ borderWidth: 1, padding: 10, color: 'black',borderColor: '#ddd', borderRadius: 5, marginBottom: 20 }}
              placeholder="Enter new section name"
              placeholderTextColor="black"
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button title="Cancel" onPress={() => setIsUpdateModalVisible(false)} />
              <Button title="Save" onPress={handleUpdate} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Sections