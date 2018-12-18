import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ImageBackground, Image, Alert, Button, ScrollView, TouchableOpacity} from 'react-native'

import store from '../../store.js';

import Ratings from '../Ratings.js'

import { Fonts } from '../../assets/fonts/fonts'

//stars working?
export default class ResultCards extends React.Component {

  /* ************************************* */
  constructor(props) {
    super(props);
  }

  /* ************************************* */
  onpressDetails = (id) => {
    console.log('*********** onpressDetails(): ', id);

    store.setState({
      locationForDetail: id,
    })

    this.props.navigate('DetailCardSCR');
  }

  /* ************************************* */
  render() {
    const { location } = this.props;
    return (
      <SafeAreaView style={styles.card}>

        {/* -- IMAGE -- */}
        <Image style={styles.image} source={{uri: `${location.image_url}`}} />

        {/* -- Avery Brewing -- */}
        <View style={styles.nameContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.name}>{location.name}</Text>
        </View>

        {/* -- (Breweries) $$ -- */}
        <View style={styles.categoryPriceContainer}>
          <Text style={styles.category}>({location.categories[0].title})  |</Text>
          <Text style={styles.price}>{location.price}</Text>
        </View>


        {/* -- 5 check-ins */}
        <View style={styles.checkinsContainer}>
          {(location.scNumCheckIns===0) && (
            <Text style={styles.checkin}>No check-ins yet</Text>
          )}
          {(location.scNumCheckIns===1) && (
            <Text style={styles.checkin}>{location.scNumCheckIns} check-in</Text>
          )}
          {(location.scNumCheckIns > 1) && (
            <Text style={styles.checkin}>{location.scNumCheckIns} check-ins</Text>
          )}
        </View>


        {/* -- ***** (3 ratings)*/}
        <View style={styles.ratingContainer}>
          <Ratings style={styles.rating} comments={location.scComments} />
        </View>


        {/* -- 123 Main St -- */}
        <View style={styles.address}>
          <Text style={styles.address}>{location.location.address1}</Text>
        </View>


        {/* -- View Details -- */}
        <View style={styles.details}>
          <TouchableOpacity
            style={styles.touchableOpacityStyle}
            onPress={() => this.onpressDetails(location.id)}>
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    width: 340,
    height: 390,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    margin: 15,
    marginBottom: 0,
    backgroundColor: '#F4F4F4'
  },
  // Image
  image: {
    width: '100%',
    height: '55%',
  },
  // 4 checkins  $$
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    paddingLeft: 3,
    paddingRight: 3,
  },
  // Avery Brewing
  name: {
    fontSize: 25,
    fontFamily: 'Oxygen',
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  // (Breweries)
  categoryPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  category: {
    marginRight: 10,
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: 'MontSerrat'
  },
  price: {
    marginRight: 10,
    fontSize: 14,
    fontFamily: 'MontSerrat'
  },
  checkinsContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',

  },
  checkins: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    marginTop: 5,
  },

  checkin: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Oxygen',
    textAlign: 'right',
    marginLeft: 10,
  },

  // ****** (3 reviews)   Brewery
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  // 123 Main St
  address: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 15,
    fontFamily: 'MontSerrat',
    letterSpacing: 1,
    marginTop: 5,
  },

  // Click for details
  details: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -5,
  },

  touchableOpacityStyle: {
    width: '35%',
    height: 25,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#3498DB',
    borderColor: 'grey',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'MarkerFelt-thin',
    fontSize: 20,
  }
  // button: {
  //   width: '25%',
  //   height: '4%',
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   backgroundColor: 'white',
  //   marginTop: 10,
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // }

})
