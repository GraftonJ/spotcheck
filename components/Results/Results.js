
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

  import store from '../../store';


const Results = () => (
  <SafeAreaView style={styles.container}>

    <Text>Results for: {store.getState().searchFor}</Text>

  </SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
  },
})

export default Results
