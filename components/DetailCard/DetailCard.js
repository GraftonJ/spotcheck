import React from 'react';
import {StyleSheet, Dimensions, Text, View, SafeAreaView, ImageBackground, Image, Alert, Button, ScrollView, ActivityIndicator} from 'react-native'
import store, { URI } from '../../store'
import { getResults } from '../../utils/api'
import Ratings from '../Ratings.js'
// import CommentsList from '../CommentsList/CommentsList'

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
  console.log('*****************', matchedLocation)
    return (
      <ScrollView style={styles.card}>
        <View style={styles.imageContainer}>
          <Image resizeMode={'contain'} style={styles.image} source={{uri: `${matchedLocation.image_url}`}} />
        </View>

        <View style={styles.cardTopLine}>
          <Text style={styles.name}>{matchedLocation.name}</Text>
          {(matchedLocation.scNumCheckIns===0) && (
            <Text>No check-ins yet</Text>
          )}
          {(matchedLocation.scNumCheckIns===1) && (
            <Text>{matchedLocation.scNumCheckIns} check-in here!</Text>
          )}
          {(matchedLocation.scNumCheckIns > 1) && (
            <Text>{matchedLocation.scNumCheckIns} check-ins here!</Text>
          )}
        </View>

        <View style={styles.priceCategory}>
          <Text style={styles.price}>{matchedLocation.price}</Text>
          <Text style={styles.category}>{matchedLocation.categories[0].title}, {matchedLocation.categories[1].title}</Text>
          <Ratings styles={styles.currentRatings} comments={matchedLocation.scComments} />
        </View>


        <View style={styles.addressDirections}>
          {(matchedLocation.is_closed === false) && (
            <Text style={styles.openNow}>Open Now</Text>
          )}
          {(matchedLocation.is_closed === true) && (
            <Text style={styles.openNow}>Closed Now</Text>
          )}
          <Text style={styles.address}>{matchedLocation.location.address1}</Text>
          <Text style={styles.directions}>Directions</Text>
        </View>


        <View style={styles.cardFifthLine}>
          <Text >Leave a Rating or Comment </Text>
            <Text style={styles.call}>{matchedLocation.display_phone}</Text>
        </View>



        <View style={styles.ratingsView}>
          <Text>
            Spot Check User Ratings!
          </Text>
        </View>

          {matchedLocation.scComments.map(scComments => (
          <View
              style={styles.commentContainer}
              key={scComments.user.id}>

            <View
              style={styles.cardTopLine}>
              <Text
              style={styles.commentName}>Name: {scComments.user.name}</Text>
              <Text
              style={styles.commentName}>Dog(s): {scComments.user.dogNames}</Text>
            </View>

            <View style={styles.cardSecondLine}>
              <Ratings rating={scComments.rating} />
            </View>

            <View>
              <Text>{scComments.comment}</Text>
            </View>

          </View>


          ))}


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
  },
  imageContainer: {
    width: '100%',
    height: 250,
    borderWidth: 1,
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
    display: 'flex',
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
  },
  priceCategory: {
    display: 'flex',
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
  },

  ratingCount: {
    fontSize: 15,
  },
  price: {
    fontSize: 20,
    flex: 1,
  },
  category: {
    fontSize: 20,
    flex: 3,
  },
  addressDirections: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    marginTop: 2,
  },
  address: {
    fontSize: 20,
  },
  cardFourthLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  directions: {
    fontSize: 15,
  },
  call: {
    marginRight: 20,
    fontSize: 15,
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
  comments: {
    borderBottomWidth: 1,
    marginTop: 15,
  },
  commentName: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold'
  },
  commentContainer: {
    width: "100%",
    height: 200,
    borderTopWidth: 1,
  },
  ratingsView: {
    marginTop: 40,
  },
  currentRating: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})
