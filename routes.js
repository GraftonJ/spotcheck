import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import HomeSCR from './screens/HomeSCR'
import LoginSCR from './screens/LoginSCR'
import CheckInSCR from './screens/CheckInSCR'
import ResultsSCR from './screens/ResultsSCR'

import colors from './utils/colors';

// const getTabBarIcon = icon => ({ tintColor }) => (
//   <Text>X</Text>
// );
// <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />

const SearchScreens = StackNavigator(
  {
    HomeSCR: {
      screen: HomeSCR,
    },
    ResultsSCR: {
      screen: ResultsSCR,
    },
  },
  {
    initialRouteName: 'HomeSCR',
    navigationOptions: {
      // tabBarIcon: getTabBarIcon('list'),
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
      // tabBarIcon: getTabBarIcon('star'),
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
    // tabBarIcon: getTabBarIcon('person'),
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
      showLabel: true,
      showIcon: true,
      activeTintColor: colors.blue,
      inactiveTintColor: colors.greyDark,
      renderIndicator: () => null,
    },
  },
);
