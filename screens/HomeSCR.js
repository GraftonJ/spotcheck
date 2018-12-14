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
import store from '../store';

import Homepage from '../components/Homepage/Homepage'

export default class HomeSCR extends React.Component {
  // const { navigation: { navigate } } = this.props;
  navigate = this.props.navigation.navigate;
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Search',
    headerTintColor: 'black',
    headerStyle: {
      backgroundColor: colors.white,
    },
  });

  state = {
    seachFor: store.getState().searchFor,
    error: store.getState().error,
  };

  componentDidMount() {
    this.unsubscribe = store.onChange(() =>
      this.setState({
        seachFor: store.getState().searchFor,
        error: store.getState().error,
      }));
    const { searchFor } = this.state;
    store.setState({ searchFor });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // This is example of moving to a subordinant screen
  onclick = () => {
    console.log('click');
    console.log(this.props);
    this.props.navigation.navigate('ResultsSCR')
  }

  render() {
    const { searchFor, error } = this.state;

    return (
      <View style={styles.container}>
        {error &&
          <Text>Error...</Text>}
        {!error && (
          <Homepage navigate={this.props.navigation.navigate}/>
        )}
      </View>
    );
  }
}

// <Button onPress={this.onclick} title="seach" />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});
