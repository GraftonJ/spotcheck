// loginSCR.js
// Wraps the login component

import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import colors from '../utils/colors'
import store from '../store';

import Login from '../components/Login/Login';

export default class LoginSCR extends React.Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Login',
    headerTintColor: 'black',
    headerStyle: {
      backgroundColor: colors.white,
    },
  });

  state = {
    user: store.getState().user,
    error: store.getState().error,
  };

  componentDidMount() {
    this.unsubscribe = store.onChange(() =>
      this.setState({
        user: store.getState().user,
        error: store.getState().error,
      }));
    const { user } = this.state;
    store.setState({ user });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { user, error } = this.state;

    return (
      <View style={styles.container}>
        {error &&
          <Text>Error...</Text>}
        {!error && (
          <Login />
        )}
      </View>
    );
  }
}

// <Text>Login page, curr user: {user.fname} {user.lname}</Text>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});
