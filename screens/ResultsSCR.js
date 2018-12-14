// resultsSCR.js
// Wraps the list component

import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import colors from '../utils/colors'
import store from '../store';

import Results from '../components/Results/Results'

export default class ResultsSCR extends React.Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Results',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: colors.blue,
    },
  });

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
    console.log("ResultsSCR::unmount()");
    this.unsubscribe();
  }

  render() {
    const { isLoading } = this.state;

    const searchText = this.props.navigation.state.params.searchText;
    console.log("ResultsSCR::render: ",searchText);

    return (
      <View style={styles.container}>
        {isLoading && (
          <View style={styles.container}>
            <Text>Listing</Text>
            <ActivityIndicator size="large" />
          </View>
        )}

        {!isLoading && (
          <Results />
        )}
      </View>
    );
  }
}

// <Text>Listing page</Text>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
});
