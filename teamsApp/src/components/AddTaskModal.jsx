import React, { useState, useEffect } from 'react';
import { View, Modal, Button, TextInput, ScrollView, Text, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { stylesforAddTaskModal } from './../../styles/styles';
import { saveTask } from '../../Services/TaskService';
import { getTags, saveTag } from '../../Services/TagService';
import { getSections } from '../../Services/SectionService';
import { getUsers } from '../../Services/UserService';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddTaskModal = ({ visible, onClose, onSave, userId, }) => {
    const [sectionID, setSectionID] = useState('');
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [customTag, setCustomTag] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [assignedToID, setAssignedToID] = useState('');
    const [status, setStatus] = useState('Not Started');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [sections, setSections] = useState([]);
    const [users, setUsers] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const handleSave = async () => {
        if (!taskName || !sectionID) {
            Alert.alert('Error', 'Task name and section ID are required!');
            return;
        }

        const task = {
            taskName,
            description,
            dueDate: formatDate(dueDate),
            subTask: '',
            taskAssignedToID: assignedToID,
            taskCreatedByID: userId || null,
            status,
            sectionID,
            tagIDs: tags.map(tag => tag.id),
        };

        try {
            await saveTask(task);
            Alert.alert('Success', 'Task saved successfully!');
            onSave(task);
            resetFields();
        } catch (error) {
            console.error('Error saving task:', error);
            Alert.alert('Error', error.message);
        }
    };

    const resetFields = () => {
        setSectionID('');
        setTaskName('');
        setDescription('');
        setTags([]);
        setCustomTag('');
        setDueDate(new Date());
        setAssignedToID('');
        setStatus('Not Started');
        setSelectedTag('');
    };

    const handleDateChange = (event, selectedDate) => {
        if (event.type === 'set') {
            setDueDate(selectedDate);
        }
        setShowDatePicker(false);
    };

    const fetchSections = async () => {
        try {
            const response = await getSections();
            setSections(response.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to load sections');
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to load users');
        }
    };

    const fetchTags = async () => {
        try {
            const response = await getTags();
            setAvailableTags(response.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to load tags');
        }
    };

    useEffect(() => {
        if (visible) {
            fetchSections();
            fetchUsers();
            fetchTags();
        }
    }, [visible]);

    const handleTagSelect = (itemValue) => {
        const selectedTag = availableTags.find(tag => tag.id === itemValue);
        if (selectedTag && !tags.find(tag => tag.id === selectedTag.id)) {
            setTags(prev => [...prev, selectedTag]);
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
            Alert.alert('Error', 'Failed to save custom tag: ' + errorMessage);
        }
    };

    const handleTagRemove = (tagId) => {
        const updatedTags = tags.filter(tag => tag.id !== tagId);
        setTags(updatedTags);
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={stylesforAddTaskModal.overlay}>
                <View style={stylesforAddTaskModal.modalContainer}>
                    <ScrollView contentContainerStyle={stylesforAddTaskModal.scrollContainer}>
                        <Text style={stylesforAddTaskModal.header}>Section:</Text>
                        <View style={stylesforAddTaskModal.pickerContainer}>
                            <Picker
                                selectedValue={sectionID}
                                style={stylesforAddTaskModal.picker}
                                onValueChange={(itemValue) => setSectionID(itemValue)}
                            >
                                <Picker.Item label="Select a section" value="" />
                                {sections.map((section) => (
                                    <Picker.Item
                                        key={section.id || `section-${section.sectionName}`} // Fallback to name if id is missing
                                        label={section.sectionName}
                                        value={section.id}
                                    />
                                ))}

                            </Picker>
                            <Icon name="keyboard-arrow-down" color="#000000" size={25} style={stylesforAddTaskModal.icon} />
                        </View>

                        <Text style={stylesforAddTaskModal.header}>Task Name:</Text>
                        <TextInput
                            placeholder="Task Name"
                            placeholderTextColor="gray"
                            value={taskName}
                            onChangeText={setTaskName}
                            style={stylesforAddTaskModal.input}
                        />

                        <Text style={stylesforAddTaskModal.header}>Assigned To:</Text>
                        <View style={stylesforAddTaskModal.pickerContainer}>
                            <Picker
                                selectedValue={assignedToID}
                                style={stylesforAddTaskModal.picker}
                                onValueChange={(itemValue) => setAssignedToID(itemValue)}
                            >
                                <Picker.Item label="Select a user" value="" />
                                {users.map(user => (
                                    <Picker.Item key={user.id} label={user.userName} value={user.id} />
                                ))}
                            </Picker>
                            <Icon name="keyboard-arrow-down" color="#000000" size={25} style={stylesforAddTaskModal.icon} />
                        </View>

                        <View style={stylesforAddTaskModal.containers}>
                            <Text style={stylesforAddTaskModal.header}>Tags:</Text>

                            <TouchableOpacity style={stylesforAddTaskModal.addButton} onPress={() => setIsModalVisible(true)}>
                                <Text style={stylesforAddTaskModal.addButtonText}> + Add Tag</Text>
                            </TouchableOpacity>

                            <Modal
                                transparent={true}
                                visible={isModalVisible}
                                animationType="slide"
                                onRequestClose={() => setIsModalVisible(false)}
                            >
                                <View style={stylesforAddTaskModal.modalBackground}>
                                    <View style={stylesforAddTaskModal.modalContainers}>
                                        <View style={stylesforAddTaskModal.picker}>
                                            <Picker
                                                selectedValue={selectedTag}
                                                style={stylesforAddTaskModal.picker}
                                                onValueChange={handleTagSelect}
                                            >
                                                <Picker.Item label="Select a tag" value="" />
                                                {availableTags.map((tag) => (
                                                    <Picker.Item
                                                        key={tag.id || `tag-${tag.tagName}`}
                                                        label={tag.tagName}
                                                        value={tag.id}
                                                    />
                                                ))}

                                            </Picker>
                                            <Icon
                                                name="keyboard-arrow-down"
                                                color="#000000"
                                                size={25}
                                                style={stylesforAddTaskModal.icon}
                                            />
                                        </View>

                                        <Text style={stylesforAddTaskModal.header}>Add Custom Tag:</Text>
                                        <View style={stylesforAddTaskModal.rowContainer}>
                                            <TextInput
                                                placeholder="Add custom tag"
                                                placeholderTextColor="gray"
                                                value={customTag}
                                                onChangeText={setCustomTag}
                                                style={stylesforAddTaskModal.rowinput}
                                            />
                                            <Button title="Add Tag" onPress={handleAddCustomTag} />
                                        </View>


                                        {tags.map((tag, index) => (
                                            <View
                                                key={tag.id || `tag-${index}`} // Use the tag's id if available, otherwise use index
                                                style={stylesforAddTaskModal.selectedTagContainer}
                                            >
                                                <Text style={stylesforAddTaskModal.selectedTag}>{tag.tagName}</Text>
                                                <TouchableOpacity onPress={() => handleTagRemove(tag.id)}>
                                                    <Text style={stylesforAddTaskModal.removeTag}>✖</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ))}

                                        <View>
                                            <Button
                                                style={stylesforAddTaskModal.buttonContainer}
                                                title="Save"
                                                onPress={() => setIsModalVisible(false)} />
                                        </View>
                                    </View>
                                </View>
                            </Modal>

                            {tags.map((tag, index) => (
                                <View
                                    key={tag.id || `tag-${index}`} // Use the tag's id if available, otherwise use index
                                    style={stylesforAddTaskModal.selectedTagContainer}
                                >
                                    <Text style={stylesforAddTaskModal.selectedTag}>{tag.tagName}</Text>
                                    <TouchableOpacity onPress={() => handleTagRemove(tag.id)}>
                                        <Text style={stylesforAddTaskModal.removeTag}>✖</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}


                        </View>

                        <Text style={stylesforAddTaskModal.header}>Due Date:</Text>
                        <TextInput
                            placeholder="Due Date (DD/MM/YYYY)"
                            placeholderTextColor="gray"
                            value={formatDate(dueDate)}
                            onFocus={() => setShowDatePicker(true)}
                            style={stylesforAddTaskModal.input}
                        />
                        {showDatePicker && (
                            <DateTimePicker
                                value={dueDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}

                        <View style={stylesforAddTaskModal.FooterButton} >
                            <Button title="Save Task" onPress={handleSave} />
                            <Button title="Cancel" onPress={onClose} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default AddTaskModal;