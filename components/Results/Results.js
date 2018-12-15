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


export default class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: store.getState().locations
    }
  }

  async componentDidMount() {
    const json = await getResults(store.getState().searchFor)
    store.setState({
      locations: json
    })
}



render() {
  return (
    <Text>Results</Text>
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
