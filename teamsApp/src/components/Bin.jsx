// BinScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { stylesforScreen } from '../../styles/styles';

const BinScreen = ({ binItems, addItemToBin }) => {
  const [binItemName, setBinItemName] = useState('');

  const handleAddToBin = () => {
    if (binItemName) {
      addItemToBin(binItemName);
      setBinItemName(''); // Clear input after adding
    }
  };

  return (
    <View style={stylesforScreen.container}>
      <Text style={stylesforScreen.title}>Bin</Text>

      <TouchableOpacity
        style={stylesforScreen.addButton}
        onPress={handleAddToBin}
      >
        <Text style={stylesforScreen.addButtonText}>Add Item to Bin</Text>
      </TouchableOpacity>

      <FlatList
        data={binItems}
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

export default BinScreen;
