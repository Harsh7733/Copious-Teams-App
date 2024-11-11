import React from 'react';
import { Modal, View, Text, ScrollView, TextInput, Button } from 'react-native';
import { stylesforAddSectionModal } from './../../styles/styles';
import { saveSection } from '../../Services/SectionService'; 

const AddSectionModal = ({ visible, onClose, onSave }) => {
  const [sectionName, setSectionName] = React.useState('');
  const [error, setError] = React.useState(''); 

  const handleSave = async () => {
    if (sectionName) {
      setError(''); 

      try {
        const sectionData = { sectionName }; 
        const response = await saveSection(sectionData);

        if (response.status === 201) {
          onSave({ id: response.data.id, sectionName }); // Pass the new section to the parent
          onClose();  // Close the modal after saving
        } else if (response.status === 409) {
          setError('Section already exists.');
        } else {
          setError('Something went wrong. Please try again.');
        }
      } catch (error) {
        setError(error.message || 'Something went wrong');
      }
    } else {
      setError('Please enter a section name'); 
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={stylesforAddSectionModal.overlay}>
        <View style={stylesforAddSectionModal.modalContainer}>
          <ScrollView contentContainerStyle={stylesforAddSectionModal.scrollContainer}>
            <Text style={stylesforAddSectionModal.header}>Section:</Text>

            <TextInput
              placeholder="Section Name"
              placeholderTextColor="gray"
              value={sectionName}
              onChangeText={setSectionName}
              style={stylesforAddSectionModal.input}
            />

            {error ? (
              <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> // Show error message
            ) : null}

            <View style={stylesforAddSectionModal.FooterButton}>
              <Button title="Add Section" onPress={handleSave} />
              <Button title="Cancel" onPress={onClose} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddSectionModal;