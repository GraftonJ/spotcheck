
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
  TouchableOpacity
} from 'react-native'
import t from 'tcomb-form-native'

import store, { URI } from '../../store';

const Form = t.form.Form;
const User = t.struct({
  email: t.String,
  password: t.String,
})

export default class HomeSCR extends React.Component {

  state: {
    // local state not connected to store
    email: '',
    password: '',
  }

  // /* ********************************************* */
  // onchangeName = (text) => {
  //   // console.log('Login::onchangeEmail(): ', text);
  //   this.setState({
  //     email: text,
  //   });
  // }
  /* ********************************************* */
  // onchangePassword = (text) => {
  //   // console.log('Login::onchangePassword(): ', text);
  //   this.setState({
  //     password: text,
  //   });
  // }

  /* ********************************************* */
  onpressLogin = async () => {
    console.log("Login::onpressLogin()");

    var value = this.refs.myform.getValue();
    console.log("value: ",value);
    if (!value) {
      Alert.alert("Grrrr", "Please fill in all fields");
      return;
    }
    const { email, password } = value;

    console.log("email: ", email);
    console.log("password: ", password);

    const body = { email, password };
    const url = `${URI}/users/login`;
    console.log("=== url ", url);
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const responseJson = await response.json();
      console.log('==== ', response.status, responseJson);
    }
    catch(err) {
      console.log("ERROR onpressLogin fetch failed: ", err);
    }
  }

  /* ********************************************* */
  render() {
    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.circle}>
          <Image style={styles.image} source={require('../../assets/images/loginDog.jpg')} />
        </View>

        <Text style={styles.text}>Login, WOOF!</Text>

        <View style={{ width: '85%' }}>
          <Form ref="myform" style={styles.form} type={User} />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onpressLogin}>
          <Text >Login</Text>
        </TouchableOpacity>

        <Text style={[styles.newAccount, { marginBottom: 5 }]}>or</Text>

        <TouchableOpacity
          onPress={this.onpressLogin}>
          <Text style={styles.newAccount} >Create New Account</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  };
}

//
// <Text style={styles.newAccount, {marginBottom: 5}}>or</Text>


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
  text: {
    fontSize: 25,
    marginBottom: 10,
  },
  image: {
    height: '100%',
    width: '100%',

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
  }
})

// export default Login
