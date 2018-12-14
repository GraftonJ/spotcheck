// checkInSCR.js
// Wraps the check-in component

import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import colors from '../utils/colors'
import store from '../store';

export default class CheckInSCR extends React.Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Check-in',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: colors.blue,
    },
  });

  render() {
    return (
      <View style={styles.container}>
        <Text>Check in to location</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
});
