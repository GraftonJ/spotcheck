import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ImageBackground, Image, Alert, Button} from 'react-native'

export default class Resut extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.cardContainer}>
        <Image style={styles.image} source={require('../../assets/images/homepage-dog.jpg')} />
        <View style={styles.cardTopLine}>
          <Text style={styles.name}>Restaurant Title</Text>
          <Text style={styles.checkin}>79 Check-ins here!</Text>
        </View>
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
  image: {
    width: '100%',
    height: '67%',
  },
  cardTopLine: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  name: {
    fontSize: 25,
    fontFamily: 'Arial',
  },
  checkin: {
    fontSize: 15,
    fontFamily: 'Arial',
  }
})
