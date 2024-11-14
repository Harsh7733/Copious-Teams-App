import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Login from './src/components/Login';
import SignUp from './src/components/SignUp';
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
  const [currentPage, setCurrentPage] = useState('login'); // 'login' or 'signup'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [sections, setSections] = useState([]);
  const [builds, setBuilds] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [activeScreen, setActiveScreen] = useState('home');
  const [modalType, setModalType] = useState('');

  // Function to handle login action
  const handleLogin = () => {
    setIsLoggedIn(true); 
  };

  // Function to handle sign-up action
  const handleSignUp = () => {
    // After sign-up, directly go to login page for verification
    setCurrentPage('login');
  };

  // Function to simulate login after sign-up verification
  const handleVerification = () => {
    // Simulate login process (e.g., validate credentials)
    setIsLoggedIn(true);
    setCurrentPage('home');  // After login, navigate to the home page
  };

  const navigateToSignUp = () => {
    setCurrentPage('signup'); // Navigate to SignUp page
  };

  const navigateToLogin = () => {
    setCurrentPage('login'); // Navigate to Login page
  };

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

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        {currentPage === 'login' ? (
          <Login onLogin={handleLogin} onNavigateToSignUp={navigateToSignUp} />
        ) : (
          <SignUp onSignUp={handleSignUp} onNavigateToLogin={navigateToLogin} />
        )}
        {/* Add a verify button after sign-up */}
        {currentPage === 'signup' && (
          <TouchableOpacity onPress={handleVerification}>
            <Text>Verify Sign Up and Login</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

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

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Main;
