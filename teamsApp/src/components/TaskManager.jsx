import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { getSections } from '../../Services/sectionServices';
import { getTasksBySection } from '../../Services/TaskService';
import TaskList from '../components/TaskList';

const TaskManager = () => {
    const [sections, setSections] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sectionResponse = await getSections();
                setSections(sectionResponse.data); // Assuming sections are in response.data

                // Fetch tasks for each section
                const tasksResponse = await Promise.all(
                    sectionResponse.data.map(section => getTasksBySection(section.id))
                );

                const allTasks = tasksResponse.flatMap(response => response.data);
                setTasks(allTasks); // Set all tasks combined
            } catch (err) {
                setError('Failed to fetch data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View>
            <TaskList tasks={tasks} sections={sections} />
        </View>
    );
};

export default TaskManager;
