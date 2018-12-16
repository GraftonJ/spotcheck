import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity} from 'react-native'

import calcAvgRating from '../utils/calcAvgRating'

const Stars = (props) => {
  const { comments } = props;
  const avgRating = avgRating(comments);
  console.log("avg, comments: ", avgRating, comments);
  return (
    <Text>*</Text>
  );
}

const styles = StyleSheet.create({
});

export default Stars
