import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native'
import { Fonts } from '../../assets/fonts/fonts'
import RatingsClickable from '../RatingsClickable'
import store, { URI } from '../../store'


export default class CommentsCards extends React.Component {

  /* ************************************** */
  constructor(props) {
    super(props)
    this.state = {
      locations: store.getState().locations,
      locationForDetail: store.getState().locationForDetail,
      matchedLocation: {},
      comment: '',
      rating: 0,
    }
  }

  /* ************************************** */
  async componentDidMount() {
    this.unsubscribe = store.onChange(() => {
      this.setState({
        locations: store.getState().locations,
        locationForDetail: store.getState().locationForDetail,
      })
    })

    let matched = this.state.locations.find((location) => (location.id === this.state.locationForDetail))
    console.log('Matched Location is>>>', matched);

    this.setState({
      matchedLocation: matched
    })
  }

  /* ************************************** */
  componentWillUnmount() {
    this.unsubscribe();
  }
  /* ************************************** */

  /* ************************************** */
  ratingUpdated = (newRating) => {
    console.log('CommentsCards::ratingUpdated: >>>', newRating)
    this.setState({
      rating: newRating
    })
  }
  /* ************************************** */
    onpressGoBack = () => {
      this.props.goBack()
      return
    }
   onpressComment = async () => {
    if(!this.state.comment) {
      Alert.alert('Please enter a comment')
      return
    }
    else if(!this.state.rating) {
      Alert.alert('Please leave a rating')
      return
    }
    const comment =
      {
        comment: `${this.state.comment}`,
        locaId: `${this.state.matchedLocation.id}`,
        rating: this.state.rating,
        user: store.getState().user,
        id: 0, //to get filled in after responseJSON constructed
    }
    try {
      const body = {
        loca_id: `${this.state.matchedLocation.id}`,
        user_id: store.getState().user.id,
        comment: `${this.state.comment}`,
        rating: this.state.rating,
      }
      // call checkin route
      const response = await fetch(`${URI}/comments`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const responseJson = await response.json()
      console.log('JSON RESPONSE IS>>>', responseJson)
      comment.id = responseJson.id
      console.log('Done constructing comment')

    } catch(error) {
      console.log('ERROR', error);
    }


    console.log('About to use constructed comment')
    const newLocations = store.getState().locations.map((location) => {
      if (location.id === this.state.matchedLocation.id)
        return {
          ...location,
          scComments: [comment, ...location.scComments],
        }
      return location;
    })
    console.log('New Location is>>>', newLocations);
    store.setState({locations: newLocations});
    this.props.goBack();
  }

  /* ************************************** */
  render() {
    if (!store.getState().isLoggedIn) {
      return (
        <View style={styles.goBackButtonContainerbuttonContainer}>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={this.onpressGoBack}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <SafeAreaView>
        <View style={styles.cardContainer}>
          <Text style={styles.name}>{store.getState().user.name}</Text>
          <View style={styles.rating}>
            <RatingsClickable ratingUpdatedCB={this.ratingUpdated}/>
          </View>
          <View>
            <TextInput
             style={styles.placeholderText}
             multiline = {true}
             numberOfLines = {4}
             maxLength = {350}
             onChangeText ={(comment) => this.setState({comment})}
             placeholder="Leave a comment to help your doggy friends find a restuarant to visit with their people!"
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onpressComment}>
            <Text style={styles.buttonText}>Bark! (comment)</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
    )
  }
}

/* ************************************** */
const styles = StyleSheet.create({
  cardContainer: {
    width: 350,
    height: '50%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  name: {
    fontSize: 30,
    fontFamily: 'Arial',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'MontSerrat',
    letterSpacing: 1,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    width: "100%",
    height: 200,
    fontSize: 18,
    alignSelf: 'center',
    borderTopWidth: 1
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: '40%',
    height: '15%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    backgroundColor: '#3498DB',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontFamily: 'MarkerFelt-thin',
    fontSize: 20,
  },
  goBackButtonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  goBackButton: {
    width: 100,
    height: '25%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    backgroundColor: '#3498DB',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
