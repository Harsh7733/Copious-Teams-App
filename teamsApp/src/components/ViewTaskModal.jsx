import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Button, TextInput, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { stylesforViewTaskModal } from '../../styles/styles';
import axios from 'axios';

const ViewTaskModal = ({ isVisible, task, sectionName, onClose, tags, users, API_URL }) => {
    const [loading, setLoading] = useState(true);
    const [updatedDescription, setUpdatedDescription] = useState(task?.taskDescription || '');
    const [mediaFiles, setMediaFiles] = useState([]); // Placeholder for media files
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (isVisible) {
            // Only show the modal when all data is available
            setLoading(!(tags.length > 0 && users.length > 0));
        }
    }, [isVisible, tags, users]);

    const getTagNamesByIds = (tagIds) => {
        if (!tagIds || tagIds.length === 0) return ['No Tags'];
        const tagMap = new Map(tags.map(tag => [tag.id, tag.tagName]));
        return tagIds.map(id => tagMap.get(id) || 'Unknown');
    };

    const getUserNameById = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? user.userName : 'Unknown';
    };

    const handleSelectMedia = () => {
        // This would typically open a media picker (image/video). Here's a mock example:
        const mockMedia = [{ uri: 'https://example.com/media-file.jpg' }]; // Placeholder for the selected file(s)
        setMediaFiles(mockMedia);
    };

    const handleSaveTask = async () => {
        if (isSaving) return; // Prevent multiple submissions

        setIsSaving(true);

        const updatedTask = {
            ...task,
            taskDescription: updatedDescription,
            mediaFiles: mediaFiles, // Add media files
        };

        try {
            const response = await axios.put(`${API_URL}/${task.id}`, updatedTask);
            alert('Task updated successfully!');
            onClose(); // Close the modal after saving
        } catch (error) {
            console.error('Failed to update task:', error.response ? error.response.data : error.message);
            alert('Failed to update task');
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
                <View style={stylesforViewTaskModal.modalContainer}>
                    <View style={stylesforViewTaskModal.modalContent}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text>Loading...</Text>
                    </View>
                </View>
            </Modal>
        );
    }

    if (!task) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <View style={stylesforViewTaskModal.modalContainer}>
                <View style={stylesforViewTaskModal.modalContent}>
                    <Text style={stylesforViewTaskModal.header}>Section Name :</Text>
                    <Text style={stylesforViewTaskModal.input}>{sectionName}</Text>

                    <Text style={stylesforViewTaskModal.header}>Task Name :</Text>
                    <Text style={stylesforViewTaskModal.input}>{task.taskName}</Text>

                    <Text style={stylesforViewTaskModal.header}>Due Date :</Text>
                    <Text style={stylesforViewTaskModal.input}>{formatDate(task.dueDate)}</Text>

                    <Text style={stylesforViewTaskModal.header}>Assigned To:</Text>
                    <Text style={stylesforViewTaskModal.input}>
                        {getUserNameById(task.taskAssignedToID)}
                    </Text>

                    <Text style={stylesforViewTaskModal.header}>Status:</Text>
                    <Text style={stylesforViewTaskModal.input}>{task.status}</Text>

                    <Text style={stylesforViewTaskModal.header}>Tags:</Text>
                    <Text style={stylesforViewTaskModal.input}>
                        {getTagNamesByIds(task.tagIDs).join(', ')}
                    </Text>

                    <Text style={stylesforViewTaskModal.header}>Description:</Text>
                    <TextInput
                        style={stylesforViewTaskModal.input}
                        value={updatedDescription}
                        onChangeText={setUpdatedDescription}
                        multiline
                        numberOfLines={4}
                    />

                    <Text style={stylesforViewTaskModal.header}>Media Files:</Text>
                    <TouchableOpacity onPress={handleSelectMedia} style={stylesforViewTaskModal.button}>
                        <Text>Select Media Files</Text>
                    </TouchableOpacity>
                    {mediaFiles.length > 0 && (
                        <View style={stylesforViewTaskModal.mediaContainer}>
                            {mediaFiles.map((file, index) => (
                                <Image key={index} source={{ uri: file.uri }} style={stylesforViewTaskModal.mediaFile} />
                            ))}
                        </View>
                    )}
                    <View style={stylesforViewTaskModal.FooterButton} >
                        <Button title="Completed" onPress={onClose} />
                        <Button title={isSaving ? 'Saving...' : 'Save'} onPress={handleSaveTask} disabled={isSaving} />
                        <Button title="Close" onPress={onClose} />
                    </View>

                </View>
            </View>
        </Modal>
    );
};

export default ViewTaskModal;