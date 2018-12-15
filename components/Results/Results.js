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

  import store from '../../store';
  import { getResults } from '../../utils/api'
  import ResultCards from '../ResultCards/ResultCards'


export default class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: store.getState().locations,
      isLoading: true,
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
    this.setState({
      isLoading: false
    })
    console.log('Store state is>>', store.getState().locations);
}
  componentWillUnmount() {
    this.unsubscribe();
  }

render() {
  const { isLoading, locations } = this.state;

  if (isLoading) {
    return (
      <Text>Loading"</Text>
    )
  }
  return (
      <View>
        <Text>Test Text</Text>
        {locations.map(result => (
          <Text>MAP</Text>
        ))}
      </View>
    )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
  },
})
