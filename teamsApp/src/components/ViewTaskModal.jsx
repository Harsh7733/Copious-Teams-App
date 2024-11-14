import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Button } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { updateTask } from '../../Services/TaskService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { stylesforViewTaskModal } from '../../styles/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ViewTaskModal = ({ isVisible, task, sectionName, onClose, tags, users, sections }) => {
    const [loading, setLoading] = useState(true);
    const [updatedSectionName, setUpdatedSectionName] = useState(sectionName);
    const [updatedTaskName, setUpdatedTaskName] = useState(task?.taskName || '');
    const [updatedDueDate, setUpdatedDueDate] = useState(new Date(task?.dueDate || Date.now()));
    const [updatedAssignedTo, setUpdatedAssignedTo] = useState(task?.taskAssignedToID || '');
    const [updatedStatus, setUpdatedStatus] = useState(task?.status || 'Pending');
    const [updatedTags, setUpdatedTags] = useState(task?.tagIDs || []);
    const [updatedDescription, setUpdatedDescription] = useState(task?.taskDescription || '');
    const [mediaFiles, setMediaFiles] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false); // For Add Tag Modal
    const [selectedTag, setSelectedTag] = useState('');
    const [customTag, setCustomTag] = useState('');
    const [, setTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);

    useEffect(() => {
        if (isVisible && task) {
            setUpdatedSectionName(task.sectionName);
            setUpdatedTaskName(task.taskName);
            setUpdatedDueDate(new Date(task.dueDate));
            setUpdatedAssignedTo(task.taskAssignedToID);
            setUpdatedStatus(task.status);
            setUpdatedTags(task.tagIDs || []);
            setUpdatedDescription(task.taskDescription);
            setMediaFiles(task.mediaFiles || []);
        } else if (isVisible) {
            setLoading(true);
            fetchTaskData(task?.id).then(fetchedData => {
                setUpdatedSectionName(fetchedData.sectionName);
                setUpdatedTaskName(fetchedData.taskName);
                setUpdatedDueDate(new Date(fetchedData.dueDate));
                setUpdatedAssignedTo(fetchedData.taskAssignedToID);
                setUpdatedStatus(fetchedData.status);
                setUpdatedTags(fetchedData.tagIDs || []);
                setUpdatedDescription(fetchedData.taskDescription);
                setMediaFiles(fetchedData.mediaFiles || []);
                setLoading(false);
            }).catch(err => {
                console.error('Error fetching task data:', err);
                setLoading(false);
            });
        }
    }, [isVisible, task]);

    const fetchTaskData = async (taskId) => {
        const fetchedData = await someFetchService(taskId);
        return fetchedData;
    };

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
            taskName: updatedTaskName,
            sectionName: updatedSectionName,
            dueDate: updatedDueDate.toISOString(), // Send ISO format string
            taskAssignedToID: updatedAssignedTo,
            status: updatedStatus,
            tagIDs: updatedTags,
            taskDescription: updatedDescription,
            mediaFiles: mediaFiles,
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
            taskName: updatedTaskName,
            sectionName: updatedSectionName,
            dueDate: updatedDueDate.toISOString(), // Send ISO format string
            taskAssignedToID: updatedAssignedTo,
            tagIDs: updatedTags,
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
        setImagePreview(null);
    };

    const onDateChange = (event, selectedDate) => {
        if (event.type === 'set' && selectedDate) {
            setUpdatedDueDate(selectedDate); 
            setShowDatePicker(false); 
        } else {
            setShowDatePicker(false); 
        }
    };

    const handleTagSelect = (itemValue) => {
        const selectedTag = availableTags.find(tag => tag.id === itemValue);
        if (selectedTag && !updatedTags.includes(selectedTag.id)) {
            setUpdatedTags(prev => [...prev, selectedTag.id]);
        }
        setSelectedTag(itemValue);
    };

    const handleAddCustomTag = async () => {
        if (!customTag.trim()) {
            Alert.alert('Error', 'Tag name cannot be empty');
            return;
        }
        const tag = { tagName: customTag.trim() };
        try {
            const savedTag = await saveTag(tag);
            setAvailableTags(prev => [...prev, savedTag]);
            setTags(prev => [...prev, savedTag]);
            setCustomTag('');
        } catch (error) {
            Alert.alert('Error', 'Failed to save custom tag: ' + error.message);
        }
    };

    const handleTagRemove = (tagId) => {
        const updatedTags = tags.filter(tag => tag.id !== tagId);
        setTags(updatedTags);
    };

    return (
        <Modal style={stylesforViewTaskModal.modalMain} animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <View style={stylesforViewTaskModal.modalContainer}>
                <View style={stylesforViewTaskModal.modalContent}>
                    <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                        <Ionicons name="close-circle" size={30} color="black" />
                    </TouchableOpacity>

                    <ScrollView contentContainerStyle={stylesforViewTaskModal.scrollViewContent}>
                        <Text style={stylesforViewTaskModal.header}>Section Name :</Text>
                        <Picker
                            selectedValue={updatedSectionName}
                            style={stylesforViewTaskModal.picker}
                            onValueChange={(itemValue) => setUpdatedSectionName(itemValue)}
                        >
                            <Picker.Item label="Select a section" value="" />
                            {sections && sections.map((section) => (
                                <Picker.Item
                                    key={section.id || `section-${section.sectionName}`}
                                    label={sectionName}
                                    value={section.sectionName}
                                />
                            ))}
                        </Picker>

                        <Text style={stylesforViewTaskModal.header}>Task Name :</Text>
                        <TextInput
                            style={stylesforViewTaskModal.input}
                            value={updatedTaskName}
                            onChangeText={setUpdatedTaskName}
                        />

                        <Text style={stylesforViewTaskModal.header}>Due Date :</Text>
                        <TextInput
                            placeholder="Due Date (DD/MM/YYYY)"
                            placeholderTextColor="gray"
                            value={formatDate(updatedDueDate)}
                            onFocus={() => setShowDatePicker(true)}
                            style={stylesforViewTaskModal.input}
                        />

                        {showDatePicker && (
                            <DateTimePicker
                                value={updatedDueDate}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                            />
                        )}

                        <Text style={stylesforViewTaskModal.header}>Assigned To:</Text>
                        <View style={stylesforViewTaskModal.pickerContainer}>
                            <Picker
                                selectedValue={updatedAssignedTo}
                                style={stylesforViewTaskModal.picker}
                                onValueChange={setUpdatedAssignedTo}
                            >
                                {users.map(user => (
                                    <Picker.Item key={user.id} label={user.userName} value={user.id} />
                                ))}
                            </Picker>
                            <Icon name="keyboard-arrow-down" color="#000000" size={25} style={stylesforViewTaskModal.icon} />
                        </View>

                        <Text style={stylesforViewTaskModal.header}>Status:</Text>
                        <View style={stylesforViewTaskModal.pickerContainer}>
                            <Picker
                                selectedValue={updatedStatus}
                                onValueChange={setUpdatedStatus}
                                style={stylesforViewTaskModal.input}
                            >
                                <Picker.Item label="Not Started" value="Not Started" />
                                <Picker.Item label="On Hold" value="On Hold" />
                                <Picker.Item label="In Progress" value="In Progress" />
                                <Picker.Item label="Completed" value="Completed" />
                            </Picker>
                            <Icon name="keyboard-arrow-down" color="#000000" size={25} style={stylesforViewTaskModal.icon} />
                        </View>

                        <Text style={stylesforViewTaskModal.header}>Tags:</Text>
                        <TextInput
                            style={stylesforViewTaskModal.input}
                            value={getTagNamesByIds(updatedTags).join(', ')}
                            onChangeText={(text) => setUpdatedTags(text.split(',').map(tag => tag.trim()))}
                            placeholder="Add tags (comma separated)"
                        />
                        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                            <Text style={stylesforViewTaskModal.addButton}>+ Add Tag</Text>
                        </TouchableOpacity>

                        {updatedTags.length > 0 && (
                            <View style={stylesforViewTaskModal.selectedTagsContainer}>
                                {getTagNamesByIds(updatedTags).map((tag, index) => (
                                    <View key={index} style={stylesforViewTaskModal.selectedTagContainer}>
                                        <Text style={stylesforViewTaskModal.selectedTag}>{tag}</Text>
                                        <TouchableOpacity onPress={() => handleTagRemove(tag)}>
                                            <Text style={stylesforViewTaskModal.removeTag}>✖</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        )}


                        {/* Add Tag Modal */}
                        <Modal transparent={true} visible={isModalVisible} animationType="slide" onRequestClose={() => setIsModalVisible(false)}>
                            <View style={stylesforViewTaskModal.modalBackground}>
                                <View style={stylesforViewTaskModal.modalContainers}>
                                    <Text style={stylesforViewTaskModal.header}>Select a tag:</Text>
                                    <Picker
                                        selectedValue={selectedTag}
                                        onValueChange={handleTagSelect}
                                        style={stylesforViewTaskModal.picker}
                                    >
                                        <Picker.Item label="Select a tag" value="" />
                                        {tags.map((tag) => (
                                            <Picker.Item key={tag.id} label={tag.tagName} value={tag.id} />
                                        ))}
                                    </Picker>

                                    <Text style={stylesforViewTaskModal.header}>Add Custom Tag:</Text>
                                    <TextInput
                                        style={stylesforViewTaskModal.rowinput}
                                        value={customTag}
                                        onChangeText={setCustomTag}
                                        placeholder="Add custom tag"
                                        placeholderTextColor="gray"
                                    />
                                    <TouchableOpacity onPress={handleAddCustomTag}>
                                        <Text style={stylesforViewTaskModal.addTagButton}>Add Tag</Text>
                                    </TouchableOpacity>

                                    {updatedTags.length > 0 && (
                                        <View style={stylesforViewTaskModal.selectedTagsContainer}>
                                            {getTagNamesByIds(updatedTags).map((tag, index) => (
                                                <View key={index} style={stylesforViewTaskModal.selectedTagContainer}>
                                                    <Text style={stylesforViewTaskModal.selectedTag}>{tag}</Text>
                                                    <TouchableOpacity onPress={() => handleTagRemove(tag)}>
                                                        <Text style={stylesforViewTaskModal.removeTag}>✖</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                        </View>
                                    )}

                                    <Button title="Save" onPress={() => setIsModalVisible(false)} />
                                </View>
                            </View>
                        </Modal>


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

                    <View style={stylesforViewTaskModal.FooterButton}>
                        <TouchableOpacity onPress={handleCompleteTask} style={[styles.button, styles.completeButton]}>
                            <Text style={styles.buttonText}>Completed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSaveTask} style={[styles.saveButton]} disabled={isSaving}>
                            <Text style={styles.buttonText}>{isSaving ? 'Saving...' : 'Save'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Image Preview Modal */}
            {imagePreview && (
                <Modal animationType="fade" transparent={true} visible={!!imagePreview} onRequestClose={closeImagePreview}>
                    <View style={styles.imagePreviewModal}>
                        <TouchableOpacity style={styles.closeImagePreview} onPress={closeImagePreview}>
                            <Ionicons name="close-circle" size={40} color="white" />
                        </TouchableOpacity>
                        <Image source={{ uri: imagePreview }} style={styles.imagePreview} />
                    </View>
                </Modal>
            )}
        </Modal>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    completeButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#249605',
    },
    saveButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#0080ff',
    },
    closeIcon: {
        position: 'absolute',
        top: -10,
        right: -2,
        color: 'red',
        zIndex: 10,
    },
    scrollViewContent: {
        paddingBottom: 100,
    },
    mediaContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    mediaFile: {
        width: 80,
        height: 80,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    imagePreviewModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    closeImagePreview: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    imagePreview: {
        width: '90%',
        height: '80%',
        resizeMode: 'contain',
    },
});

export default ViewTaskModal;