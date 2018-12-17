import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import {
  Text,
  Image,
  StyleSheet,
} from 'react-native'

import HomeSCR from './screens/HomeSCR'
import LoginSCR from './screens/LoginSCR'
import CheckInSCR from './screens/CheckInSCR'
import ResultsSCR from './screens/ResultsSCR'
import DetailCardSCR from './screens/DetailCardSCR'

import colors from './utils/colors';

const getTabBarIcon = icon => ({ tintColor }) => (
  <Image style={styles.icon} source={require('./assets/images/tab-search.png')} />
);
// <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />

const SearchScreens = StackNavigator(
  {
    HomeSCR: {
      screen: HomeSCR,
    },
    ResultsSCR: {
      screen: ResultsSCR,
    },
    DetailCardSCR: {
      screen: DetailCardSCR,
    }
  },
  {
    initialRouteName: 'HomeSCR',
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image style={styles.iconSearch} source={require('./assets/images/tab-search.png')} />
      ),
    },
  },
);

const CheckInScreen = StackNavigator(
  {
    CheckInSCR: {
      screen: CheckInSCR,
    },
  },
  {
    initialRouteName: 'CheckInSCR',
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image style={styles.iconCheckin} source={require('./assets/images/tab-checkin.png')} />
      ),
    },
  },
);

const LoginScreen = StackNavigator(
  {
    LoginSCR: {
      screen: LoginSCR,
    },
  },
  {
    // mode: 'modal',
    initialRouteName: 'LoginSCR',
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image style={styles.iconLogin} source={require('./assets/images/tab-login.png')} />
      ),
    },
  },
);

// // This gets imported as "AppNavigator" in app.js
export default TabNavigator(
  {
    SearchScreens: {
      screen: SearchScreens,
    },
    CheckInScreen: {
      screen: CheckInScreen,
    },
    LoginScreen: {
      screen: LoginScreen,
    },
  },
  {
    initialRouteName: 'SearchScreens',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        backgroundColor: colors.greyLight,
      },
      showLabel: true, // show the name of the tab bar tab
      showIcon: true, // show the icon for the tab bar tab
      activeTintColor: colors.blue, // color of selected tab bar tab
      inactiveTintColor: colors.greyDark, // color of inactive tab bar tab
      renderIndicator: () => null,
    },
  },
);

const styles = StyleSheet.create({
  iconSearch: {
    height: 23,
    width: 23,
  },
  iconCheckin: {
    height: 40,
    width: 40,
  },
  iconLogin: {
    height: 45,
    width: 45,
  },
});
