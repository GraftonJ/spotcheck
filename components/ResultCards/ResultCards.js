import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ImageBackground, Image, Alert, Button} from 'react-native'

export default class Resut extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.cardContainer}>

      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
})
