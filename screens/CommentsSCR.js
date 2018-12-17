// resultsSCR.js
// Wraps the list component

import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import colors from '../utils/colors'

import CommentsCards from '../components/CommentsCards/CommentsCards'

export default class CommentsSCR extends React.Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Comment',
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
        <CommentsCards goBack={this.props.navigation.goBack}/>
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
