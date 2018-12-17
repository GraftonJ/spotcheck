import React from 'react';
import {StyleSheet, Dimensions, Text, View, SafeAreaView, ImageBackground, Image, Alert, Button, ScrollView, ActivityIndicator} from 'react-native'
import store, { URI } from '../../store'
import { getResults } from '../../utils/api'

export default class DetailCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      locations: store.getState().locations,
      locationForDetail: store.getState().locationForDetail,

      isLoading: true,
      error: false,
      matchedLocation: {}
    }
  }

  /* **************************************** */
  async componentDidMount() {
    this.unsubscribe = store.onChange(() => {
      this.setState({
        locations: store.getState().locations,
        locationForDetail: store.getState().locationForDetail,
      })
    })


    let matched = this.state.locations.find((location) => (location.id === this.state.locationForDetail))


    // console.log('>>>>>>>>>>>', typeof(matched), matched);

    this.setState({
      matchedLocation: matched,
      isLoading: false
    })
  }


  /* **************************************** */
  componentWillUnmount() {
    this.unsubscribe();
  }


  /* **************************************** */
  render() {
    const { matchedLocation, isLoading } = this.state

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color="#3399ff"
      />
    )
  }
  console.log('*****************', matchedLocation.categories[0])
    return (
      <ScrollView style={styles.card}>
        <View style={styles.imageContainer}>
          <Image resizeMode={'contain'} style={styles.image} source={{uri: `${matchedLocation.image_url}`}} />
        </View>

        <View style={styles.cardTopLine}>
          <Text style={styles.name}>{matchedLocation.name}</Text>
          <Text style={styles.checkin}>79 Check-ins here!</Text>
        </View>

        <View style={styles.cardSecondLine}>
          <Text style={styles.price}>{matchedLocation.price}</Text>
          <Text style={styles.category}>category</Text>
          <Text style={styles.rating}> ☆☆☆☆☆</Text>
          <Text style={styles.ratingCount}> (797)</Text>
        </View>

        <View style={styles.cardThirdLine}>
          <Text style={styles.cardThirdLine}>address</Text>
        </View>

        <View style={styles.cardFourthLine}>
          <Text style={styles.directions}>Directions</Text>
          <Text style={styles.openNow}> Open Now</Text>
          <Text style={styles.call}> Call</Text>
        </View>

        <View style={styles.cardFifthLine}>
          <Text >Leave a Rating or Comment </Text>
        </View>

        <View style={styles.starRating}>
          <Text style={styles.starRating}>☆☆☆☆☆</Text>
        </View>
      </ScrollView>
      )
  }
}
const win = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    width: '99%',
    height: '100%',
    backgroundColor: 'white',
    marginBottom: 0,
    backgroundColor: '#F4F4F4',
    borderColor: 'black',
    borderWidth: 5,
  },
  imageContainer: {
    width: '100%',
    height: 250,
  },
  image: {
    flex: 1,
    alignItems: 'flex-start',
    width: win.width,
    height: win.height,
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
  cardSecondLine: {
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
  cardThirdLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 2,
  },
  cardFourthLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  directions: {
    marginLeft: 20,
    fontSize: 20,
  },
  call: {
    marginRight: 20,
    fontSize: 20,
  },
  openNow: {
    fontSize: 20,
  },
  cardFifthLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    fontSize: 20,
  },
  starRating: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
  },
})
