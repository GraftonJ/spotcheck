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
    super(props)
    this.state = {
      locations: store.getState().locations,
      isLoading: true,
      error: false
    }
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
      <Text>Uhoh Puppo! No restaurants found!</Text>
      <Image
        style={{width:330, height:300}}
        source={require('../../assets/images/errorDog.jpg')} />
    </SafeAreaView>
    )
  } else {
    return (
        <ScrollView>
          {locations.map(result => (
            <ResultCards
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

})
