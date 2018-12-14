
import React from 'react'
import {StyleSheet, Text, View, KeyboardAvoidingView, TextInput, SafeAreaView, ImageBackground, Image, Alert, TouchableOpacity} from 'react-native'
import t from 'tcomb-form-native'



const Form = t.form.Form;
const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
})


onpressLogin = (e) => {

}


const Login = () => (
  <SafeAreaView style={styles.container}>

    <View style={styles.circle}>
      <Image style={styles.image} source={require('../../assets/images/loginDog.jpg')} />
    </View>

    <Text style={styles.text}>Login, WOOF!</Text>

    <View style={{width: '85%'}}>
      <Form style={styles.form} type={User} />
    </View>
    <TouchableOpacity
        style={styles.button}
        onPress={this.onpressLogin}>
      <Text >Login</Text>
    </TouchableOpacity>

    <Text style={styles.newAccount, {marginBottom: 5}}>or</Text>

    <TouchableOpacity

        onPress={this.onpressLogin}>
      <Text style={styles.newAccount} >Create New Account</Text>
    </TouchableOpacity>


  </SafeAreaView>

)

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

export default Login
