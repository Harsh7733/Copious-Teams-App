import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { stylesforTaskList } from '../../styles/styles';
import { getSections } from '../../Services/SectionService';
import { getTasksBySection } from '../../Services/TaskService';
import { getTags } from '../../Services/TagService';
import { getUsers } from '../../Services/UserService';
import ViewTaskModal from './ViewTaskModal';
import AddSectionModal from './AddSectionModal';

const TaskList = () => {
  const [sections, setSections] = useState([]);
  const [tasks, setTasks] = useState({});
  const [collapsedSections, setCollapsedSections] = useState({});
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [isAddSectionModalVisible, setIsAddSectionModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedSectionName, setSelectedSectionName] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    refreshSections();
  }, []);

  const refreshSections = async () => {
    try {
      setIsRefreshing(true);
      const sectionResponse = await getSections();
      const sectionData = sectionResponse.data;
      setSections(sectionData);

      const fetchTasks = async () => {
        const tasksData = {};
        for (const section of sectionData) {
          try {
            const taskResponse = await getTasksBySection(section.id);
            // Filter out tasks that are completed or deleted
            const filteredTasks = taskResponse.data.filter(task => task.status !== 'Completed' && task.isDelete === false);
            tasksData[section.id] = filteredTasks;
          } catch (error) {
            console.error('Fetch Tasks Error:', error);
          }
        }
        setTasks(tasksData);
      };


      await fetchTasks();

      const tagResponse = await getTags();
      setTags(tagResponse.data);
      const userResponse = await getUsers();
      setUsers(userResponse.data);

    } catch (error) {
      console.error('Error fetching sections and tasks:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const toggleSection = (sectionId) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const openTaskDetailsModal = (task, sectionName) => {
    setSelectedTask(task);
    setSelectedSectionName(sectionName);
    setIsTaskModalVisible(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalVisible(false);
    setSelectedTask(null);
    setSelectedSectionName('');
  };

  const addNewSection = (newSection) => {
    setSections((prevSections) => {
      const updatedSections = [...prevSections, newSection];
      setCollapsedSections((prev) => ({
        ...prev,
        [newSection.id]: true, // Collapse state is initialized for new section
      }));
      return updatedSections;
    });

    // Fetch tasks for the newly added section
    fetchTasksForNewSection(newSection.id);
  };

  const fetchTasksForNewSection = async (sectionId) => {
    try {
      const taskResponse = await getTasksBySection(sectionId);
      setTasks((prevTasks) => ({
        ...prevTasks,
        [sectionId]: taskResponse.data,
      }));
    } catch (error) {
      console.error('Error fetching tasks for new section:', error);
    }
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={refreshSections}
        />
      }
    >
      {sections.length === 0 ? (
        <Text style={stylesforTaskList.noSections}>No sections available.</Text>
      ) : (
        sections.map((section) => (
          <View key={section.id}>
            <View style={stylesforTaskList.header}>
              <Text style={stylesforTaskList.headerText}>{section.sectionName || 'Unnamed Section'}</Text>
              <TouchableOpacity onPress={() => toggleSection(section.id)}>
                <Icon
                  name={collapsedSections[section.id] ? 'chevron-down' : 'chevron-up'}
                  size={20}
                  color="#ffffff"
                />
              </TouchableOpacity>
            </View>
            <Collapsible collapsed={!collapsedSections[section.id]}>
              <View>
                {tasks[section.id] && tasks[section.id].length > 0 ? (
                  tasks[section.id].map((task) => (
                    <TouchableOpacity key={task.id} onPress={() => openTaskDetailsModal(task, section.sectionName)}>
                      <View style={stylesforTaskList.taskContainer}>
                        <Text style={stylesforTaskList.task}>Task: {task.taskName}</Text>
                        <Text>Due: {formatDate(task.dueDate)}</Text>
                        <Text>Assigned To: {getUserNameById(task.taskAssignedToID)}</Text>
                        <Text>Status: {task.status}</Text>
                        <Text>Tags: {getTagNamesByIds(task.tagIDs).join(', ')}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={stylesforTaskList.noTasks}>No active tasks available.</Text>
                )}
              </View>
            </Collapsible>
          </View>
        ))
      )}

      <ViewTaskModal
        isVisible={isTaskModalVisible}
        task={selectedTask}
        sectionName={selectedSectionName}
        onClose={closeTaskModal}
        tags={tags}
        users={users}
      />

      <AddSectionModal
        visible={isAddSectionModalVisible}
        onClose={() => setIsAddSectionModalVisible(false)}
        onSave={addNewSection}
      />
    </ScrollView>
  );
};

export default TaskList;
