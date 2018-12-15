import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ImageBackground, Image, Alert, Button} from 'react-native'

export default class ResultCards extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
        <SafeAreaView style={styles.card}>
          <Image style={styles.image} source={{uri: 'https://s3-media3.fl.yelpcdn.com/bphoto/nbfrWWtz6lRUaxYtw9PNQA/o.jpg'}} />

          <View style={styles.cardTopLine}>
            <Text style={styles.name}>{this.props.result.name}</Text>
            <Text style={styles.checkin}>79 Check-ins here!</Text>
          </View>

          <View style={styles.cardMiddleLine}>
            <Text style={styles.price}>$$ -</Text>
            <Text style={styles.category}> Brewery -</Text>
            <Text style={styles.rating}> ☆☆☆☆☆</Text>
            <Text style={styles.ratingCount}> (797)</Text>
          </View>

          <View style={styles.cardBottomLine}>
            <Text style={styles.cardBottomLine}>251 North Main St.</Text>
          </View>
        </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    width: '99%',
    height: '50%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    margin: 15,
    marginBottom: 0,
    backgroundColor: '#F4F4F4'
  },
  image: {
    width: '100%',
    height: '60%',

  },
  cardTopLine: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
    marginTop: 5,
  },
  name: {
    fontSize: 30,
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
    alignItems: 'center',
    fontSize: 20,
  },
  rating: {
    fontSize: 25,
  },
  ratingCount: {
    fontSize: 15,
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
