import React from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView, TextInput, SafeAreaView, ImageBackground, Image, Alert, Button} from 'react-native'

export default class HomePage extends React.Component {
  render() {
    return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground
        source={require('../../assets/images/homepage-dog.jpg')}
        style={styles.imageContainer}
        imageStyle={styles.image}
        >
        <View style={styles.container}>
          <Text style={styles.textStyle}>{`${this.props.location}`}</Text>
          <TextInput
            autoCorrect={false}
            placeholder="Search any city"
            placeholderTextColor="white"
            style={styles.textInput}
            clearButtonMode="always"
            onChangeText={this.props.updateLocation}
          />

          <Button
              onPress={() => {
              Alert.alert('You tapped the button!');
            }}
            title="Press Me" style={styles.textStyle}
          />
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
    justifyContent: 'center'
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 18,
},
textInput: {
  backgroundColor: '#666',
  color: 'white',
  height: 40,
  width: 300,
  marginTop: 10,
  marginHorizontal: 20,
  paddingHorizontal: 10,
  alignSelf: 'center',
},
imageContainer: {
  flex: 1,
  width: 450,
},
image: {
  flex: 1,
  width: null,
  height: null,
  resizeMode: 'cover',
},
button: {
  borderRadius: 2,
  backgroundColor: 'white',
}
});
