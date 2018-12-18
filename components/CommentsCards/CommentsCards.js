import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native'
import { Fonts } from '../../assets/fonts/fonts'
import RatingsClickable from '../RatingsClickable'
import store from '../../store'


export default class CommentsCards extends React.Component {
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

  componentWillUnmount() {
    this.unsubscribe();
  }

  ratingUpdated = (newRating) => {
    this.setState({
      rating: newRating
    })
  console.log('New rating is>>>', newRating)
  }

  onpressComment = () => {
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
        user: store.getState().user
    }

    const newLocations = store.getState().locations.map((location) => {
      if (location.id === this.state.matchedLocation.id)
        return {
          ...location,
          scComments: [comment, ...location.scComments],
        }
      return location;
    })
    console.log('New Location is>>>', newLocations);
    store.setState({locations: newLocations})
  }

  render() {
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
             maxLength = {500}
             onChangeText ={(comment) => this.setState({comment})}
             placeholder="Leave a comment to help your doggy friends find a restuarant to visit with their people!"
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onpressComment}>
            <Text>Bark! (comment)</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
    )
  }
}

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
    height: '8%',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
})
