
import React from 'react'
import {StyleSheet, Text, View, KeyboardAvoidingView, TextInput, SafeAreaView, ImageBackground, Image, Alert, TouchableOpacity} from 'react-native'
import t from 'tcomb-form-native'

import store, { URI } from '../../store'

const Form = t.form.Form;
const User = t.struct({
  name: t.String,
  email: t.String,
  password: t.String,
  dog_names: t.String,
});

/* ********************************************* */
export default class NewAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      // local state
      // ---------------
      errorMessage: '',
      // Value is used by the "Form" thing
      // Field keys match db table fields
      value: {
        name: 'Sally Mae', // holds the form value
        email: 'smae@gmail.com',
        password: "secret",
        dog_names: "Shammie",
        dogNames: "Shammie",
      },
    };
  }

  /* ********************************************* */
  componentDidMount() {
    this.refs.myform.getComponent('name').refs.input.focus();
  }

  /* ***Î****************************************** */
  onChange = (value) => {
    console.log('xxxx onChange(): ', value);
    this.setState({value});
  }

  /* ********************************************* */
  async asyncTryAddUser(user) {
    console.log("-- asyncTryAddUser(): ", user);

    this.setState({
      errorMessage: '',
    })

    if (!user.dog_names) {
      delete user.dog_names;
      console.log(")))))) removed dog_names", user);
      const s = JSON.stringify(user);
      console.log("))))))) stringified: ", s);
    }

    const body = user;
    const url = `${URI}/users`;

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
      console.log(")) after response split");

      // if the new account fails, display error message
      if (!response.ok) {
        console.log('==== ', response.status, responseJson);
        this.setState({
          errorMessage: responseJson.error,
        })
        return;
      }

      // new account succeeded!
      console.log("('==== new acct added!: ", responseJson.user);
      responseJson.user.dogNames = responseJson.user.dog_names; // kludge b/c the comments expect 'dogNames'
      store.setState({
        user: responseJson.user,
        isLoggedIn: true,
      });
      this.props.newAccountAddedCB();
    }
    catch(err) {
      console.log("ERROR asyncTryAddUser fetch failed: ", err);
    }
  }

  /* ***Î****************************************** */
  onpressSubmit = async () => {
    console.log("onpressSubmit()");
    var user = this.refs.myform.getValue();

    // check that user filled in the fields
    if (!user)
      return;

    console.log("Adding user: ", user);
    await this.asyncTryAddUser(user)
  }

  /* ***Î****************************************** */
  render() {
    const { errorMessage } = this.state;
    const displayErrorMessage = 0 !== errorMessage.length;

    const onpressCancelCB = this.props.onpressCancelCB;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">

        <View style={styles.circle}>
          <Image style={styles.image} source={require('../../assets/images/loginDog.jpg')} />
        </View>

        <Text style={styles.text}>Create Account</Text>

        <View style={{width: '85%'}}>
          <Form
            ref="myform"
            style={styles.form}
            value={this.state.value}
            onChange={this.onChange}
            type={User} />
        </View>
        {displayErrorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
        <View style={styles.sideBySideButtonsContainer}>
          <TouchableOpacity
            style={styles.sideBySideButton}
            onPress={this.onpressSubmit}>
            <Text >Create</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sideBySideButton}
            onPress={onpressCancelCB}>
            <Text >Cancel</Text>
          </TouchableOpacity>
        </View >
      </KeyboardAvoidingView>
    )
  }
}

// <SafeAreaView style={styles.container}>
// </SafeAreaView>
// <View style={styles.sideBySideButtonsContainer}>
// </View >
// style={styles.sideBySideButton}

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
  sideBySideButtonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 25,
    letterSpacing: 1,
    marginBottom: 10,
  },
  image: {
    height: '100%',
    width: '100%',

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
    justifyContent: 'center',
  },
  errorMessage: {
    color: "red",
  },
  sideBySideButton: {
    width: '28%',
    height: '30%',
    height: 23,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 25,
    marginRight: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  circle: {  // circle containing cute doggie
    marginBottom: 25,
    marginTop: 10,
    height: 150,
    width: 150,
    borderWidth:1,
    borderRadius:75,
    padding: 22,
  },
  createAccount : {
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: -1,
    marginTop: 2,
  }
})
