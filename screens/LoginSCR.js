// loginSCR.js
// Wraps the login component

import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import colors from '../utils/colors'

import Login from '../components/Login/Login';

export default class LoginSCR extends React.Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Login',
    headerTintColor: 'black',
    headerStyle: {
      backgroundColor: colors.white,
    },
  });

  render() {
    return (
      <View style={styles.container}>
          <Login />
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
