import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchAllBuildEntries } from '../../Services/BuildService';
import AddBuildModal from './AddBuildModal';
import { stylesforBuildList } from './../../styles/styles';

const BuildListScreen = () => {
    const [builds, setBuilds] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch all builds when the component mounts
    useEffect(() => {
        const getBuilds = async () => {
            setLoading(true); // Start loading when fetching begins
            setError(null); // Reset error before fetching
            try {
                const response = await fetchAllBuildEntries();
                setBuilds(response.data);
            } catch (error) {
                setError('Error fetching builds. Please try again later.');
                console.error('Error fetching builds:', error);
            } finally {
                setLoading(false); // Stop loading when fetching is done
            }
        };

        getBuilds();
    }, []);

    const handleBuildCreated = (newBuild) => {
        // Add new build to the list without fetching all builds again
        setBuilds((prevBuilds) => [newBuild, ...prevBuilds]);
    };

    return (
        <View style={stylesforBuildList.container}>
            {/* Error handling UI */}
            {error && <Text style={stylesforBuildList.error}>{error}</Text>}

            {/* Button to trigger the modal for adding a new build */}
            <Button title="Create New Build" onPress={() => setModalVisible(true)} />

            {/* AddBuildModal to add new build */}
            <AddBuildModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onBuildCreated={handleBuildCreated}
            />

            <Text style={stylesforBuildList.title}>Build Entries</Text>

            {/* Show loading indicator when data is being fetched */}
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={builds}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={stylesforBuildList.buildItem}>
                            <Text>{`App ID: ${item.appId}`}</Text>
                            <Text>{`Version: ${item.versionName}`}</Text>
                            <Text>{`Deployed On: ${item.deployedOn}`}</Text>
                            <Text>{`Tasks: ${item.tasksForBuild}`}</Text>
                            <Text>{item.link ? `Link: ${item.link}` : 'No link available'}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default BuildListScreen;