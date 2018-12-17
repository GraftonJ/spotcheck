// resultsSCR.js
// Wraps the list component

import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import colors from '../utils/colors'

import DetailCard from '../components/DetailCard/DetailCard'

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
        <DetailCard navigate={this.props.navigation.navigate}/>
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
