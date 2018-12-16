
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
// import HomePage from './components/Homepage/Homepage'



import AppNavigator from './routes';
import HomeSCR from './screens/HomeSCR'
import LoginSCR from './screens/LoginSCR'
import CheckInSCR from './screens/CheckInSCR'
import DetailCardSCR from './screens/DetailCardSCR'

// import Register from './components/Login/NewAccount'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      location: '' };
  }

  updateLocation = (text) => {
    this.setState({
      ...this.state,
      location: text,
      })
  }
  render() {
    return (
      <CheckInSCR />
    );
  }
}

//  <CheckInSCR />
//  <LoginSCR />
//  <AppNavigator />

// <View style={styles.container}>
//   <HomePage updateLocation={this.updateLocation} location={this.state.location}/>
// </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
