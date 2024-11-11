import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { stylesforScreen } from '../../styles/styles';

const BuildScreen = ({ builds, addBuild }) => {
  const [buildName, setBuildName] = useState('');

  const handleAddBuild = () => {
    if (buildName) {
      addBuild(buildName); // Add the new build entry
      setBuildName(''); // Clear the input field
    }
  };

  return (
    <View style={stylesforScreen.container}>
      <Text style={stylesforScreen.title}>Builds</Text>
      
      <TouchableOpacity
        style={stylesforScreen.addButton}
        onPress={handleAddBuild}
      >
        <Text style={stylesforScreen.addButtonText}>Add Build</Text>
      </TouchableOpacity>

      <FlatList
        data={builds}
        renderItem={({ item }) => (
          <View style={stylesforScreen.listItem}>
            <Text style={stylesforScreen.listItemText}>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default BuildScreen;