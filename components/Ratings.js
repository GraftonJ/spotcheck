import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Fragment,
  Image,
  SafeAreaView,
  TouchableOpacity} from 'react-native'

// import calcAvgRating from '../utils/calcAvgRating'

/* ***************************************** */
function calcAvgRating(aComments) {
  if (!aComments.length) {
    return 0;
  }

  const sum = aComments.reduce((acc, comment) => {
    return acc + comment.rating;
  },0);

  return sum / aComments.length;
}

/* ***************************************** */
// Ratings can be called with ONE of the following props:
//   comments -- array of comments in the form
//               [ { locaId: 3232fT5656,
//                   user: { id: 3, name: "Sue Grant", dogName: "Sparky"},
//                   rating: 4,
//                   comment: "this is a comment"}
//                   }, {...} ]
//  ** OR **
//   rating -- a numeric value 0 - 5
const Ratings = (props) => {
  let { comments, rating } = props;

  // was this component called with 'comments' prop?
  let calledWithComments = true;

  // This component is set to work for a comments array
  //  so if it's called with a singleRating we just
  //  dummy a comments array with one entry for the singleRating
  //  and let the code works with the comments array
  if (rating) {
    if (comments) {
      console.log("ERROR -- don't call Ratings component with both props");
    }
    comments = [{ rating }];
    calledWithComments = false;
  }

  if (!comments.length) {
    return (
      <View style={styles.container}>
        <Text>no ratings yet</Text>
      </View>
    )
  }

  const avgRating = calcAvgRating(comments);
  const aStars = [];
  for (let i = 0; i <= 4; i++) {
    if ((i + 0.75) <= avgRating) {
      aStars.push(( <Image key={i} style={styles.star} source={require('../assets/images/star2-filled.png')} /> ));
    } else if (i + 0.25 <= avgRating) {
      aStars.push(( <Image key={i} style={styles.star} source={require('../assets/images/star2-half2.png')} /> ));
    } else {
      aStars.push(( <Image key={i} style={styles.star} source={require('../assets/images/star2-unfilled.png')} /> ));
    }
  }

  const ratings = `${comments.length} rating${(comments.length > 1) ? 's' : ''}`;

  return (
    <View style={styles.container}>
      {aStars.map(star => (
        star
      ))}
      {calledWithComments && (
        <Text> ({ratings})</Text>
      )}
    </View>
  );
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

export default Ratings
