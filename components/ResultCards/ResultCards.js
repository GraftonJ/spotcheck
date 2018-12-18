import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ImageBackground, Image, Alert, Button, ScrollView, TouchableOpacity} from 'react-native'

import store from '../../store.js';

import Ratings from '../Ratings.js'

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

        <View style={styles.cardTopLine}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.name}>{location.name}</Text>
        </View>


        {/* -- 5 check-ins    $$ -- */}

        <View style={styles.cardTopLine2}>
          {(location.scNumCheckIns===0) && (
            <Text style={styles.checkin}>No check-ins yet</Text>
          )}
          {(location.scNumCheckIns===1) && (
            <Text style={styles.checkin}>{location.scNumCheckIns} check-in</Text>
          )}
          {(location.scNumCheckIns > 1) && (
            <Text style={styles.checkin}>{location.scNumCheckIns} check-ins</Text>
          )}

          <Text style={styles.price}>{location.price}</Text>
        </View>


        {/* -- ***** (3 ratings)    Breweries -- */}

        <View style={styles.cardMiddleLine}>
          <Text>  </Text>
          <Ratings style={styles.rating} comments={location.scComments} />
          <Text style={styles.category}>{location.categories[0].title}</Text>
        </View>


        {/* -- 123 Main St -- */}

        <View style={styles.cardBottomLine}>
          <Text style={styles.cardBottomLine}>{location.location.address1}</Text>
        </View>


        {/* -- View Details -- */}

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


  // Image
  image: {
    width: '100%',
    height: '60%',
  },


  // Avery Brewing
  name: {
    fontSize: 20,
    fontFamily: 'Arial',
    overflow: 'hidden',
  },

  // 4 checkins  $$
  cardTopLine: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
    marginTop: 5,
  },
  cardTopLine2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    marginTop: 5,
  },

  checkin: {
    fontSize: 15,
    fontFamily: 'Arial',
    textAlign: 'right',
    marginLeft: 10,
    // backgroundColor: 'pink',
  },

  price: {
    marginRight: 10,
    fontSize: 20,
    // backgroundColor: 'blue',
  },


  // ****** (3 reviews)   Brewery
  cardMiddleLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // justifyContent: 'center',
    alignItems: 'center',
    // fontSize: 20,
  },
  rating: {
    // textAlign: 'right',
    marginLeft: 10,
    // fontSize: 25,
    // backgroundColor: 'pink',
  },
  category: {
    marginRight: 10,
    fontSize: 20,
  },
  // ratingContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'flex-end',
  //   // textAlign: 'right',
  //   // marginRight: 10,
  //   // fontSize: 25,
  //   // backgroundColor: 'pink',
  // },

  ratingCount: {
    fontSize: 15,
  },

  // 123 Main St
  cardBottomLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 2,
  },

  // Click for details
  details: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 10,
    marginTop: 2,
  },

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
