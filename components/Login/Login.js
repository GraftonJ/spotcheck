
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

  constructor(props) {
    super(props);
    this.state = {
      // local state
      value: { // this is used by the "Form" thing
        email: 'nuser@gmail.com', // stores the form value
        password: 'secret', // stores the form value
      },
      loginErrorMsg: '', // error message for failed login
    }
  }

  // state: {
  //   // local state
  //   loginErrorMsg: '',
  // }

  /* ********************************************* */
  async asyncTryLogin(email, password) {
    console.log("-- asyncTryLogin(): ", email, password);

    this.setState({
      loginErrorMsg: '',
    })

    const body = { email, password };
    const url = `${URI}/users/login`;

    try {
      // call login route
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const responseJson = await response.json();

      // if the login fails, display error message
      if (!response.ok) {
        console.log('==== ', response.status, responseJson);
        this.setState({
          loginErrorMsg: responseJson.error,
        })
        return;
      }

      // login succeeded!
      // console.log("+++ login success!: ", responseJson);
      console.log("+++ login success .user!: ", responseJson.user);
      // console.log("+++ login success .user.user!: ", responseJson.user.user);
      store.setState({
        user: responseJson.user,
      });
    }
    catch(err) {
      console.log("ERROR onpressLogin fetch failed: ", err);
    }
  }

  /* ********************************************* */
  onpressLogin = async () => {
    console.log("Login::onpressLogin()");

    var value = this.refs.myform.getValue();
    console.log("value: ",value);

    // check that user filled in the fields
    if (!value) {
      // Alert.alert("Grrrr", "Please fill in all fields");
      return;
    }
    const { email, password } = value;
    const success = await this.asyncTryLogin(email, password);
    console.log("---- login success: ", success);
  }

  /* ********************************************* */
  onChange = (value) => {
    console.log('xxxx onChange(): ', value);
    this.setState({value});
  }

  /* ********************************************* */
  render() {
    const { loginErrorMsg } = this.state;
    const displayErrorMessage = 0 !== loginErrorMsg.length;
    console.log("+++ render error msg: ", loginErrorMsg);
    console.log("+++ render state: ", this.state);
    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.circle}>
          <Image style={styles.image} source={require('../../assets/images/loginDog.jpg')} />
        </View>

        <Text style={styles.text}>Login, WOOF!</Text>

        <View style={{ width: '85%' }}>
          <Form
            ref="myform"
            style={styles.form}
            value={this.state.value}
            onChange={this.onChange}
            type={User} />
        </View>
        {displayErrorMessage && (
          <Text style={styles.errorMessage}>{loginErrorMsg}</Text>
        )}
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
  form: {

  },
  text: {
    fontSize: 25,
    marginBottom: 10,
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
