import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { stylesforViewTaskModal } from '../../styles/styles'; // Ensure this import is correct
import { launchImageLibrary } from 'react-native-image-picker';
import { updateTask } from '../../Services/TaskService';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ViewTaskModal = ({ isVisible, task, sectionName, onClose, tags, users }) => {
    const [loading, setLoading] = useState(true);
    const [updatedDescription, setUpdatedDescription] = useState(task?.taskDescription || '');
    const [mediaFiles, setMediaFiles] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [imagePreview, setImagePreview] = useState(null); // state for image preview

    useEffect(() => {
        if (isVisible) {
            setLoading(!(tags.length > 0 && users.length > 0));
        }
    }, [isVisible, tags, users]);

    if (!task) {
        return (
            <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
                <View style={stylesforViewTaskModal.modalContainer}>
                    <View style={stylesforViewTaskModal.modalContent}>
                        <Text>Loading task...</Text>
                    </View>
                </View>
            </Modal>
        );
    }

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
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
                quality: 1,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    console.error('ImagePicker Error: ', response.errorMessage);
                } else {
                    if (response.assets && response.assets.length > 0 && response.assets[0].uri) {
                        setMediaFiles([...mediaFiles, { uri: response.assets[0].uri }]);
                    } else {
                        console.error('Invalid media file URI', response.assets);
                    }
                }
            }
        );
    };

    const handleSaveTask = async () => {
        if (isSaving) return;

        setIsSaving(true);

        const updatedTask = {
            ...task,
            taskDescription: updatedDescription,
            mediaFiles: mediaFiles, // This might depend on how media is sent to the backend
        };

        try {
            await updateTask(updatedTask);
            alert('Task updated successfully!');
            onClose();
        } catch (error) {
            console.error('Failed to update task:', error.message);
            alert('Failed to update task');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCompleteTask = async () => {
        if (isSaving) return;

        setIsSaving(true);
        const updatedTask = {
            ...task,
            status: 'Completed',
            taskDescription: updatedDescription,
            mediaFiles: mediaFiles,
        };

        try {
            await updateTask(updatedTask);
            alert('Task marked as completed!');
            onClose();
        } catch (error) {
            console.error('Failed to update task:', error.message);
            alert('Failed to mark task as completed');
        } finally {
            setIsSaving(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const closeImagePreview = () => {
        setImagePreview(null); // Close the image preview modal
    };

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <View style={stylesforViewTaskModal.modalContainer}>
                <View style={stylesforViewTaskModal.modalContent}>
                    {/* Close Icon */}
                    <TouchableOpacity onPress={onClose} style={stylesforViewTaskModal.closeIcon}>
                        <Ionicons name="close-circle" size={30} color="black" />
                    </TouchableOpacity>

                    {/* ScrollView for content */}
                    <ScrollView contentContainerStyle={stylesforViewTaskModal.scrollViewContent}>
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
                        <TouchableOpacity onPress={handleSelectMedia} style={stylesforViewTaskModal.buttonMedia}>
                            <Text style={stylesforViewTaskModal.mediaText}> + Upload Media Files</Text>
                        </TouchableOpacity>
                        {mediaFiles.length > 0 && (
                            <View style={stylesforViewTaskModal.mediaContainer}>
                                {mediaFiles.map((file, index) => (
                                    file.uri ? (
                                        <TouchableOpacity key={index} onPress={() => setImagePreview(file.uri)}>
                                            <Image key={index} source={{ uri: file.uri }} style={stylesforViewTaskModal.mediaFile} />
                                        </TouchableOpacity>
                                    ) : (
                                        <Text key={index}>Invalid Media</Text>
                                    )
                                ))}
                            </View>
                        )}
                    </ScrollView>

                    {/* Footer with buttons */}
                    <View style={stylesforViewTaskModal.FooterButton}>
                        <TouchableOpacity
                            onPress={handleCompleteTask}
                            style={[stylesforViewTaskModal.completeButton]}>
                            <Text style={stylesforViewTaskModal.buttonText}>Completed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleSaveTask}
                            style={[stylesforViewTaskModal.saveButton]}
                            disabled={isSaving}>
                            <Text style={stylesforViewTaskModal.buttonText}>{isSaving ? 'Saving...' : 'Save'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Image Preview Modal */}
            {imagePreview && (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={!!imagePreview}
                    onRequestClose={closeImagePreview}
                >
                    <View style={stylesforViewTaskModal.imagePreviewModal}>
                        <TouchableOpacity style={stylesforViewTaskModal.closeImagePreview} onPress={closeImagePreview}>
                            <Ionicons name="close-circle" size={40} color="white" />
                        </TouchableOpacity>
                        <Image source={{ uri: imagePreview }} style={stylesforViewTaskModal.imagePreview} />
                    </View>
                </Modal>
            )}
        </Modal>
    );
};

export default ViewTaskModal;
