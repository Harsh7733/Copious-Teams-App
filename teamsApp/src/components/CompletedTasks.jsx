import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getCompletedTasks, updateTask } from '../../Services/TaskService';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  // Fetch completed tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getCompletedTasks();
        setTasks(response.data);
        setIsLoading(false); // Set loading state to false after data is fetched
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
        // Update the state by replacing the task with the updated task
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
    <View style={styles.taskContainer}>
      <Text style={styles.taskText}>{item.taskName}</Text>
      <TouchableOpacity onPress={() => restoreTaskStatus(item.id)}>
        <Icon name="restore" size={24} color="green" />
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>-: Loading Completed Tasks :-</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>-: Completed Tasks :-</Text>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    marginBottom: -70,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#ffffff',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  taskText: {
    fontSize: 16,
    color: '#316cb5',
    fontWeight: 'bold',
  },
});

export default CompletedTasks;
