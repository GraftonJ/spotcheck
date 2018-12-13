import React from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView, TextInput, SafeAreaView} from 'react-native';

export default class App extends React.Component {
  render() {
    return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.textStyle}>My Location:</Text>
        <TextInput
          autoCorrect={false}
          placeholder="Search any city"
          placeholderTextColor="white"
          style={styles.textInput}
          clearButtonMode="always"
        />
      </View>
    </SafeAreaView>
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
    textAlign: 'left',
    color: 'black',
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

});
