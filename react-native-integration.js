// Install necessary packages:
// npm install @react-navigation/native @react-navigation/stack axios

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';

const API_URL = 'http://marsaty.com/api';

const HomeScreen = ({ navigation }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const userId = 'user-id-here'; // Replace with actual user ID
      const response = await axios.get(`${API_URL}/recommendations/${userId}`);
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <Text>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended for You</Text>
      <FlatList
        data={recommendations}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const ProductDetailsScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text>Category: {product.category}</Text>
      <Text>Vendor: {product.vendor}</Text>
      <Text>Features: {product.features.join(', ')}</Text>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
