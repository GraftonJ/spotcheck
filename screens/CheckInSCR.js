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

  state = {
    isLoading: true,
  };

  async componentDidMount() {

  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { isLoading } = this.state;

    return (
      <View style={styles.container}>
        {isLoading && (
          <View style={styles.container}>
            <Text>Searching for restaurant to check into</Text>
            <ActivityIndicator size="large" />
          </View>
        )}

        {!isLoading && (
          <Text>Check in to location</Text>
        )}
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
