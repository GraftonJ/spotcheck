
import React from 'react'
import {StyleSheet, Text, View, KeyboardAvoidingView, TextInput, SafeAreaView, ImageBackground, Image, Alert, TouchableOpacity} from 'react-native'
import t from 'tcomb-form-native'



const Form = t.form.Form;
const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
})

const Login = () => (
  <SafeAreaView style={styles.container}>

    <View style={styles.circle}>
      <Image style={styles.image} source={require('../../assets/images/loginDog.jpg')} />
    </View>

    <Text style={styles.text}>Login, WOOF!</Text>

    <View style={{width: '85%'}}>
      <Form style={styles.form} type={User} />
    </View>

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
})

export default Login
