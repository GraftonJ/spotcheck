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
    const json = await getResults(store.getState().searchFor)
    this.setState({
      locations: json,
      isLoading: false,
    })
    console.log('Store state is>>', store.getState().locations);
}

render() {
  const { isLoading } = this.state;

  if (isLoading) {
    return (
      <Text>Loading"</Text>
    )
  }

  return (
      <View>
        <Text>Test Text</Text>
        {store.getState().locations.map(result => (
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
