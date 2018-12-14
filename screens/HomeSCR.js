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
  // static navigationOptions = ({ navigation: { navigate } }) => ({
  //   title: 'Search Page',
  //   headerTintColor: 'white',
  //   headerStyle: {
  //     backgroundColor: colors.blue,
  //   },
  // });

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
    this.props.navigation.navigate('ListSCR')
  }

  render() {
    const { searchFor, error } = this.state;

    return (
      <View style={styles.container}>
        {error &&
          <Text>Error...</Text>}
        {!error && (
          <Homepage />
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
    backgroundColor: colors.blue,
  },
});
