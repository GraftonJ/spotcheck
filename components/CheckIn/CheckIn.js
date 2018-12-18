
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
      // ------------
      user: store.getState().user,
      isLoggedIn: store.getState().isLoggedIn,

      // these get reset by Logout.  Would have been better style to
      // listen for isLoggedIn to go to false and reset these variables ourself.
      // But then this component would know about Logging in/out so not
      // sure what's best.
      isCheckedIn: store.getState().isCheckedIn,
      checkinLocationId: store.getState().checkinLocationId,
      checkinLocationName: store.getState().checkinLocationName,

      // local state
      // -------------
      errorMessage: '', // set if fetch fails
      isLoading: true,
      candidateLocations: [], // array of locations to check-in to
    };
  }

  /* ********************************************* */
  async componentDidMount() {
    // TODO: When the search location changes in the Store this
    //       seach needs to be redone.  Add a listener to the
    //       store change state CB.
    try {
      // const locationsByCity = await getResults('Boulder, CO');
      // Galvanize: (40.016516, -105.281656);
      // Avery (40.0625629,-105.2047427);
      const promise0 = getResults('Boulder, CO');
      const promise1 = getResultsLatLon(40.016516,-105.281656);
      // const promise1 = getResultsLatLon(40.0625629,-105.2047427);
      const aResults = await Promise.all([promise0, promise1]);
      const locationsByCity = aResults[0];
      const locationsByLatLon = aResults[1];
      console.log('city: ',locationsByCity);
      console.log('latlon: ',locationsByLatLon);

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
      this.setErrorMessage(error);
    }
  }

  /* ********************************************* */
  setErrorMessage = (error) => {
    this.setState({
      errorMessage: error.error || responseJson,
    });
    setTimeout(() => { this.setState({errorMessage: ''}) }
      , 3000
    );
  }

  /* ********************************************* */
  componentWillUnmount() {
    // disconnect from store notifications
    this.unsubscribe();
  }

  /* ********************************************* */
  async onpressCheckin(locationId, locationName) {
    this.x = ''; // happy linter

    console.log('onpressCheckin(): ', locationId, locationName);

    try {
      const body = {
        user_id: this.state.user.id,
        loca_id: locationId,
      };

      // call checkin route
      const response = await fetch(`${URI}/check_ins`, {
        // credentials: 'include',
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const responseJson = await response.json();
      if (!response.ok) {
        console.log("ERROR from fetch to post the checkin: ", responseJson);
        this.setErrorMessage(responseJson);
      }

      // update the scNumCheckIns for the location
      const newLocations = store.getState().locations.map((location) => {
        if (location.id === locationId)
          return {
            ...location,
            scNumCheckIns: location.scNumCheckIns + 1,
          }
        return location;
      });

      store.setState({
        locations: newLocations,
        isCheckedIn: true,
        checkinLocationId: locationId,
        checkinLocationName: locationName,
      });
    } catch(error) {
      console.log("ERROR onpressCheckin(): ", error);
    }

  }

  /* ********************************************* */
  render() {
    const {
      isLoading,
      candidateLocations,
      isLoggedIn,
      isCheckedIn,
      checkinLocationName,
      errorMessage,
    } = this.state;

    // error state
    // ===================================
    if (errorMessage) {
      return (
        <SafeAreaView style={styles.container}>
          <Text>Error: {errorMessage}</Text>
        </SafeAreaView>
      )
    }

    // isLoading, show spinner
    // ===================================
    if (isLoading) {
      return (
        <SafeAreaView style={styles.container}>
          <ActivityIndicator
            size="large"
            color="#3399ff" />
        </SafeAreaView>
      )
    }

    // not logged in, say they need to login
    // ===================================
    if (!isLoggedIn) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.circle}>
            <Image style={styles.image} source={require('../../assets/images/check-in-4.jpg')} />
          </View>
          <Text style={[styles.text, styles.errorMessage]}>Please login so you can check-in to a location</Text>
        </SafeAreaView>
      )
    }

    // already checked in, show where they checked in
    // ===================================
    if (isCheckedIn) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.circle}>
            <Image style={styles.image} source={require('../../assets/images/check-in-4.jpg')} />
          </View>
          <Text style={styles.text}>You are checked-in to:</Text>
          <Text style={styles.text}>{checkinLocationName}</Text>
        </SafeAreaView>
      )
    }

    // No candidate locations, show sad face
    // ====================================
    if (!candidateLocations.length) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.circle}>
            <Image style={styles.image} source={require('../../assets/images/check-in-4.jpg')} />
          </View>
          <Text style={styles.text}>Unfortunately there are no restaurants in your area that are marked as dog-friendly</Text>
        </SafeAreaView>
      )
    }
    // List candidate locations to check into
    // ====================================
    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.circle}>
          <Image style={styles.image} source={require('../../assets/images/check-in-4.jpg')} />
        </View>

        {candidateLocations.map((location) => {
          return (
            <TouchableOpacity
              key={location.id}
              style={styles.button}
              onPress={() => this.onpressCheckin(location.id, location.name)}>
              <Text
                style={styles.text}
                numberOfLines={1}
                ellipsizeMode={'tail'}
              >
                {location.name}
              </Text>
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
  image: {
    height: '100%',
    width: '100%',

  },

  button: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#73DF36",
  },

  text: {
    fontSize: 25,
    letterSpacing: 1,
    textAlign: "center",
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
})

// export default Login
