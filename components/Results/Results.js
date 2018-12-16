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
    let json = await getResults(store.getState().searchFor);
    store.setState({
      locations: json,
    });
    if (json === undefined) {
      this.setState({
        error: true,
        isLoading: false,
      });
      return;
    }
    // allow render to display cards before the checkins/comments/ratings have loaded
    this.setState({
      isLoading: false,
    });
    console.log('Store state BEFORE loading addl data>>', store.getState().locations);

    // load checkins and comments/ratings
    // ----------------------------------
    const augmentedLocations = await this.getAddlLocationInfo(this.state.locations);
    store.setState({
      locations: augmentedLocations,
    });

    console.log('Store state AFTER loading addl data>>', store.getState().locations);
  }

  /* **************************************** */
  componentWillUnmount() {
    console.log("Results::componentWillUnmount()");
    this.unsubscribe();
  }

  /* **************************************** */
  // Pass array of yelp ids to backend to get
  //   augmented info (checkins, comments/ratings)
  // @param locations (array of yelp locations) will NOT be mutated
  // @return
  /* **************************************** */
  async getAddlLocationInfo(locations) {
    this.x = ''; // happy linter

    // don't mutate locations as it's part of state
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
        console.log("ERROR getAddlLocationInfo() fetch, response: ", response);
        return augmentedLocations;
      }
      const aAugmentInfo = await response.json();
      console.log("server response of augment info: ", aAugmentInfo);

      // TODO:
      for (const location of augmentedLocations) {
        console.log("location: ", location);
        const idx = this.findIdx(location.id, aAugmentInfo);
        location.scNumCheckIns = aAugmentInfo[idx].numCheckIns;
        location.scComments = aAugmentInfo[idx].comments;
      }

      console.log("%%% Augmented locations: ", augmentedLocations);

    } catch (err) {
      console.log("ERROR getAddlLocationInfo() fetch failed: ", err);
    }
    return augmentedLocations;
  }

  /* **************************************** */
  // had to pull this out of the look because of linter warning that block/scope
  // closure would give me a different result than I expected
  findIdx(id, aAugmentInfo) {
    this.x = ''; // happy linter
    return aAugmentInfo.findIndex(augmentedInfo => augmentedInfo.locaId === id);
  }

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
        <Text style={styles.errorTop}>Uhoh Puppo!</Text>
        <Text style={styles.errorBottom}> No restaurants found</Text>
        <Image
          style={styles.image}
          source={require('../../assets/images/errorDog.jpg')} />
      </SafeAreaView>
      )
    } else {
      return (
          <ScrollView>
            {locations.map(result => (
              <ResultCards
                navigate={this.props.navigate}
                key={result.id}
                result={result}/>
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
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    letterSpacing: 1,
  },
  errorBottom: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    marginBottom: 15,
  },
})
