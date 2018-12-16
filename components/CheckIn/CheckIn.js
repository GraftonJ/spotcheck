
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
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'

import { getResults, getResultsLatLon } from '../../utils/api'
import store, { URI } from '../../store';

export default class CheckIn extends React.Component {

  /* ********************************************* */
  constructor(props) {
    super(props);
    this.state = {
      // from store
      user: store.getState().user,

      // local state
      isLoading: true,
      candidateLocations: [], // array of locations to check-in to
    };
  }

  /* ********************************************* */
  async componentDidMount() {
    try {
      const locationsByCity = await getResults('Boulder, CO');
      const locationsByLatLon = await getResultsLatLon(40.016516, -105.281656);
      // console.log('city: ',locationsByCity);
      // console.log('latlon: ',locationsByLatLon);
      const candidateLocations = [];

      for (locationByLatLon of locationsByLatLon) {
        console.log('checking: ', locationByLatLon.name);
        if (locationsByCity.find(locationByCity => locationByCity.id === locationByLatLon.id))
          candidateLocations.push(locationByLatLon);
      }

      // console.log('Candidiate locations: ', candidateLocations);
      this.setState({
        isLoading: false,
        candidateLocations
      })

      this.unsubscribe = store.onChange(() => {
        this.setState({
          user: store.getState().user,
        });
      });
    } catch (error) {
      console.log("ERROR CheckIn::componentDidMount(): ", error);
    }
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
  onpressCheckin(locationId) {
    console.log('onpressCheckin(): ', locationId);
  }

  /* ********************************************* */
  render() {
    const { isLoading, candidateLocations } = this.state;

    // isLoading, show spinnert
    // ===================================
    if (isLoading) {
      return (
        <ActivityIndicator
          size="large"
          color="#3399ff" />
      )
    }

    // No candidate locations, show sad face
    // ====================================
    if (!candidateLocations.length) {
      return (
        <SafeAreaView style={styles.container}>
          <Text>Unfortunately there are no restaurants in your area that are marked as dog-friendly</Text>
        </SafeAreaView>
      )
    }

    // List candidate locations to check into
    // ====================================
    return (
      <SafeAreaView style={styles.container}>
        {candidateLocations.map((location) => {
          return (
            <TouchableOpacity key={location.id} onPress={() => this.onpressCheckin(location.id)}>
              <Text>{location.name}</Text>
            </TouchableOpacity>
          )
        })}
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
