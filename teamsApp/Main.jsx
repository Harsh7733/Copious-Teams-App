import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import AddTaskModal from './src/components/AddTaskModal';
import AddSectionModal from './src/components/AddSectionModal';
import AddBuildModal from './src/components/AddBuildModal';
import TaskList from './src/components/TaskList';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import Home from './src/components/HomeComponent';
import DailyReport from './src/components/DailyReport';  
import { stylesforMain } from '../teamsApp/styles/styles';

const Main = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [sections, setSections] = useState([]);
  const [builds, setBuilds] = useState([]);
  const [showOptions, setShowOptions] = useState(false); 
  const [activeScreen, setActiveScreen] = useState('home');
  const [modalType, setModalType] = useState(''); 

  const addTask = (task) => {
    setTasks([...tasks, task]);
    setModalVisible(false);
  };

  const addSection = (section) => {
    setSections([...sections, section]);
    setModalVisible(false);
  };

  const addBuild = (build) => {
    setBuilds([...builds, build]);
    setModalVisible(false);
  };

  const handleMyTasksClick = () => {
    setActiveScreen('tasks');
  };

  const handleHomeClick = () => {
    setActiveScreen('home');
  };

  const handleDailyReportClick = () => {
    setActiveScreen('dailyReport');
  };

  const handleAddTaskClick = () => {
    setModalType('task');
    setModalVisible(true);
  };

  const handleAddSectionClick = () => {
    setModalType('section');
    setModalVisible(true);
  };

  const handleAddBuildClick = () => {
    setModalType('build');
    setModalVisible(true);
  };

  const handleAddEntryClick = () => {
    alert('Add entry functionality to be implemented');
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions); 
  };

  return (
    <View style={stylesforMain.container}>
      <Header />
      <View style={stylesforMain.content}>
        {activeScreen === 'home' ? (
          <Home />
        ) : activeScreen === 'dailyReport' ? (
          <DailyReport onAddEntryClick={handleAddEntryClick} />  
        ) : (
          <>
            <TaskList tasks={tasks} sections={sections} builds={builds} />
            {modalVisible && (
              modalType === 'task' ? (
                <AddTaskModal visible={modalVisible} onClose={() => setModalVisible(false)} onSave={addTask} />
              ) : modalType === 'section' ? (
                <AddSectionModal visible={modalVisible} onClose={() => setModalVisible(false)} onSave={addSection} />
              ) : (
                <AddBuildModal visible={modalVisible} onClose={() => setModalVisible(false)} onSave={addBuild} />
              )
            )}
          </>
        )}
      </View>

      {activeScreen === 'tasks' && (
        <>
          <TouchableOpacity
            style={stylesforMain.fab}
            onPress={toggleOptions}
          >
            <Text style={stylesforMain.fabText}>+</Text>
          </TouchableOpacity>

          {showOptions && (
            <View style={stylesforMain.optionsContainer}>
              <TouchableOpacity style={stylesforMain.optionButton} onPress={handleAddTaskClick}>
                <Text style={stylesforMain.optionButtonText}>Add Task</Text>
              </TouchableOpacity>
              <TouchableOpacity style={stylesforMain.optionButton} onPress={handleAddSectionClick}>
                <Text style={stylesforMain.optionButtonText}>Add Section</Text>
              </TouchableOpacity>
              <TouchableOpacity style={stylesforMain.optionButton} onPress={handleAddBuildClick}>
                <Text style={stylesforMain.optionButtonText}>Add Build</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      {/* Footer */}
      <Footer onMyTasksClick={handleMyTasksClick} onHomeClick={handleHomeClick} onDailyReportClick={handleDailyReportClick} />
    </View>
  );
};

export default Main;