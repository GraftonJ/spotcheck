import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Fragment,
  Image,
  SafeAreaView,
  TouchableOpacity} from 'react-native'

/* ***************************************** */
export default class RatingsClickable extends React.Component {

  /* ******************************** */
  constructor(props) {
    super(props);

    // optional initialRatings prop, default to 0
    const initialRating = (props.initialRating) ? props.initialRating : 0;

    this.state = {
      currRating: initialRating,
    };

    this.starFilled   = require('../assets/images/star2-filled.png');
    this.starHalf     = require('../assets/images/star2-filled.png');
    this.starUnfilled = require('../assets/images/star2-empty.png');
  }

  /* ******************************** */
  onpress = (rating) => {
    console.log("Rated: ", rating);
    this.setState({
      currRating: rating,
    });
    this.props.ratingUpdatedCB(rating);
  }

  /* ******************************** */
  // @param starNum (int): 1 - 5
  // @param fillLevel (enum): 0-empty 1-half 2-full
  buildStar(starNum, fillLevel) {
    let png = '';
    switch(fillLevel) {
      case 0:
        png = this.starUnfilled;
        break;
      case 1:
        png = this.starHalf;
        break;
      case 2:
        png = this.starFilled;
        break;
      default:
        console.log("ERROR -- bad param to buildStar");
    }
    return (
      <TouchableOpacity key={starNum} onPress={() => this.onpress(starNum)}>
        <Image style={styles.star} source={png} />
      </TouchableOpacity>
    )
  }

  /* ******************************** */
  render() {

    // build array of stars based on currRating
    const aStars = [];
    const { currRating } = this.state;
    console.log('render, currRating: ', currRating);
    for (let i = 0; i <= 4; i++) {
      if ((i + 0.75) <= currRating) {
        aStars.push(this.buildStar(i + 1, 2)); // filled
      } else if (i + 0.25 <= currRating) {
        aStars.push(this.buildStar(i + 1, 1)); // half filled
      } else {
        aStars.push(this.buildStar(i + 1, 0)); // empty
      }
    }

    return (
      <View style={styles.container}>
        {aStars.map(star => (
            star
        ))}
      </View>
    );
  }
};


/* ***************************************** */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  star: {
    width: 18,
    height: 18,
  },
});
