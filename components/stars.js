import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity} from 'react-native'

// import calcAvgRating from '../utils/calcAvgRating'

/* ***************************************** */
function calcAvgRating(aComments) {
  if (!aComments.length)
    return 0;

  const sum = aComments.reduce((acc, comment) => {
    return acc + comment.rating;
  },0);

  return sum / aComments.length;
}

/* ***************************************** */
const Stars = (props) => {
  const { comments } = props;

  if (!comments.length) {
    return (
      <Text>no ratings yet</Text>
    )
  }

  const avgRating = calcAvgRating(comments);
  console.log("avg, comments: ", avgRating, comments);

  const stars = '*****'.slice(0, Math.round(avgRating));
  const sAvgRating = avgRating.toFixed(1)
  const ratings = `${comments.length} rating${(comments.length > 1) ? 's' : ''}`;
  return (
    <Text>{stars} ({sAvgRating} avg, {ratings})</Text>
  );
}

/* ***************************************** */
const styles = StyleSheet.create({
});

export default Stars
