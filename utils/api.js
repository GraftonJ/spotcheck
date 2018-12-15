import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  ImageBackground,
  Image,
  Alert,
  TouchableOpacity} from 'react-native';

  import store from '../store';

  const config = {
    headers: {'Authorization': 'Bearer VkRXEkxkuMiPqFY3xuJdHIMU3ggnwWrKaeCdL-cMm5Mh0q_b-OyMhmdZDMf8xSrbV0BPdAaPtu0aVY2vlHRCQ1JZzFl0N-ahFSjwDY16uAvQ0YviTfxrydO32n6dW3Yx'},
    params: {
      term: 'dog+friendly+restaurants',
    }
  }

  const API = 'https://api.yelp.com/v3/businesses/search'

  export const getResults = async (location) => {
    config.params.location = location
    const response = await fetch(`${API}?term=${config.params.term}&location=${location}`, config)
    const json = await response.json()
    return json.businesses
  }
