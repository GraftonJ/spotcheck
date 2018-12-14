
import React from 'react'
import {StyleSheet, Text, View, KeyboardAvoidingView, TextInput, SafeAreaView, ImageBackground, Image, Alert, TouchableOpacity} from 'react-native'
import t from 'tcomb-form-native'



const Form = t.form.Form;
const User = t.struct({
  name: t.String,
  email: t.String,
  password: t.String,
  NameOfDog: t.String,
})


onpressLogin = (e) => {

}


const Register = () => (
  <SafeAreaView style={styles.container}>

    <View style={styles.circle}>
      <Image style={styles.image} source={require('../../assets/images/loginDog.jpg')} />
    </View>

    <Text style={styles.text}>Create Account</Text>

    <View style={{width: '85%'}}>
      <Form style={styles.form} type={User} />
    </View>
    <TouchableOpacity
        onPress={this.onpressLogin}>
      <Text   style={styles.createAccount}>Create Account</Text>
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
    letterSpacing: 1,
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
  createAccount : {
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: -1,
    marginTop: 2,
  }
})

export default Register
