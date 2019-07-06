import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import BuildingScreen from '../screens/BuildingScreen';
import MyApartamentScreen from '../screens/MyApartamentScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ChatScreen from '../screens/ChatScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

//HOME STACK
//HOME STACK

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} />
  ),
};

HomeStack.path = '';

const BuildingStack = createStackNavigator(
  {
    Building: BuildingScreen
  },
  config
);

BuildingStack.navigationOptions = {
  tabBarLabel: 'Prédio',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-business' : 'md-link'} />
  ),
};

BuildingStack.path = '';

const MyApartamentStack = createStackNavigator(
  {
    MyApartament: MyApartamentScreen,
  },
  config
);

MyApartamentStack.navigationOptions = {
  tabBarLabel: 'Meu Apê',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'md-bed' : 'md-link'} />
  ),
};

MyApartamentStack.path = '';

const CalendarStack = createStackNavigator(
  {
    Calendar: CalendarScreen,
  },
  config
);

CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendário',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} />
  ),
};

MyApartamentStack.path = '';

const ChatStack = createStackNavigator(
  {
    Chat: ChatScreen,
  },
  config
);

ChatStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-options'} />
  ),
};

ChatStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  BuildingStack,
  MyApartamentStack,
  CalendarStack,
  ChatStack,
});

tabNavigator.path = '';

export default tabNavigator;
