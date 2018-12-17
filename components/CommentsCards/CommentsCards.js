import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types';
import { Fonts } from '../../assets/fonts/fonts'


onpressComment = (e) => {

}
export default class CommentsCards extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    placeholder: '',
  };

  state = {
    text: '',
  };

  handleChangeText = text => {
    this.setState({ text });
  };

  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;

    if (!text) return;

    onSubmit(text);
    this.setState({ text: '' });
  };

  render() {
    const { placeholder } = this.props;
    const { text } = this.state;

    return (
      <SafeAreaView>
        <View style={styles.cardContainer}>
          <Text style={styles.name}>Meatball</Text>
          <Text style={styles.rating}> ☆☆☆☆☆</Text>
        <View>
          <TextInput
           style={styles.placeholderText}
           multiline = {true}
           numberOfLines = {4}
           placeholder="Leave a comment to help your doggy friends find a restuarant to visit with their people!"
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onpressComment}>
          <Text >Bark! (comment)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 350,
    height: '50%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  name: {
    fontSize: 30,
    fontFamily: 'Arial',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'MontSerrat',
    letterSpacing: 1,
  },
  rating: {
    fontSize: 25,
    alignSelf: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 18,
    alignSelf: 'center',
    borderTopWidth: 1,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: '40%',
    height: '8%',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
})
