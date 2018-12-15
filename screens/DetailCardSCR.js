// resultsSCR.js
// Wraps the list component

import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import colors from '../utils/colors'

// import Results from '../components/Results/Results'

export default class DetailCardSCR extends React.Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Details',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: colors.blue,
    },
  });

  state = {
    isLoading: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Detail Page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});
