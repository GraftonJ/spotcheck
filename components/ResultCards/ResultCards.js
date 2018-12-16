import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ImageBackground, Image, Alert, Button, ScrollView, TouchableOpacity} from 'react-native'

import store from '../../store.js';

export default class ResultCards extends React.Component {

  constructor(props) {
    super(props);
  }

  onpressDetails = (id) => {
    console.log('*********** onpressDetails(): ', id);

    store.setState({
      locationForDetail: id,
    })

    this.props.navigate('DetailCardSCR');
  }

  render() {
    const { location } = this.props;
    return (
        <SafeAreaView style={styles.card}>
          <Image style={styles.image} source={{uri: `${location.image_url}`}} />

          <View style={styles.cardTopLine}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={styles.name}>{location.name}</Text>
          </View>

          <View style={styles.cardTopLine}>
            <Text style={styles.price}>{location.price}</Text>

            {(location.scNumCheckIns===0) && (
              <Text style={styles.checkin}>No check-ins yet</Text>
            )}
            {(location.scNumCheckIns===1) && (
              <Text style={styles.checkin}>{location.scNumCheckIns} check-in here!</Text>
            )}
            {(location.scNumCheckIns > 1) && (
              <Text style={styles.checkin}>{location.scNumCheckIns} check-ins here!</Text>
            )}

          </View>

          <View style={styles.cardMiddleLine}>
            <Text style={styles.category}>{location.categories[0].title}-</Text>
            <Text style={styles.rating}> ☆☆☆☆☆</Text>
            <Text style={styles.ratingCount}> (797)</Text>
          </View>

          <View style={styles.cardBottomLine}>
            <Text style={styles.cardBottomLine}>{location.location.address1}</Text>
          </View>

          <View style={styles.details}>
            <TouchableOpacity onPress={() => this.onpressDetails(location.id)}>
              <Text>View Details</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

    )
  }
}

const styles = StyleSheet.create({
  card: {
    width: 330,
    height: 365,
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
    fontSize: 20,
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
  details: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 10,
    marginTop: 2,
  },
  button: {
    width: '25%',
    height: '4%',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }

})
