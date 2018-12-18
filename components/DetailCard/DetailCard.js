import React from 'react';
import {StyleSheet, Dimensions, Text, View, SafeAreaView, ImageBackground, Image, Alert, Button, ScrollView, ActivityIndicator, TouchableOpacity, Linking} from 'react-native'
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
  onPressComment = () => {
    console.log('comment hooked up*************');
    this.props.navigate('CommentsSCR');
  }

  /* **************************************** */
  async componentDidMount() {
    this.unsubscribe = store.onChange(() => {
      console.log("---- DetailCard::store update CB()");
      this.setState({
        locations: store.getState().locations,
        locationForDetail: store.getState().locationForDetail,
        matchedLocation: store.getState().locations.find((location) => (location.id === store.getState().locationForDetail)),
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
    const { matchedLocation, isLoading, onPressComment } = this.state

    if (isLoading) {
      return (
        <ActivityIndicator
          size="large"
          color="#3399ff"
        />
      )
    }

    console.log('DetailCard::render(), matchedLocation: ', matchedLocation)
    return (
      <ScrollView style={styles.card}>
        <View style={styles.imageContainer}>
          <Image resizeMode={'contain'} style={styles.image} source={{uri: `${matchedLocation.image_url}`}} />
        </View>

        <View style={styles.nameContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.name}>{matchedLocation.name}</Text>
        </View>

        <View style={styles.checkInContainer}>
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
          <Text style={styles.category}>{matchedLocation.categories[0].title}</Text>
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
          <Text style={styles.directions} onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${this.state.matchedLocation.name}+${this.state.matchedLocation.address1}`)}>Directions</Text>
          <Text style={styles.call}>{matchedLocation.display_phone}</Text>
        </View>


        <View style={styles.cardFifthLine}>
          <View >
            <Image style={styles.commentDog} source={require('../../assets/images/commentDog.png')} />
          </View>
          <TouchableOpacity
            style={styles.leaveCommentButton}
            onPress={this.onPressComment}>
            <Text>Leave a Rating or Comment </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.ratingsView}>
          <Text>
            Spot Check User Ratings!
          </Text>
        </View>

          {matchedLocation.scComments.map((scComments, idx) => (
          <View
              style={styles.commentContainer}
              key={idx}>

            <View
              style={styles.cardTopLine}>
              <Text
              style={styles.commentName}>Name: {scComments.user.name}</Text>
              <Ratings style={styles.commentRating} rating={scComments.rating} />
            </View>

            <View style={styles.cardSecondLine}>
              <Text style={styles.commentDogName}>Doggos: {scComments.user.dogNames}</Text>
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
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 5,
  },
  name: {
    fontSize: 30,
    fontFamily: 'Arial',
    overflow: 'hidden',
  },
  checkInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
  },
  checkin: {
    fontSize: 15,
    fontFamily: 'Arial',
    alignItems: 'center',
  },
  cardSecondLine: {
    display: 'flex',
    flexDirection: 'row',

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
    marginBottom: 10,
  },
  cardFifthLine: {
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
    flex: 2,
    fontSize: 18,
    fontWeight: 'bold'
  },
  commentDogName: {
    marginBottom: 10,
    fontSize: 13,
    fontWeight: 'bold',
  },
  commentRating :{
    flex: 1,
  },
  commentContainer: {
    width: "100%",
    height: 200,
    borderTopWidth: 1,
    padding: 10,
  },
  ratingsView: {
    marginTop: 40,
  },
  currentRating: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaveCommentButton: {
    borderBottomWidth: 1,
  },
  circle: {
    marginBottom: 25,
    marginTop: -50,
    height: 50,
    width: 50,
    borderWidth:1,
    borderRadius:75,
    padding: 22,
  },
  commentDog: {
    width: 50,
    height: 50,
    margin: 20,
  }
})
