import React from 'react';

import { createBottomTabNavigator } from 'react-navigation';
import MAIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStack from '../screens/home/navigation/HomeStack';
import BuildingStack from '../screens/building/navigation/BuildingStack'
import VoiceCommandsScreen from '../screens/voicecommands/MainScreen';
import CalendarStack from '../screens/calendar/navigation/CalendarStack'
import ProfileStack from '../screens/profile/navigation/ProfileStack'

import { theme } from '../constants';
import MicButton from '../components/MicButton';

const size = 24;

const RouteConfig = {
  Home: {
    screen: HomeStack,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <MAIcon
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
        <MAIcon
          name="domain"
          color={tintColor}
          size={size}
        />
      ),
    }),
  },
  VoiceCommands: {
    screen: VoiceCommandsScreen,
    navigationOptions: () => ({
      tabBarButtonComponent: ({ navigation }) => (
        <MicButton navigation={navigation} />
      )
    }),
  },
  Calendar: {
    screen: CalendarStack,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <MAIcon
          name="calendar-text"
          color={tintColor}
          size={size}
        />
      ),
    }),
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <MAIcon
          name="clipboard-account"
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