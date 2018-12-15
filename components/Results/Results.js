import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  ImageBackground,
  Image,
  Alert,
  TouchableOpacity} from 'react-native';

  // import store from '../../store';




  const config = {
    headers: {'Authorization': 'Bearer VkRXEkxkuMiPqFY3xuJdHIMU3ggnwWrKaeCdL-cMm5Mh0q_b-OyMhmdZDMf8xSrbV0BPdAaPtu0aVY2vlHRCQ1JZzFl0N-ahFSjwDY16uAvQ0YviTfxrydO32n6dW3Yx'},
    params: {
      term: 'dog friendly restaurants',
      location: 'Boulder, CO'
    }
  }

  const API = 'https://api.yelp.com/v3/businesses/search'

  const getResults = async () => {
  const response = await fetch(`${API}?location=${config.params.location}`, config)
  const json = await response.json()
  console.log(json)
  return json
}


export default class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: []
    }
  }


  async componentWillMount() {

    const response = await fetch(`${API}`, config)
    const json = await getResults()
    this.setState({
      results: json
    })
}

render() {
  return (
    <Text>Results</Text>
  )
}

  // <SafeAreaView style={styles.container}>
  //
  //   <Text>Results for: {store.getState().searchFor}</Text>
  //
  // </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
  },
})
