import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ImageBackground, Image, Alert, Button} from 'react-native'

export default class Resut extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.cardContainer}>
        <Image style={styles.image} source={require('../../assets/images/homepage-dog.jpg')} />
        <View style={styles.cardTopLine}>
          <Text style={styles.name}>Avery Brewery</Text>
          <Text style={styles.checkin}>79 Check-ins here!</Text>
        </View>
        <View style={styles.cardMiddleLine}>
          <Text style={styles.price}>$$ -</Text>
          <Text style={styles.category}> Brewery -</Text>
          <Text style={styles.rating}> ☆☆☆☆☆</Text>
        </View>
        <View style={styles.cardBottomLine}>
          <Text style={styles.cardBottomLine}>251 North Main St.</Text>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '99%',
    height: '50%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  image: {
    width: '100%',
    height: '75%',

  },
  cardTopLine: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
    marginTop: 5,
  },
  name: {
    fontSize: 25,
    fontFamily: 'Arial',
    overflow: 'hidden',
  },
  checkin: {
    fontSize: 15,
    fontFamily: 'Arial',
  },
  cardMiddleLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 20,
  },
  rating: {
    fontSize: 20,
  },
  price: {
    fontSize: 20,
  },
  category: {
    fontSize: 20,
  },
  cardBottomLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 2,
  },
})
