import React, { useState } from 'react';
import { Modal, View, Text, ScrollView, TextInput, Button } from 'react-native';
import { stylesforAddBuildModal } from './../../styles/styles';
import { createBuildEntry } from '../../Services/BuildService';

const AddBuildModal = ({ visible, onClose, onBuildCreated }) => {
    const [buildData, setBuildData] = useState({
        appId: '',
        deployedOn: '',
        versionName: '',
        link: '',
        tasksForBuild: '',
    });

    const handleInputChange = (field, value) => {
        setBuildData({
            ...buildData,
            [field]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await createBuildEntry(buildData);
            console.log('Build Created:', response.data);
            onBuildCreated(); n
            onClose();
        } catch (error) {
            console.error('Error creating build entry:', error);
        }
    };


    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={stylesforAddBuildModal.overlay}>
                <View style={stylesforAddBuildModal.modalContainer}>
                    <ScrollView contentContainerStyle={stylesforAddBuildModal.scrollContainer}>
                        <Text style={stylesforAddBuildModal.headers}>Create New Build</Text>

                        <Text style={stylesforAddBuildModal.header}>Application Name : </Text>
                        <TextInput
                            style={stylesforAddBuildModal.input}
                            placeholder="Application Name" placeholderTextColor="gray"
                            value={buildData.appId}
                            onChangeText={(text) => handleInputChange('appId', text)}
                        />

                        <Text style={stylesforAddBuildModal.header}>Deployed On : </Text>
                        <TextInput
                            style={stylesforAddBuildModal.input}
                            placeholder="Deployed On"
                            placeholderTextColor="gray"
                            value={buildData.deployedOn}
                            onChangeText={(text) => handleInputChange('deployedOn', text)}
                        />

                        <Text style={stylesforAddBuildModal.header}>Version Name : </Text>
                        <TextInput
                            style={stylesforAddBuildModal.input}
                            placeholder="Version Name"
                            placeholderTextColor="gray"
                            value={buildData.versionName}
                            onChangeText={(text) => handleInputChange('versionName', text)}
                        />

                        <Text style={stylesforAddBuildModal.header}>Media : </Text>
                        <TextInput
                            style={stylesforAddBuildModal.input}
                            placeholder="Link (optional)"
                            placeholderTextColor="gray"
                            value={buildData.link}
                            onChangeText={(text) => handleInputChange('link', text)}
                        />

                        <Text style={stylesforAddBuildModal.header}>Application Name : </Text>
                        <TextInput
                            style={[stylesforAddBuildModal.input]}
                            placeholder="Tasks for Build"
                            placeholderTextColor="gray"
                            value={buildData.tasksForBuild}
                            onChangeText={(text) => handleInputChange('tasksForBuild', text)}
                        />

                        <View style={stylesforAddBuildModal.FooterButton}>
                            <Button title="Create Build" color="teal" onPress={handleSubmit} />
                            <Button title="Cancel" onPress={onClose} />
                        </View>
                    </ScrollView>
                </View>
            </View >
        </Modal >
    );
};

export default AddBuildModal;