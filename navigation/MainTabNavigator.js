import React from 'react';

import { createBottomTabNavigator } from 'react-navigation';
import FAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import HomeStack from '../screens/home/navigation/HomeStack';
import BuildingStack from '../screens/building/navigation/BuildingStack'
import VoiceCommandsScreen from '../screens/voicecommands/MainScreen';
import CalendarStack from '../screens/calendar/navigation/CalendarStack'
import ProfileStack from '../screens/profile/navigation/ProfileStack'

import { MicButton } from '../components';

const size = 24;

const RouteConfig = {
  Home: {
    screen: HomeStack,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <FAwesomeIcon
          name="home"
          color={tintColor}
          size={size}
        />
      ),
    }),
  },
  Building: {
    screen: BuildingStack,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <FAwesomeIcon
          name="building"
          color={tintColor}
          size={size - 4}
        />
      ),
    }),
  },
  VoiceCommands: {
    screen: VoiceCommandsScreen,
    navigationOptions: () => ({
      tabBarButtonComponent: () => (
        <MicButton />
      ),
    }),
  },
  Calendar: {
    screen: CalendarStack,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <FAwesomeIcon
          name="calendar"
          color={tintColor}
          size={size - 1}
        />
      ),
    }),
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <FAwesomeIcon
          name="user"
          color={tintColor}
          size={size}
        />
      ),
    }),
  },
};

const BottomNavigatorConfig = {
  tabBarOptions: {
    activeTintColor: 'rgb(255,255,255)',
    //activeTintColor: Colors.tabIconSelected,
    inactiveTintColor: 'rgb(89, 102, 139)',
    //inactiveTintColor: Colors.tabIconDefault,
    style: {
      backgroundColor: 'rgb(21, 31, 53)',
    },
    showLabel: false,
  },
};

export default createBottomTabNavigator(RouteConfig, BottomNavigatorConfig);