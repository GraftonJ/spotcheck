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

const RADIUS = 100;

import store from '../store';

const config = {
  headers: {'Authorization': 'Bearer VkRXEkxkuMiPqFY3xuJdHIMU3ggnwWrKaeCdL-cMm5Mh0q_b-OyMhmdZDMf8xSrbV0BPdAaPtu0aVY2vlHRCQ1JZzFl0N-ahFSjwDY16uAvQ0YviTfxrydO32n6dW3Yx'},
  params: {
    term: 'dog+friendly+restaurants',
  }
}

const API = 'https://api.yelp.com/v3/businesses/search'

/* *********************************************************
getResults()
@param location (string) ex: "Boulder, CO"
@return array of Yelp businesses with lots of fields!
************************************************************ */
export const getResults = async (location) => {
  config.params.location = location;
  console.log("api::getResults() for: ", location);
  const response = await fetch(`${API}?term=${config.params.term}&location=${location}`, config)
  const json = await response.json()
  return json.businesses
}

/* *********************************************************
getResultsLatLon()
@param lat (number)
@param lon (number)
@return array of Yelp businesses with lots of fields!
// Example lat/lon for Galvanize"
//    latitude=40.016516
//    longitude=-105.281656
// Addl params sent to Yelp
//    sort_by=distance
//    radius=1000
************************************************************ */
export const getResultsLatLon = async (lat, lon) => {
  config.params.location = location
  const response = await fetch(`${API}?term=${config.params.term}&latitude=${lat}&longitude=${lon}&sort_by=distance&radius=${RADIUS}`, config)
  const json = await response.json()
  return json.businesses
}
