import React from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView, TextInput, SafeAreaView, ImageBackground, Image, Alert, TouchableOpacity} from 'react-native'
import { Fonts } from '../../assets/fonts/fonts'

import store from '../../store';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFor: store.getState().searchFor,
      error: store.getState().error,
      unsubscribe: null,
    }
  }

  componentDidMount() {
    this.unsubscribe = store.onChange(() => {
      this.setState({
        searchFor: store.getState().searchFor,
        error: store.getState().error,
      })
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onchangeSearchFor = (text) => {
    // console.log('HomePage::onchangeSearchFor(): ', text);
    store.setState({
      searchFor: text,
    });
  }

  onpressSearch = () => {
    console.log('onpressSearch()');
    const searchFor = this.state.searchFor.trim();

    if (searchFor.length) {
      this.props.navigate('ResultsSCR');
      // this.props.navigate('ResultsSCR', { searchFor } );
    }
    else {
      Alert.alert("Grrrr", "Please enter a city and state")
    }
  }

  render() {
    return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      <ImageBackground
        source={require('../../assets/images/homepage-dog.jpg')}
        style={styles.imageContainer}
        imageStyle={styles.image}
        >
        <View style={styles.container}>
          <Text style={styles.textStyle}>Spot Check</Text>
          <Text style={styles.smallText}>Pup Friendly Restaurants!</Text>
          <TextInput
            autoFocus
            autoCorrect={false}
            placeholder="Search any city"
            placeholderTextColor="black"
            style={styles.textInput}
            clearButtonMode="always"
            value={this.state.searchFor}
            onChangeText={this.onchangeSearchFor}
          />

          <TouchableOpacity
              style={styles.button}
              onPress={this.onpressSearch}>
            <Text style={styles.buttonText}>Fetch!</Text>
          </TouchableOpacity>

          <Image
            style={{width: 25, height: 45, marginTop: 10}}
            source={require('../../assets/images/mapsImage.png')} />
        </View>
      </ImageBackground>

    </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textStyle: {
    marginTop: '10%',
    textAlign: 'center',
    color: 'white',
    fontSize: 60,
    fontFamily: 'Oxygen',
    fontWeight: '500',
  },

  smallText: {
    fontSize: 25,
    marginTop: -8,
    fontFamily: 'MarkerFelt-Wide',
    color: 'white',
    letterSpacing: 1,
    textDecorationColor: 'white',
    textDecorationLine: 'underline',
},
textInput: {
  backgroundColor: 'rgba(222, 224, 226, 0.8)',
  borderWidth: 1,
  borderRadius: 3,
  color: 'black',

  width: 300,
  marginTop: '65%',
  marginHorizontal: 20,
  padding: 5,
  alignSelf: 'center',
  fontFamily: 'Oxygen',
  fontSize: 18,
},
imageContainer: {
  flex: 1,
  width: 450,
},
image: {
  flex: 1,
  width: null,
  height: null,
  opacity: .80,
  resizeMode: 'cover',
},
button: {
  width: '25%',
  height: '6%',
  borderWidth: 1,
  borderRadius: 10,
  backgroundColor: 'white',
  marginTop: 10,
  alignItems: 'center',
  justifyContent: 'center',

},
buttonText: {
  fontFamily: 'MarkerFelt-thin',
  padding: 4,
  letterSpacing: 1,
  fontSize: 22,
}
});
