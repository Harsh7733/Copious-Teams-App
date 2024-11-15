import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Alert, Modal, ScrollView, Button } from 'react-native';
import { createDailyReport, getAllReports } from '../../Services/DailyReportsService';
import { getTasks } from '../../Services/TaskService';
import { getUsers } from '../../Services/UserService';
import { Picker } from '@react-native-picker/picker';
import { stylesforDailyReport } from './../../styles/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DailyReport = () => {
    const [reports, setReports] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [status, setStatus] = useState('');
    const [userId, setUserId] = useState('');
    const [tasks, setTasks] = useState([]);
    const [availableTasks, setAvailableTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [customTask, setCustomTask] = useState('');

    useEffect(() => {
        fetchReports();
        fetchTasks();
        fetchUsers();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await getAllReports();
            const sortedReports = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setReports(sortedReports);
        } catch (error) {
            console.error('Error fetching reports:', error);
            Alert.alert('Error', 'Failed to fetch daily reports');
        }
    };

    const fetchTasks = async () => {
        try {
            const response = await getTasks(); // Fetch tasks
            setAvailableTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            Alert.alert('Error', 'Failed to fetch tasks');
        }

        const token = await AsyncStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.id);
            setCreatedByUserName(decodedToken.userName);
        } else {
            console.error('No token found in local storage');
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await getUsers(); // Fetch users
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            Alert.alert('Error', 'Failed to fetch users');
        }
    };

    const handleCreateReport = async () => {
        if (!taskName || !status || !tasks.length) {
            Alert.alert('Validation Error', 'Please fill all the fields.');
            return;
        }

        try {
            const newReport = {
                userId,
                taskName,
                tasks,
                status,
            };

            await createDailyReport(newReport);
            Alert.alert('Success', 'Daily Report Created Successfully');

            setTaskName('');
            setStatus('');
            setTasks([]);
            setUserId('');
            setCustomTask('');
            fetchReports();
            setModalVisible(false);
        } catch (error) {
            console.error('Error creating report:', error);
            Alert.alert('Error', 'Failed to create daily report');
        }
    };

    // Handle adding custom task
    const handleAddCustomTask = () => {
        if (customTask.trim() !== '') {
            setTasks([{ ...tasks, taskName: customTask }]);
            setCustomTask('');
            setIsModalVisible(false);
        } else {
            Alert.alert('Error', 'Custom task cannot be empty');
        }
    };

    const handleTaskSelection = (taskId) => {
        const selectedTask = availableTasks.find(task => task.id === taskId);
        if (selectedTask) {
            setTasks([...tasks, selectedTask]);
        }
    };

    // Render the reports list
    const renderReportItem = ({ item }) => {
        let taskNames = ' ';
        try {
            let tasksArray = [];
            if (item.tasks) {
                if (typeof item.tasks === 'string') {
                    try {
                        tasksArray = JSON.parse(item.tasks);
                    } catch (error) {
                        console.error('Error parsing tasks:', error);
                    }
                } else if (Array.isArray(item.tasks)) {
                    tasksArray = item.tasks;
                } else {
                    tasksArray = [];
                }
            }

            // Join task names into a string
            taskNames = tasksArray.length > 0 ? tasksArray.map((task) => task.taskName).join(', ') : 'No tasks';

        } catch (error) {
            console.error('Error parsing tasks:', error);
        }

        const user = users.find((user) => user.id === item.userId);
        const userName = user ? user.userName : 'N/A';
        const formattedDate = new Date(item.createdAt).toLocaleDateString();

        return (
            <View style={stylesforDailyReport.cardContainer}>
                <View style={stylesforDailyReport.card}>
                    <Text style={stylesforDailyReport.cardTitle}>Task: {item.taskName}</Text>
                    <Text style={stylesforDailyReport.cardText}>Status: {item.status}</Text>
                    <Text style={stylesforDailyReport.cardText}>Tasks: {taskNames}</Text>
                    <Text style={stylesforDailyReport.cardText}>User: {userName}</Text>
                    <Text style={stylesforDailyReport.cardText}>Date: {formattedDate}</Text>
                </View>
            </View>
        );
    };


    return (
        <ScrollView style={stylesforDailyReport.content}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#ffffff' }}>
                    - : Daily Reports : -
                </Text>
            </View>

            <TouchableOpacity
                style={stylesforDailyReport.button}
                onPress={() => setModalVisible(true)}
            >
                <Text style={stylesforDailyReport.buttonText}>+ Add Daily Report</Text>
            </TouchableOpacity>

            {/* Modal for Adding Daily Report */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={stylesforDailyReport.modalBackground}>
                    <View style={stylesforDailyReport.modalContainer}>
                        <Text style={stylesforDailyReport.modalTitle}>Add Daily Report</Text>

                        <Text style={stylesforDailyReport.header}>Task Name :</Text>
                        <TextInput
                            style={stylesforDailyReport.input}
                            placeholder="Task Name"
                            placeholderTextColor="gray"
                            value={taskName}
                            onChangeText={setTaskName}
                        />

                        {/* Status Picker */}
                        <Text style={stylesforDailyReport.header}>Task Status :</Text>
                        <View style={stylesforDailyReport.picker}>
                            <Picker
                                selectedValue={status}
                                style={stylesforDailyReport.input}
                                onValueChange={(itemValue) => setStatus(itemValue)}
                            >
                                <Picker.Item label="Select Status" value="" />
                                <Picker.Item label="In Progress" value="In Progress" />
                                <Picker.Item label="On Hold" value="On Hold" />
                                <Picker.Item label="Completed" value="Completed" />
                            </Picker>
                            <Icon name="keyboard-arrow-down" color="#000000" size={25} style={stylesforDailyReport.icon} />
                        </View>

                        {/* Tasks Picker */}
                        <View style={stylesforDailyReport.containers}>
                            <Text style={stylesforDailyReport.header}>Tasks:</Text>
                            <TouchableOpacity style={stylesforDailyReport.addButton} onPress={() => setIsModalVisible(true)}>
                                <Text style={stylesforDailyReport.addButtonText}> + Add Task</Text>
                            </TouchableOpacity>

                            <Modal
                                transparent={true}
                                visible={isModalVisible}
                                animationType="slide"
                                onRequestClose={() => setIsModalVisible(false)}
                            >
                                <View style={stylesforDailyReport.modalBackground}>
                                    <View style={stylesforDailyReport.modalContainers}>
                                        <View style={stylesforDailyReport.picker}>
                                            <Picker
                                                selectedValue={tasks.map(task => task.id)}
                                                style={stylesforDailyReport.picker}
                                                onValueChange={(itemValue) => handleTaskSelection(itemValue)}
                                            >
                                                <Picker.Item label="Select a task" value="" />
                                                {availableTasks.map((task) => (
                                                    <Picker.Item key={task.id} label={task.taskName} value={task.id} />
                                                ))}
                                            </Picker>
                                            <Icon
                                                name="keyboard-arrow-down"
                                                color="#000000"
                                                size={25}
                                                style={stylesforDailyReport.icon}
                                            />
                                        </View>

                                        {/* Add custom task */}
                                        <TextInput
                                            style={stylesforDailyReport.input}
                                            placeholder="Add Custom Task"
                                            placeholderTextColor="gray"
                                            value={customTask}
                                            onChangeText={setCustomTask}
                                        />
                                        <View style={stylesforDailyReport.FooterButton} >
                                            <Button
                                                style={stylesforDailyReport.buttonContainer}
                                                title="Close"
                                                onPress={() => setIsModalVisible(false)}
                                            />
                                            <Button title="Add Task" onPress={handleAddCustomTask} />
                                        </View>
                                    </View>
                                </View>
                            </Modal>

                            {/* Display Selected Tasks */}
                            {tasks.map((task, index) => (
                                <View key={index} style={stylesforDailyReport.selectedTagContainer}>
                                    <Text style={stylesforDailyReport.tasks}>{task.taskName}</Text>
                                </View>
                            ))}
                        </View>

                        {/* User Picker */}
                        {/* <Text style={stylesforDailyReport.header}>User Name :</Text>
                        <View style={stylesforDailyReport.picker}>
                            <Picker
                                selectedValue={userId}
                                style={stylesforDailyReport.input}
                                onValueChange={(itemValue) => setUserId(itemValue)}
                            >
                                <Picker.Item label="Select User" value="" />
                                {users.map((user) => (
                                    <Picker.Item key={user.id} label={user.userName} value={user.id} />
                                ))}
                            </Picker>
                            <Icon
                                name="keyboard-arrow-down"
                                color="#000000"
                                size={25}
                                style={stylesforDailyReport.icon}
                            />
                        </View> */}

                        {/* Buttons inside the Modal */}
                        <View style={stylesforDailyReport.modalButtonsContainer}>
                            <TouchableOpacity
                                style={stylesforDailyReport.buttons}
                                onPress={() => setModalVisible(false)} // Close the modal
                            >
                                <Text style={stylesforDailyReport.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={stylesforDailyReport.buttons}
                                onPress={handleCreateReport}
                            >
                                <Text style={stylesforDailyReport.buttonText}>Create Report</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* FlatList for displaying reports */}
            <FlatList
                data={reports}
                renderItem={renderReportItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ marginTop: 20 }}
            />
        </ScrollView>
    );
};

export default DailyReport;
