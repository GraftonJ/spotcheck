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

  import store from '../../store';
  import { getResults } from '../../utils/api'
  import ResultCards from '../ResultCards/ResultCards'


export default class Results extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: store.getState().locations,
      isLoading: true,
      error: false
    };
  }

  async componentDidMount() {
    this.unsubscribe = store.onChange(() => {
      this.setState({
        locations: store.getState().locations,
        error: store.getState().error,
      })
    })

    const json = await getResults(store.getState().searchFor)
    store.setState({
      locations: json,
    })

    if(json === undefined){
      this.setState({
        error: true,
        isLoading: false,
      })
    }

    this.setState({
      isLoading: false
    })
    console.log('Store state is>>', store.getState().locations);
}

  componentWillUnmount() {
    console.log("Results::componentWillUnmount()");
    this.unsubscribe();
  }

render() {
  const { isLoading, locations, error } = this.state;

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color="#3399ff" />
    )
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
