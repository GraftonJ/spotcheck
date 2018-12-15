
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
  TouchableOpacity
} from 'react-native'

import store, { URI } from '../../store';

export default class CheckIn extends React.Component {

  /* ********************************************* */
  constructor(props) {
    super(props);
    this.state = {
      // local state
      isLoading: true,
    };
  }

  /* ********************************************* */
  componentDidMount() {
    this.unsubscribe = store.onChange(() => {
      this.setState({
      })
    });
  }

  /* ********************************************* */
  componentWillUnmount() {
    // disconnect from store notifications
    this.unsubscribe();
  }

  /* ********************************************* */
  async getPotentialLocations() {
    console.log("-- getPotentialLocations(): ", email, password);

    try {
    }
    catch(err) {
      console.log("ERROR getPotentialLocations fetch failed: ", err);
    }
  }

  /* ********************************************* */
  render() {
    const { isLoading } = this.state;

    // isLoading, show spinnert
    // ===================================
    if (isLoading) {
      return ( <Text>Loading...</Text> );
    }

    // List is empty, show sad face
    // ====================================
    return (
      <SafeAreaView style={styles.container}>
        <Text>No known dog-friendly restaurants in the area</Text>
      </SafeAreaView>
    )

    // Show list of locations to check into
    // ====================================
    return (
      <SafeAreaView style={styles.container}>
        <Text>Listing posibilities</Text>
      </SafeAreaView>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    padding: 20,
    backgroundColor: '#ffffff',
    height: '70%',
    width: '90%',
  },
  form: {

  },
  text: {
    fontSize: 25,
    letterSpacing: 1,
    marginBottom: 10,
  },
  image: {
    height: '100%',
    width: '100%',

  },
  errorMessage: {
    color: "red",
  },
  circle: {
    marginBottom: 25,
    marginTop: -50,
    height: 150,
    width: 150,
    borderWidth:1,
    borderRadius:75,
    padding: 22,
  },
  button: {
    width: '25%',
    height: '4%',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  newAccount : {
    fontSize: 10,
    letterSpacing: 1,
    margin: 2
  },
})

// export default Login
