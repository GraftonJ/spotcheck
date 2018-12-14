// listSCR.js
// Wraps the list component

import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import colors from '../utils/colors'
import store from '../store';

export default class ListSCR extends React.Component {
  // static navigationOptions = ({ navigation: { navigate } }) => ({
  //   title: 'Check-in Page',
  //   headerTintColor: 'white',
  //   headerStyle: {
  //     backgroundColor: colors.blue,
  //   },
  // });

  state = {
    isLoading: true,
  };

  async componentDidMount() {
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

  render() {
    const { isLoading } = this.state;

    return (
      <View style={styles.container}>
        {isLoading && (
          <View style={styles.container}>
            <Text>Listing</Text>
            <ActivityIndicator size="large" />
          </View>
        )}

        {!isLoading && (
          <Text>Listing page</Text>
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
