import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  ImageBackground,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity} from 'react-native';

  import store, { URI } from '../../store';
  import { getResults } from '../../utils/api'
  import ResultCards from '../ResultCards/ResultCards'


export default class Results extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // store
      // --------------
      locations: store.getState().locations,

      // local state
      // --------------
      error: false,
      isLoading: true,
    };
  }

  /* **************************************** */
  async componentDidMount() {
    this.unsubscribe = store.onChange(() => {
      this.setState({
        locations: store.getState().locations,
      });
    });

    // Load locations
    // ----------------
    let loadedLocations = await getResults(store.getState().searchFor)

    // when would the fetch return undefined?
    if (loadedLocations === undefined) {
      this.setState({
        error: true,
        isLoading: false,
      });
      console.log("ERROR Results::componentDidMount()");
      return;
    }

    // add placeholders for scNumCheckIns and scComments[]
    loadedLocations = loadedLocations.map((location) => {
      location.scNumCheckIns = 0;
      location.scComments = [];
      return location;
    });

    // add to store
    store.setState({
      locations: loadedLocations,
    });

    // allow render to display cards before the checkins/comments/ratings have loaded
    this.setState({
      isLoading: false,
    });

    // load checkins and comments/ratings
    // ----------------------------------
    const augmentedLocations = await this.getAugmentedLocations(this.state.locations);

    // update store to rerender with scNumCheckIns and scComments
    store.setState({
      locations: augmentedLocations,
    });
  }

  /* **************************************** */
  componentWillUnmount() {
    console.log("Results::componentWillUnmount()");
    this.unsubscribe();
  }

  /* **************************************** */
  // Pass array of yelp ids to backend to get
  //   augmented info (checkins, comments/ratings)
  // @param locations (array of yelp locations) the array isn't mutated but
  //          the objects in the array ARE mutated because the spread only
  //          makes a shallow copy of the array.
  // @return
  /* **************************************** */
  async getAugmentedLocations(locations) {
    this.x = ''; // happy linter

    // spread is shallow copy and we will mutate the objects in the array
    //   so this isn't really doing anything valuable
    const augmentedLocations = [...locations];

    try {
      // Get info from backend
      const aLocationIds = augmentedLocations.map(location => location.id);
      const body = { locaIds: aLocationIds };
      const response = await fetch(`${URI}/yelp`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        console.log("ERROR getAugmentedLocations() fetch, response: ", response);
        return augmentedLocations;
      }
      const aAugmentInfo = await response.json();
      console.log("server response of augment info: ", aAugmentInfo);

      // copy the added info (numCheckIns/comments/ratings) into the locations
      for (let idx = 0; idx < augmentedLocations.length; idx++) {

        // Double-check arrays are as we expect, this should never be true
        if (augmentedLocations[idx].id !== aAugmentInfo[idx].id) {
          console.log("ERROR -- these arrays should be in same order");
          console.log('--- augmentedLocations: ', augmentedLocations);
          console.log('--- aAugmentInfo: ', aAugmentInfo);
          return augmentedLocations;
        }

        augmentedLocations[idx].scNumCheckIns = aAugmentInfo[idx].numCheckIns;
        augmentedLocations[idx].scComments = aAugmentInfo[idx].comments;
      }
      // for (const location of augmentedLocations) {
      //   // console.log("location: ", location);
      //   const idx = this.findIdx(location.id, aAugmentInfo);
      //   location.scNumCheckIns = aAugmentInfo[idx].numCheckIns;
      //   location.scComments = aAugmentInfo[idx].comments;
      // }
    } catch (err) {
      console.log("ERROR getAddlLocationInfo() fetch failed: ", err);
    }
    return augmentedLocations;
  }

  /* **************************************** */
  // had to pull this out of the look because of linter warning that block/scope
  // closure would give me a different result than I expected
  // findIdx(id, aAugmentInfo) {
  //   this.x = ''; // happy linter
  //   return aAugmentInfo.findIndex(augmentedInfo => augmentedInfo.id === id);
  // }

  /* **************************************** */
  render() {
    const { isLoading, locations, error } = this.state;

    if (isLoading) {
      return (
        <ActivityIndicator
          size="large"
          color="#3399ff"
        />
      );
    }

    if(error) {
      return (
        <SafeAreaView>
        <Text style={styles.errorTop}>Uh-oh Puppo!</Text>
        <Text style={styles.errorBottom}>No restaurants found</Text>
        <Image
          style={styles.image}
          source={require('../../assets/images/errorDog.jpg')} />
      </SafeAreaView>
      )
    } else {
      return (
          <ScrollView>
            {locations.map(location => (
              <ResultCards
                navigate={this.props.navigate}
                key={location.id}
                location={location}/>
            ))}
          </ScrollView>
        )
    }

  }
}

/* **************************************** */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
  },
  image: {
    width: 330,
    height: 300,
    borderRadius: 50,
    borderWidth: 1
  },
  errorTop: {
    fontFamily: 'Oxygen',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    letterSpacing: 1,
  },
  errorBottom: {
    fontFamily: 'MontSerrat',
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 1,
  },
})
