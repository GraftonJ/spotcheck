// homeSCR.js
// Wraps the homescreen component

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator } from 'react-native';

import colors from '../utils/colors'

import Homepage from '../components/Homepage/Homepage'

export default class HomeSCR extends React.Component {
  navigate = this.props.navigation.navigate;
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Search',
    headerTintColor: 'black',
    headerStyle: {
      backgroundColor: colors.white,
    },
  });

  render() {
    return (
      <View style={styles.container}>
        <Homepage navigate={this.props.navigation.navigate}/>
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
