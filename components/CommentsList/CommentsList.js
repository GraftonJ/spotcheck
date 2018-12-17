import React from 'react';
import {StyleSheet, Dimensions, Text, View, SafeAreaView, ImageBackground, Image, Alert, Button, ScrollView, ActivityIndicator} from 'react-native'
import store, { URI } from '../../store'
import { getResults } from '../../utils/api'
import Stars from '../Stars.js'

const CommentsList = () => (
  <SafeAreaView style={styles.card}>
  <Text>This is where the comments go</Text>
</SafeAreaView>
)




const styles = StyleSheet.create({
  card: {
    width: 330,
    height: 365,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    margin: 15,
    marginBottom: 0,
    backgroundColor: '#F4F4F4'
  },
})

export default CommentsList
