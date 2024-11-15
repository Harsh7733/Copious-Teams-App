import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { stylesforSidebar } from '../../styles/styles';

const Sidebar = ({ isVisible, onClose, onSelectSection }) => {
  const [slideAnim] = useState(new Animated.Value(-250));

  // Trigger the slide animation based on the visibility of the sidebar
  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={stylesforSidebar.overlay}>
        <Animated.View
          style={[stylesforSidebar.sidebarContainer, { transform: [{ translateX: slideAnim }] }]}
        >
          <TouchableOpacity onPress={onClose}>
            <Icon name="times" size={25} color="#000000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesforSidebar.Button}
            onPress={() => onSelectSection('Add Build')}
          >
            <View style={stylesforSidebar.AlignRow}>
              <Icon name="plus-circle" size={20} color="#fff" />
              <Text style={stylesforSidebar.item}>Add Build</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesforSidebar.Button}
            onPress={() => onSelectSection('QA / Tester')}
          >
            <View style={stylesforSidebar.AlignRow}>
              <Icon name="check-circle" size={20} color="#fff" />
              <Text style={stylesforSidebar.item}>QA / Tester</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesforSidebar.Button}
            onPress={() => onSelectSection('My Tasks')}
          >
            <View style={stylesforSidebar.AlignRow}>
              <Icon name="tasks" size={20} color="#fff" />
              <Text style={stylesforSidebar.item}>My Tasks</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesforSidebar.Button}
            onPress={() => onSelectSection('Completed Tasks')}
          >
            <View style={stylesforSidebar.AlignRow}>
              <Icon name="check-square" size={20} color="#fff" />
              <Text style={stylesforSidebar.item}>Completed Tasks</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesforSidebar.Button}
            onPress={() => onSelectSection('Section')}
          >
            <View style={stylesforSidebar.AlignRow}>
              <Icon name="folder" size={20} color="#fff" />
              <Text style={stylesforSidebar.item}>Section</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesforSidebar.Button}
            onPress={() => onSelectSection('Users')}
          >
            <View style={stylesforSidebar.AlignRow}>
              <Icon name="users" size={20} color="#fff" />
              <Text style={stylesforSidebar.item}>Users</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesforSidebar.Button}
            onPress={() => onSelectSection('Version Management')}
          >
            <View style={stylesforSidebar.AlignRow}>
              <Icon name="cogs" size={20} color="#fff" />
              <Text style={stylesforSidebar.item}>Version Management</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesforSidebar.Button}
            onPress={() => onSelectSection('App Version Management')}
          >
            <View style={stylesforSidebar.AlignRow}>
              <Icon name="mobile" size={20} color="#fff" />
              <Text style={stylesforSidebar.item}>App Version Management</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesforSidebar.Button}
            onPress={() => onSelectSection('Bin')}
          >
            <View style={stylesforSidebar.AlignRow}>
              <Icon name="trash" size={20} color="#fff" />
              <Text style={stylesforSidebar.item}>Bin</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Sidebar;
