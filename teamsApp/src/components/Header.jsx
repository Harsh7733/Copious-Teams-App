import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Sidebar from './Sidebar';
import VersionManagement from './VersionManagement';
import Section from '../components/Sections';
import { stylesforHeader } from '../../styles/styles';

const Header = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState(null);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const selectSection = (section) => {
    setSelectedScreen(section);
    setSidebarVisible(false); 
  };

  return (
    // <View >
    <View style={{ flex: 1 }}>
      <View style={stylesforHeader.container}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Icon name="bars" size={20} color="#ffffff" style={stylesforHeader.icon} />
        </TouchableOpacity>
        <Text style={stylesforHeader.title}> Copious-Teams</Text>
        <Icon name="bell" size={20} color="#ffffff" style={stylesforHeader.icon} />
      </View>

      <Sidebar isVisible={isSidebarVisible} onClose={toggleSidebar} onSelectSection={selectSection} />

      {selectedScreen === 'Version Management' && <VersionManagement />}
      {selectedScreen === 'Section' && <Section />}
    </View>
  );
};

export default Header;