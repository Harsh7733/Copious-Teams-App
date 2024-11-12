import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getCompletedTasks, updateTask } from '../../Services/TaskService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {stylesforCompletedTasks} from '../../styles/styles'
 
const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  // Fetch completed tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getCompletedTasks();
        setTasks(response.data);
        setIsLoading(false); 
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Handle task restoration (change status to non-completed)
  const restoreTaskStatus = async (taskId) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === taskId);
      if (!taskToUpdate) {
        console.log('Task not found');
        return;
      }

      // Update the task's status to 'In Progress'
      taskToUpdate.status = 'In Progress';

      const response = await updateTask(taskToUpdate);

      // Check for successful update response
      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, status: 'In Progress' } : task
          )
        );
      } else {
        console.log('Failed to update task status:', response);
      }
    } catch (error) {
      console.error('Error restoring task status:', error);
    }
  };

  // Render item for each task
  const renderItem = ({ item }) => (
    <View style={stylesforCompletedTasks.taskContainer}>
      <Text style={stylesforCompletedTasks.taskText}>{item.taskName}</Text>
      <TouchableOpacity onPress={() => restoreTaskStatus(item.id)}>
        <Icon name="restore" size={24} color="green" />
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={stylesforCompletedTasks.container}>
        <Text style={stylesforCompletedTasks.title}>-: Loading Completed Tasks :-</Text>
      </View>
    );
  }

  return (
    <View style={stylesforCompletedTasks.container}>
      <Text style={stylesforCompletedTasks.title}>-: Completed Tasks :-</Text>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default CompletedTasks;
