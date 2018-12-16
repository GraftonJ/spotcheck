
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
      isLoggedIn: store.getState().isLoggedIn,

      isCheckedIn: store.getState().isCheckedIn,
      checkinLocationId: store.getState().checkinLocationId,
      checkinLocationName: store.getState().checkinLocationName,

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
        if (locationsByCity.find(locationByCity => locationByCity.id === locationByLatLon.id))
          candidateLocations.push(locationByLatLon);
      }

      // console.log('Candidiate locations: ', candidateLocations);
      this.setState({
        isLoading: false,
        candidateLocations
      })

      this.unsubscribe = store.onChange(() => {
        console.log('callback setting local state');
        console.log('*** store.getState(): ', store.getState());
        this.setState({
          user: store.getState().user,
          isLoggedIn: store.getState().isLoggedIn,

          isCheckedIn: store.getState().isCheckedIn,
          checkinLocationId: store.getState().checkinLocationId,
          checkinLocationName: store.getState().checkinLocationName,
        });
        console.log('callback new local state: ', this.state);
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
  onpressCheckin(locationId, locationName) {
    console.log('onpressCheckin(): ', locationId, locationName);
    console.log('onpress() setting store state');
    store.setState({
      isCheckedIn: true,
      checkinLocationId: locationId,
      checkinLocationName: locationName,
    })
  }

  /* ********************************************* */
  render() {
    const {
      isLoading,
      candidateLocations,
      isLoggedIn,
      isCheckedIn,
      checkinLocationName
    } = this.state;

    // isLoading, show spinner
    // ===================================
    if (isLoading) {
      return (
        <ActivityIndicator
          size="large"
          color="#3399ff" />
      )
    }

    // not logged in, say they need to login
    // ===================================
    if (!isLoggedIn) {
      return (
        <Text>Please login so you can check-in to a location</Text>
      )
    }

    // already checked in, show where they checked in
    // ===================================
    if (isCheckedIn) {
      return (
        <Text>Yay, you checked-in to {checkinLocationName}</Text>
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
            <TouchableOpacity key={location.id} onPress={() => this.onpressCheckin(location.id, location.name)}>
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
